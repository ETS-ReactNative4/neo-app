import React from "react";
import { View, KeyboardAvoidingView, StyleSheet } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import XSensorPlaceholder from "../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import PropTypes from "prop-types";

const NextBar = ({ onClickNext, keyboardSpace }) => {
  return (
    <View key={2}>
      <KeyboardAvoidingView
        behavior="padding"
        style={[styles.bottomBar, { marginBottom: keyboardSpace }]}
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
          textColor={"white"}
          underlayColor={constants.firstColorAlpha(0.4)}
          color={constants.firstColor}
        />
      </KeyboardAvoidingView>
      {isIphoneX() ? (
        <XSensorPlaceholder
          containerStyle={{ backgroundColor: "rgba(239,249,242,1)" }}
        />
      ) : null}
    </View>
  );
};

NextBar.propTypes = {
  onClickNext: PropTypes.func.isRequired,
  keyboardSpace: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  bottomBar: {
    height: 40,
    backgroundColor: "rgba(239,249,242,1)",
    justifyContent: "center"
  }
});

export default NextBar;
