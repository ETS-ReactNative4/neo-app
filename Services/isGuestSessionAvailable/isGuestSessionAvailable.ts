import * as Keychain from "react-native-keychain";
import { CONSTANT_guestTokenName } from "../../constants/stringConstants";

/**
 * Checks if the user already has a valid guest session
 */
const isGuestSessionAvailable = (): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    Keychain.getGenericPassword()
      .then(credentials => {
        if (credentials && typeof credentials === "object") {
          if (
            credentials.username === CONSTANT_guestTokenName &&
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

export default isGuestSessionAvailable;
