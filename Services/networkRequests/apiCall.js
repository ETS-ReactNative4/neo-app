import * as Keychain from "react-native-keychain";
import constants from "../../constants/constants";

const timeoutDuration = 60000;

const apiCall = async (
  route,
  body = {},
  method = "POST",
  customDomain = false
) => {
  const credentials = await Keychain.getGenericPassword();

  const request = new Promise((resolve, reject) => {
    const headerObject = {
      "Content-Type": "application/json",
      isMobile: true
    };

    if (credentials) {
      headerObject.Authorization = credentials.password;
    }

    const headers = new Headers(headerObject);

    const requestDetails = {
      method,
      mode: "cors",
      headers
    };

    if (method !== "GET") requestDetails.body = JSON.stringify(body);

    const serverURL = customDomain ? customDomain : constants.devServer;

    console.log(`${serverURL}${route}`);
    console.log(body);
    console.log(JSON.stringify(body));
    console.log(method);
    console.log(headers);

    function handleErrors(response) {
      console.log(response.status);
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
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
