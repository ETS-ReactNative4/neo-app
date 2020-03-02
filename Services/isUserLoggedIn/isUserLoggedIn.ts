import * as Keychain from "react-native-keychain";

const isUserLoggedIn = (): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    Keychain.getGenericPassword()
      .then(credentials => {
        if (typeof credentials === "object") {
          if (credentials.username && credentials.password) {
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
