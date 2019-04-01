import * as Keychain from "react-native-keychain";
import constants from "../../constants/constants";
import { logError } from "../errorLogger/errorLogger";
import logOut from "../logOut/logOut";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import DeviceInfo from "react-native-device-info";
import _ from "lodash";

const timeoutDuration = 60000;
const apiServer = constants.apiServerUrl;
let isJustLoggedOut = false;

const apiCall = async (
  route,
  body = {},
  method = "POST",
  customDomain = false,
  customToken = null,
  customHeader = {}
) => {
  const credentials = await Keychain.getGenericPassword();

  let headerObject = {
    "Content-Type": "application/json",
    isMobile: true,
    deviceId: DeviceInfo.getUniqueID()
  };

  if (customHeader && !_.isEmpty(customHeader)) {
    headerObject = {
      ...headerObject,
      ...customHeader
    };
  }

  if (credentials && credentials.username && credentials.password) {
    headerObject.Authorization = credentials.password;
  } else if (customToken) {
    headerObject.Authorization = customToken;
  }

  const headers = new Headers(headerObject);

  const requestDetails = {
    method,
    mode: "cors",
    headers
  };

  if (method !== "GET") requestDetails.body = JSON.stringify(body);

  const serverURL = customDomain ? customDomain : apiServer;

  const requestURL = `${serverURL}${route}`;

  const request = new Promise((resolve, reject) => {
    console.log(requestURL);
    console.log(body);
    console.log(JSON.stringify(body));
    console.log(method);
    console.log(headers);

    function handleErrors(response) {
      console.log(response.status);
      console.log(response.statusText);
      if (
        response.status === 401 &&
        credentials &&
        credentials.username &&
        credentials.password
      ) {
        if (!isJustLoggedOut) {
          isJustLoggedOut = true;
          DebouncedAlert("Oops!", "Session Expired... Please Login again!");
        }
        logOut();
        return { status: "EXPIRED" };
      } else {
        isJustLoggedOut = false;
        if (response.status === 200) {
          const data = response.json();
          return data;
        } else if (response.status === 204) {
          const data = { status: "SUCCESS" };
          return data;
        } else {
          const errorInfo = {
            type: "apiCall",
            url: requestURL,
            body,
            status: response.status,
            ...headerObject
          };
          const errorObject = Error(
            JSON.stringify({
              status: response.status,
              url: requestURL
            })
          );
          logError(errorObject, errorInfo);
          throw errorObject;
        }
      }
    }

    fetch(requestURL, requestDetails)
      .then(handleErrors)
      .then(data => {
        clearTimeout(networkTimeOut);
        console.log(data);
        console.log(JSON.stringify(data));
        resolve(data);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });

  const networkTimeOut = reject => {
    return setTimeout(() => {
      const errorInfo = {
        type: "apiCall",
        url: requestURL,
        body,
        ...headerObject
      };
      const errorObject = Error(
        JSON.stringify({
          status: `Request timed out!`,
          url: requestURL
        })
      );
      logError(errorObject, errorInfo);
      reject(errorObject);
    }, timeoutDuration);
  };

  return new Promise((resolve, reject) => {
    const timeoutId = networkTimeOut(reject);
    request
      .then(result => {
        clearTimeout(timeoutId);
        resolve(result);
      })
      .catch(error => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
};

export default apiCall;
