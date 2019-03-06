import * as Keychain from "react-native-keychain";
import constants from "../../constants/constants";
import { logError } from "../errorLogger/errorLogger";
import logOut from "../logOut/logOut";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";

const timeoutDuration = 60000;
const apiServer = constants.apiServerUrl;
let isJustLoggedOut = false;

const apiCall = async (
  route,
  body = {},
  method = "POST",
  customDomain = false,
  customToken = null
) => {
  const credentials = await Keychain.getGenericPassword();

  const request = new Promise((resolve, reject) => {
    const headerObject = {
      "Content-Type": "application/json",
      isMobile: true
    };

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

    console.log(`${serverURL}${route}`);
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
            url: `${serverURL}${route}`,
            body,
            status: response.status,
            ...headerObject
          };
          const errorObject = Error(
            JSON.stringify({
              status: response.status,
              url: `${serverURL}${route}`
            })
          );
          logError(errorObject, errorInfo);
          throw errorObject;
        }
      }
    }

    fetch(`${serverURL}${route}`, requestDetails)
      .then(handleErrors)
      .then(data => {
        console.log(data);
        console.log(JSON.stringify(data));
        resolve(data);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });

  const timeout = new Promise((request, reject) => {
    setTimeout(reject, timeoutDuration, `Request timed out!`);
  });

  return new Promise((resolve, reject) => {
    Promise.race([request, timeout])
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};

export default apiCall;
