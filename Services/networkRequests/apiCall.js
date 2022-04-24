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
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MTRlOWZkOC1iYTM0LTQwM2UtODBlOS1mZmI1NDg1ZWM0YzUiLCJqdGkiOiIxYzJmMjI0ZTAzNmNiNDc3NDZjODJkMjA1NzJiODhlNWU0NWY3YTUyMmRkNjVmZWJmNGQ1ZTAyMTM3NzgxMjIwMmU1ZmNjZmY4NjRkOWQ5MiIsImlhdCI6MTY1MDc3Njg5MC40NzQ1NTgsIm5iZiI6MTY1MDc3Njg5MC40NzQ1NjQsImV4cCI6MTY4MjMxMjg5MC40NjE1NzgsInN1YiI6IjMwIiwic2NvcGVzIjpbXX0.iifV3uk4rE7p2nif9KWeJtateZ2GIKGL6APngXuZKpBaZgCrsnmXdAR7b1sC3L_m-axmXG9xjo3mvU2T3lpjaT-1q9RkMYZSpAsD4y89LwCzA76X8pDLKkOg2MiXtyO8EqC24mpRil3xcDfoLuErzg4LOk-u9xl6bqAI-EGPPT8iFnUO6E55m6LZm42ZSY-hgiN0shKq_vP0t82R5IpOVKYqcf5Wdz5kWMIjWUoym9xGJ8mLnC3SfItx4c0OHIA5YhTZwYiuRpCt7UjpMURzTzsiE4uGT9EMdGS8Le68peKcY6SssnL48tzkLSoZ7Tby9OZwHNavkHs4Gb-pghwofrr7umiWptRGVOJQEJWFUQAydvOGjuhTFQb3Ryw85olJZ25SX-IkIdky0mVfIX62M3qMiHOTkIKSeTqfMwEh8ZipCVpR7gMRELu2DRViKoerq9o32ACrcMMXhA2W6Fz8Y8dj1m598SjoyYP8zc-FDj7z1kXOM4wQluOOxJcxpwy8jA9Sr5HYtQyotgCV0gnVEKpPwL5NXBPRNyaE7N4OlrbJm_-VVjvd2C13PTZFqjoNSsxrZ3gANWGekV8xq1k-LTbtMRdWT53Zolg8W2mtPXaPbFoFK8wG1jy_IwNNYnaH1JLI-nQSQG2PUzD_0g__EFlLlsAjOa535unix51l3UM',
    //1NDg1ZWM0YzUiLCJqdGkiOiIyNTcwYzVlZDdlNzA4MzFmODdiNDY2NjU0NTAxNDdmNzI0YzZkMDU4Njk5NWQ4NmM5MTlkOGY4MTU1MGY2OTk1MDE0YTFhYzlkN2U2MTJlMiIsImlhdCI6MTY1MDUxNjY4NC43MzQzODcsIm5iZiI6MTY1MDUxNjY4NC43MzQzOTYsImV4cCI6MTY4MjA1MjY4NC43MjA1NjIsInN1YiI6IjMwIiwic2NvcGVzIjpbXX0.kZCQRIt4dOgrLaV0NPYvel6S5spkgeP3XsgFTFd4NomPKDtBR11CrODkmZxOMBtUNnpCt615FMoxVokUz20LIbvnUGdlph_Q_7QobRUx-C0r5oPOtz150Gw_z_HHr8TMyrnP1Ke9hbXa7q9m7upvnvpxbGPq0KgntphTH03Vreh-H70UmjVo4J5bdi4mJv3gplSUgQWzXlQ_fm4G59Qc2-YU3mYJ03PsdPGjHpbRXbstAyuL7AgYKcUYBtPOIPYvr3C-04k_VT07VoVbS_ASje6wsZFsFR5UKMwkzfQKokT_9vRo4XxlruLSl1pYO4ZJQ-U2i0Gboagum-3jEvs6pu8YcL7rY4oeTMoz039tuho5t3hwChfDsMvRh2wqivFTx18lLzuxYbeZD0__JzYnqPSlRq8PegRL1Z_iITbSuE3uHLVa__zYUcRHAifyxqE_gyvQpd9m3Z9C4srVw3pECgdjgebWIpMf43MzeAp9VERIYnV7h7q8Tiq8OVoyrKbyUIM_x6G09z8Lm5XLHkblmaL50M5zSoB9whBJx1uP2bwj1bbI7R6K8Od6xt5pk5lCY2lt0ZCraCuEFvW7Im7kQq5LPaMmbwU_EIBxuPxP2Ha9WOZjXtGkuDrUCd0RFj_H176k0XHYjbcvufSQ46KikmWBTsvUDycYibbHECLkg_A` };
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
