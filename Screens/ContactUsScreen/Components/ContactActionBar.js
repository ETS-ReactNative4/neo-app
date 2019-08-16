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
          text={"Cancel"}
          action={cancelAction}
          textColor={constants.black2}
          hasBorder={true}
          containerStyle={{
            backgroundColor: "white",
            width: responsiveWidth(40),
            marginHorizontal: 4
          }}
        />
        <SimpleButton
          text={"Send"}
          action={sendAction}
          textColor={"white"}
          underlayColor={constants.firstColorAlpha(0.4)}
          containerStyle={{ width: responsiveWidth(40), marginHorizontal: 4 }}
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
  sendAction: PropTypes.func
};

const styles = StyleSheet.create({
  contactActionContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0, 0, 0, .3)"
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
