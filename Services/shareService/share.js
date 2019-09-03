import Share from "react-native-share";
import { logError } from "../errorLogger/errorLogger";

export const singleShare = shareOptions => {
  return new Promise((resolve, reject) => {
    Share.shareSingle(shareOptions)
      .then(resolve)
      .catch(error => {
        if (error.message.indexOf("Not installed") < 0) {
          logError("Failed to Share", { error, shareOptions });
          reject();
        }
        resolve();
      });
  });
};

export const share = shareOptions => {
  return new Promise((resolve, reject) => {
    Share.open(shareOptions)
      .then(resolve)
      .catch(error => {
        if (error.message !== "User did not share") {
          logError("Failed to Share", { error, shareOptions });
          reject();
        }
      });
  });
};
