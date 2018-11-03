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

const ContactActionBar = ({ containerStyle, cancelAction, sendAction }) => {
  if (!containerStyle) containerStyle = {};
  return (
    <View style={[styles.contactActionContainer, containerStyle]}>
      <View style={styles.contactActionSection}>
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
          containerStyle={{ width: responsiveWidth(40), marginHorizontal: 4 }}
        />
      </View>
      <XSensorPlaceholder />
    </View>
  );
};

ContactActionBar.propTypes = forbidExtraProps({
  containerStyle: PropTypes.object,
  sectionName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
});

const styles = StyleSheet.create({
  contactActionContainer: {
    borderTopWidth: 0.5,
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
