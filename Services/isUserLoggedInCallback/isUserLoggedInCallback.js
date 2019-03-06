import * as Keychain from "react-native-keychain";
import { logError } from "../errorLogger/errorLogger";

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
