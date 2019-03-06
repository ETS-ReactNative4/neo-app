import * as Keychain from "react-native-keychain";
import { logError } from "../errorLogger/errorLogger";

/**
 * Checks if the user is logged in or not and
 * fires callbacks to execute the corresponding function
 */
const isUserLoggedInCallback = async (
  callbackSuccess = () => null,
  callbackFailure = () => null,
  callbackException = () => null
) => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials && credentials.username && credentials.password) {
      callbackSuccess();
    } else {
      callbackFailure();
    }
  } catch (e) {
    callbackException();
    logError(e);
  }
};

export default isUserLoggedInCallback;
