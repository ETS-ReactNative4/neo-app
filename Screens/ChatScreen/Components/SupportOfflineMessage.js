import React from "react";
import { View, StyleSheet, ViewPropTypes, Text } from "react-native";
import PropTypes from "prop-types";
import {
  CONSTANT_chatOfflineAction,
  CONSTANT_chatOfflineMessage
} from "../../../constants/appText";
import constants from "../../../constants/constants";

const SupportOfflineMessage = ({
  containerStyle = StyleSheet.create({}),
  ctaAction = () => null,
  time = ""
}) => {
  return (
    <View style={[styles.offlineMessageContainer, containerStyle]}>
      <Text style={styles.infoText}>
        {CONSTANT_chatOfflineMessage.replace(":time", time)}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.ctaText} onPress={ctaAction}>
          {"Call us"}
        </Text>
        {CONSTANT_chatOfflineAction}
      </Text>
    </View>
  );
};

SupportOfflineMessage.propTypes = {
  containerStyle: ViewPropTypes.style,
  ctaAction: PropTypes.func,
  time: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  offlineMessageContainer: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: constants.black1,
    alignItems: "center",
    justifyContent: "center"
  },
  infoText: {
    ...constants.fontCustom(constants.primaryRegular, 14, 18),
    color: "white",
    textAlign: "center"
  },
  ctaText: {
    fontFamily: constants.primarySemiBold,
    color: constants.firstColor,
    textDecorationLine: "underline"
  }
});

export default SupportOfflineMessage;
