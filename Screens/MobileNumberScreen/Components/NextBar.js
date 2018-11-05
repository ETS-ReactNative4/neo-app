import React from "react";
import { View, KeyboardAvoidingView, StyleSheet } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import XSensorPlaceholder from "../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import PropTypes from "prop-types";
import KeyboardAvoidingActionBar from "../../../CommonComponents/KeyboardAvoidingActionBar/KeyboardAvoidingActionBar";

const NextBar = ({ onClickNext, navigation }) => {
  return (
    <KeyboardAvoidingActionBar
      containerStyle={styles.bottomBar}
      xSensorPlaceholderColor={"rgba(239,249,242,1)"}
      navigation={navigation}
    >
      <SimpleButton
        containerStyle={{
          height: 24,
          width: 52,
          alignSelf: "flex-end",
          marginHorizontal: 24
        }}
        text={"next"}
        action={onClickNext}
        textColor={constants.firstColor}
        underlayColor={"transparent"}
        color={"transparent"}
      />
    </KeyboardAvoidingActionBar>
  );
};

NextBar.propTypes = {
  onClickNext: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  bottomBar: {
    height: 40,
    backgroundColor: "rgba(239,249,242,1)",
    justifyContent: "center"
  }
});

export default NextBar;
