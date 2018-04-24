import React from "react";
import {
  Modal,
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  StyleSheet
} from "react-native";

const CountryCodePicker = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableHighlight
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center"
        }}
        underlayColor={"red"}
      >
        <Text>{"Country Code Picker"}</Text>
      </TouchableHighlight>
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default CountryCodePicker;
