import isUserLoggedIn from "../../isUserLoggedIn/isUserLoggedIn";
import isGuestSessionAvailable from "../../isGuestSessionAvailable/isGuestSessionAvailable";
import guestSessionLogin from "../../guestSessionLogin/guestSessionLogin";

/**
 * Creates a new guest session
 * - if the user hasn't logged into the app previously
 * - and a guest session doesn't previously exist on the app
 */
const createGuestSession = (): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    isUserLoggedIn().then(userSessionExists => {
      if (!userSessionExists) {
        isGuestSessionAvailable().then(guestSessionExists => {
          if (!guestSessionExists) {
            /**
             * Guest session
             */
            guestSessionLogin()
              .then(isGuestSessionCreated => {
                if (!isGuestSessionCreated) {
                  /**
                   * PT TODO: Failed to create guest session. Needs to be handled
                   */
                  resolve(false);
                } else {
                  /*
                   * PT TODO: Guest account created currently no action needed
                   */
                  resolve(true);
                }
              })
              .catch(() => {
                /**
                 * PT TODO: Failed to create guest session. Needs to be handled
                 */
                reject();
              });
          } else {
            // PT TODO: Guest session already exists
            resolve(true);
          }
        });
      } else {
        // PT TOD0 : User already logged in need to be handled
        resolve(true);
      }
    });
  });
};

export default createGuestSession;
