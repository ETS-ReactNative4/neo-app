import * as Keychain from "react-native-keychain";
import { CONSTANT_loggedInTokenName } from "../../constants/stringConstants";
import { logError } from "../errorLogger/errorLogger";

const registerToken = async (token: string) => {
  // Store the credentials
  await Keychain.setGenericPassword("jwt", token);

  /**
   * For testing the storage
   */
  // try {
  //   const credentials = await Keychain.getGenericPassword();
  //   if (credentials) {
  //     console.log('Credentials successfully loaded for user ' + credentials.username);
  //   } else {
  //     console.log('No credentials stored')
  //   }
  // } catch (error) {
  //   console.log('Keychain couldn\'t be accessed!', error);
  // }
};

/**
 * Stores JWT token in a secure storage location
 */
export const registerTokenV2 = (
  token: string,
  key: string = CONSTANT_loggedInTokenName
): Promise<boolean> => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      await Keychain.resetGenericPassword();
      await Keychain.setGenericPassword(key, token);
      resolve(true);
    } catch (e) {
      logError(e);
      reject();
    }
  });
};

export default registerToken;
