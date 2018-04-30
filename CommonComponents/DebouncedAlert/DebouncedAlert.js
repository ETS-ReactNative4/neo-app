import { Alert } from "react-native";

const DebouncedAlert = (header, body, params = {}) => {
  setTimeout(() => {
    Alert.alert(header, body, params);
  }, 300);
};

export default DebouncedAlert;
