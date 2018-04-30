import * as Keychain from "react-native-keychain";
import constants from "../../constants/constants";

const timeoutDuration = 60000;

const apiCall = async (route, body = {}, method = "POST") => {
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

    const serverURL = constants.localServer;

    console.log(`${serverURL}${route}`);
    console.log(body);
    console.log(method);
    console.log(headers);

    fetch(`${serverURL}${route}`, requestDetails)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
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
