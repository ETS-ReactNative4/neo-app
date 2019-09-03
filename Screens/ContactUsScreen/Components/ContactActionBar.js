import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import XSensorPlaceholder from "../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import { responsiveWidth } from "react-native-responsive-dimensions";
import KeyboardAvoidingActionBar from "../../../CommonComponents/KeyboardAvoidingActionBar/KeyboardAvoidingActionBar";

const ContactActionBar = ({
  containerStyle,
  cancelAction,
  sendAction,
  navigation,
  cancelText = "Cancel",
  sendText = "Send",
  sendContainerStyle = {},
  sendTextColor = "white",
  keyBoardStateChange = () => null
}) => {
  if (!containerStyle) containerStyle = {};
  return (
    <KeyboardAvoidingActionBar
      onKeyBoardStateChange={keyBoardStateChange}
      navigation={navigation}
    >
      <View style={[styles.contactActionSection, containerStyle]}>
        <SimpleButton
          text={cancelText}
          action={cancelAction}
          textColor={constants.firstColor}
          hasBorder={true}
          containerStyle={{
            backgroundColor: "white",
            width: responsiveWidth(40),
            marginHorizontal: 4,
            borderRadius: 2
          }}
        />
        <SimpleButton
          text={sendText}
          action={sendAction}
          textColor={sendTextColor}
          underlayColor={constants.firstColorAlpha(0.4)}
          containerStyle={{
            width: responsiveWidth(40),
            marginHorizontal: 4,
            borderRadius: 2,
            ...sendContainerStyle
          }}
        />
      </View>
    </KeyboardAvoidingActionBar>
  );
};

ContactActionBar.propTypes = {
  containerStyle: PropTypes.object,
  navigation: PropTypes.object.isRequired,
  keyBoardStateChange: PropTypes.func,
  cancelAction: PropTypes.func,
  sendAction: PropTypes.func,
  cancelText: PropTypes.string,
  sendText: PropTypes.string,
  sendContainerStyle: PropTypes.object,
  sendTextColor: PropTypes.string
};

const styles = StyleSheet.create({
  contactActionContainer: {
    borderTopWidth: 2,
    borderTopColor: constants.white1
  },
  contactActionSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56
  },
  faqTileText: {
    ...constants.fontCustom(constants.primaryLight, 17),
    color: constants.black2,
    ...Platform.select({
      ios: {
        marginTop: 8
      }
    })
  }
});

export default ContactActionBar;
