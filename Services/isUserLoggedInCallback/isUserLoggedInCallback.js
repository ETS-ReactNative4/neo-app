import * as Keychain from "react-native-keychain";
import { logError } from "../errorLogger/errorLogger";

/**
 * Checks if the user is logged in or not and
 * fires callbacks to execute the corresponding function
 *
 * @deprecated in favour of isUserLoggedIn
 * Should not be used anymore...
 */
const isUserLoggedInCallback = async (
  callbackSuccess = () => null,
  callbackFailure = () => null,
  callbackException = () => null
) => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials && credentials.username && credentials.password) {
      callbackSuccess(credentials);
    } else {
      callbackFailure();
    }
  } catch (e) {
    callbackException();
    logError(e);
  }
};

export default isUserLoggedInCallback;
