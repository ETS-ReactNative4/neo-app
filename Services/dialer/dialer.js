import { Linking } from "react-native";
import { logError } from "../errorLogger/errorLogger";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";

const dialer = number => {
  const dialUrl = `tel:${number}`;

  Linking.canOpenURL(dialUrl)
    .then(supported => {
      if (!supported) {
        DebouncedAlert("Error!", "Unable to open dialer!");
        logError("dialer url failed", {
          eventType: "Device cannot open dialer!"
        });
      } else {
        return Linking.openURL(dialUrl);
      }
    })
    .catch(err => {
      DebouncedAlert("Error!", "No dialer found!");
      logError(err, {
        eventType: "Device cannot open dialer!"
      });
    });
};

export default dialer;
