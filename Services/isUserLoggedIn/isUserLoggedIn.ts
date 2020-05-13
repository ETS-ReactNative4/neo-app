import * as Keychain from "react-native-keychain";
import { CONSTANT_loggedInTokenName } from "../../constants/stringConstants";

/**
 * Checks if the user is logged into the app
 */
const isUserLoggedIn = (): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    Keychain.getGenericPassword()
      .then(credentials => {
        if (credentials && typeof credentials === "object") {
          if (
            credentials.username === CONSTANT_loggedInTokenName &&
            credentials.password
          ) {
            resolve(true);
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      })
      .catch(reject);
  });
};

export default isUserLoggedIn;
