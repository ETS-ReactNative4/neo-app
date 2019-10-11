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
import restartApp from "../../../Services/restartApp/restartApp";

const UnableToUseChat = ({
  text = constants.onChatNoInternetText,
  contactNumber,
  showAlternatives = false
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
        containerStyle={{ marginTop: 16, borderRadius: 4 }}
        text={"Call us"}
        action={() => {
          recordEvent(constants.chatCallSupportClick);
          dialer(contactNumber);
        }}
        textColor={"white"}
      />
      {showAlternatives ? (
        <Text style={styles.alternateText}>
          {constants.chatAlternativeText}
          <Text onPress={restartApp} style={styles.alternateLink}>
            {constants.chatAlternativeLink}
          </Text>
        </Text>
      ) : null}
    </View>
  );
};

UnableToUseChat.propTypes = {
  text: PropTypes.string,
  contactNumber: PropTypes.string.isRequired,
  showAlternatives: PropTypes.bool
};

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
  },
  alternateText: {
    position: "absolute",
    bottom: 24,
    width: responsiveWidth(100) - 48,
    textAlign: "center",
    ...constants.fontCustom(constants.primaryLight, 16, 22),
    color: constants.black2
  },
  alternateLink: {
    ...constants.fontCustom(constants.primarySemiBold, 16, 22),
    color: constants.firstColor,
    textDecorationLine: "underline"
  }
});

export default UnableToUseChat;
