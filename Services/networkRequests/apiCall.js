import * as Keychain from 'react-native-keychain';
import constants from '../../constants/constants';
import {logBreadCrumb, logError} from '../errorLogger/errorLogger';
import logOut from '../logOut/logOut';
import DebouncedAlert from '../../CommonComponents/DebouncedAlert/DebouncedAlert';
import DeviceInfo from 'react-native-device-info';
import _ from 'lodash';
// import { perf } from "react-native-firebase";
import perf from '@react-native-firebase/perf';
import {isProduction} from '../getEnvironmentDetails/getEnvironmentDetails';
import storeService from '../storeService/storeService';

const timeoutDuration = 60000;
const apiServer = constants.apiServerUrl;
let isJustLoggedOut = false;

const logger = (arg1, arg2) => {
  if (!isProduction()) {
    if (arg2) {
      console.log(arg1, arg2);
    } else {
      console.log(arg1);
    }
  }
};

const apiCall = async (
  route,
  body = {},
  method = 'POST',
  customDomain = false,
  customToken = null,
  customHeader = {},
  abortController = null,
) => {
  const credentials = await Keychain.getGenericPassword();

  let headerObject = {
    'Content-Type': 'application/json',
    isMobile: true,
    deviceId: DeviceInfo.getUniqueId(),
    appVersion: DeviceInfo.getVersion(),
    locale: storeService.deviceLocaleStore.deviceLocale,
  };

  if (customHeader && !_.isEmpty(customHeader)) {
    headerObject = {
      ...headerObject,
      ...customHeader,
    };
  }

  if (customToken) {
    headerObject.Authorization = customToken;
  } else if (credentials && credentials.username && credentials.password) {
    headerObject.Authorization = credentials.password;
  }

  // eslint-disable-next-line no-undef
  const headers = new Headers(headerObject);

  const requestDetails = {
    method,
    mode: 'cors',
    headers,
  };

  if (method !== 'GET') {
    requestDetails.body = JSON.stringify(body);
  }

  if (abortController) {
    requestDetails.signal = abortController.signal;
  }

  const serverURL = customDomain ? customDomain : apiServer;

  const requestURL = `${serverURL}${route}`;

  /**
   * Start Performance monitoring for the current request
   */
  const metric = perf().newHttpMetric(requestURL, method);
  await metric.start();
  try {
    if (!_.isEmpty(body)) {
      for (let key in body) {
        if (body.hasOwnProperty(key)) {
          await metric.putAttribute(
            key,
            JSON.stringify(body[key]).substring(0, 100),
          );
        }
      }
    }
  } catch {}

  /**
   * This promise will start the network request and will return the data from the server
   * or throw errors in case the network request fails
   */
  const request = new Promise((resolve, reject) => {
    logger(requestURL);
    logger(body);
    logger(JSON.stringify(body));
    logger(method);
    logger(headers);

    function handleResponse(response) {
      /**
       * Tracking the response performance
       */
      metric.setHttpResponseCode(response.status);
      metric.setResponseContentType(response.headers.get('Content-Type'));
      metric.stop();

      // metric
      //   .setHttpResponseCode(response.status)
      //   .then(() => {
      //     metric.setResponseContentType(response.headers.get("Content-Type"));
      //   })
      //   .then(() => {
      //     // metric
      //     //   .setResponsePayloadSize(response.headers.get("Content-Length"))
      //     //   .then(() => {
      //     metric.stop();
      //     //  });
      //   });

      logger(response.status);
      logger(response.statusText);

      /**
       * User session has expired and he must be forced to logout
       */
      if (
        response.status === 401 &&
        credentials &&
        credentials.username &&
        credentials.password
      ) {
        if (!isJustLoggedOut) {
          isJustLoggedOut = true;
          DebouncedAlert('Oops!', 'Session Expired... Please Login again!');
        }
        logOut();
        return {status: 'EXPIRED'};
      } else {
        isJustLoggedOut = false;
        /**
         * Request success will return the data
         */
        if (response.status === 200) {
          const data = response.json();
          return data;
        } else if (response.status === 204) {
          /**
           * Request success but no data returned from the server
           */
          const data = {status: 'SUCCESS'};
          return data;
        } else {
          /**
           * Request failed. This will throw an error object to fail the fetch promise
           */
          const errorInfo = {
            type: 'apiCall',
            url: requestURL,
            body,
            status: response.status,
            ...headerObject,
          };
          const errorObject = Error(
            JSON.stringify({
              status: response.status,
              url: requestURL,
            }),
          );
          logError(errorObject, errorInfo);
          throw errorObject;
        }
      }
    }

    fetch(requestURL, requestDetails)
      .then(handleResponse) // will return the data or handles any errors in the network request
      .then(data => {
        logger(data);
        logger(requestURL, JSON.stringify(data));
        logBreadCrumb({
          message: requestURL,
          category: constants.errorLoggerEvents.categories.networkRequest,
          data: {
            requestURL,
            requestBody: JSON.stringify(requestDetails.body),
            ...headerObject,
            response: JSON.stringify(data),
          },
          level: constants.errorLoggerEvents.levels.info,
        });
        resolve(data);
      })
      .catch(err => {
        logger(err);
        reject(err);
      });
  });

  /**
   * Will execute a reject action after the `timeoutDuration`
   * If it executes this will mark the network request as timed out
   */
  const networkTimeOut = reject => {
    return setTimeout(() => {
      const errorInfo = {
        type: 'apiCall',
        url: requestURL,
        body,
        ...headerObject,
      };
      const errorObject = Error(
        JSON.stringify({
          status: 'Request timed out!',
          url: requestURL,
        }),
      );
      logError(errorObject, errorInfo);
      reject(errorObject);
    }, timeoutDuration);
  };

  /**
   * Starts both the timeout and the network request
   * and resolves whichever executes first.
   */
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
