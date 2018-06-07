import * as Keychain from "react-native-keychain";

const registerToken = async token => {
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

export default registerToken;
