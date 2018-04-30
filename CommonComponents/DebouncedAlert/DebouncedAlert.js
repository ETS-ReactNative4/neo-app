import { Alert } from "react-native";

const DebouncedAlert = (header, body, buttons = [], options = {}) => {
  setTimeout(() => {
    Alert.alert(header, body, buttons, options);
  }, 300);
};

export default DebouncedAlert;
