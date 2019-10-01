import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import dialer from "../../../Services/dialer/dialer";
import { recordEvent } from "../../../Services/analytics/analyticsService";
import {
  responsiveWidth,
  responsiveHeight
} from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const UnableToUseChat = ({
  text = constants.onChatNoInternetText,
  contactNumber
}) => {
  return (
    <View style={styles.unableToUseChatContainer}>
      <Image
        source={constants.onChatNoInternetIllus}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.message}>{text}</Text>
      <SimpleButton
        containerStyle={{ marginTop: 8 }}
        text={contactNumber}
        action={() => {
          recordEvent(constants.chatCallSupportClick);
          dialer(contactNumber);
        }}
        textColor={constants.firstColor}
        color={"transparent"}
        hasBorder={true}
      />
    </View>
  );
};

UnableToUseChat.propTypes = forbidExtraProps({
  text: PropTypes.string,
  contactNumber: PropTypes.string.isRequired
});

const styles = StyleSheet.create({
  unableToUseChatContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24
  },
  image: {
    width: responsiveWidth(100) - 48,
    height: responsiveHeight(25)
  },
  message: {
    ...constants.fontCustom(constants.primaryLight, 15, 18),
    color: constants.black2,
    textAlign: "center"
  }
});

export default UnableToUseChat;
