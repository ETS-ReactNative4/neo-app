import React from "react";
import Modal from "react-native-modal";
import { View, Text, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";
import { responsiveWidth } from "react-native-responsive-dimensions";
import SimpleButton from "../SimpleButton/SimpleButton";
import constants from "../../constants/constants";

const DialogBox = ({ icon, title, message, isVisible, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      animationInTiming={300}
      onBackButtonPress={onClose}
    >
      <View style={styles.dialogBoxContainer}>
        <Image source={icon} style={styles.icon} resizeMode={"contain"} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <SimpleButton
          text={"Okay!"}
          containerStyle={{ width: 80, height: 40 }}
          action={onClose}
          textColor={constants.firstColor}
          hasBorder={true}
          color={"transparent"}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dialogBoxContainer: {
    alignSelf: "center",
    height: 240,
    width: responsiveWidth(80),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 32
  },
  icon: {
    height: 64,
    width: 64,
    margin: 8
  },
  title: {
    ...constants.fontCustom(constants.primarySemiBold, 17),
    margin: 16,
    color: constants.black1
  },
  message: {
    ...constants.fontCustom(constants.primaryLight, 14),
    marginBottom: 16,
    color: constants.black2
  }
});

DialogBox.propTypes = forbidExtraProps({
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
});

export default DialogBox;
