import constants from "../../constants/constants";

const timeoutDuration = 5000;

export default function apiCall(route, body = {}, method = "POST") {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("pass");
    }, 3000);
  });
}

// export default function apiCall(route, body = {}, method='POST') {
//   const request = new Promise((resolve, reject) => {
//
//     const headers = new Headers({
//       'Content-Type': 'application/json',
//     });
//
//     const requestDetails = {
//       method,
//       mode: 'cors',
//       headers,
//     };
//
//     if(method !== 'GET') requestDetails.body = JSON.stringify(body);
//
//     function handleErrors(response) {
//       if(response.ok) {
//         return response.json();
//       } else {
//         throw Error(response.statusText);
//       }
//     }
//
//     const serverURL = constants.devServer;
//
//     fetch(`${serverURL}/${route}`, requestDetails)
//       .then(handleErrors)
//       .then(data => resolve(data))
//       .catch(err => reject(err));
//
//   });
//
//   const timeout = new Promise((request, reject) => {
//     setTimeout(reject, timeoutDuration, `Request timed out!`);
//   });
//
//   return new Promise((resolve, reject) => {
//     Promise.race([request, timeout])
//       .then(result => resolve(result))
//       .catch(error => reject(error));
//   });
// }
