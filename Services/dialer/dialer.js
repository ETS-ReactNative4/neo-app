import { Linking } from "react-native";
import { logError } from "../errorLogger/errorLogger";

const dialer = number => {
  const dialUrl = `tel:${number}`;

  Linking.canOpenURL(dialUrl)
    .then(supported => {
      if (!supported) {
        alert("Unable to open dialer!");
        logError("dialer url failed", {
          eventType: "Device cannot open dialer!"
        });
      } else {
        return Linking.openURL(dialUrl);
      }
    })
    .catch(err => {
      alert("No dialer found!");
      logError(err, {
        eventType: "Device cannot open dialer!"
      });
    });
};

export default dialer;
