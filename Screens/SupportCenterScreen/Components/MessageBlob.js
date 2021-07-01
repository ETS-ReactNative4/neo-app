import React from "react";
import { View, Text, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";

const MessageBlob = ({
  containerStyle = StyleSheet.create({}),
  isAdmin = false,
  name = "",
  message = "",
  time = ""
}) => {
  return (
    <View style={[styles.messageBlobContainer, containerStyle]}>
      <View>
        <Text style={[styles.nameText, isAdmin ? styles.adminName : {}]}>
          {name}
        </Text>
      </View>
      <View>
        <Text style={styles.messageText}>{message}</Text>
      </View>
      <View>
        <Text style={styles.timeText}>{time}</Text>
      </View>
    </View>
  );
};

MessageBlob.propTypes = {
  containerStyle: ViewPropTypes.style,
  isAdmin: PropTypes.bool,
  name: PropTypes.string,
  message: PropTypes.string,
  time: PropTypes.string
};

const styles = StyleSheet.create({
  messageBlobContainer: {
    marginVertical: 18
  },
  nameText: {
    ...constants.fontCustom(constants.primarySemiBold, 13),
    color: constants.shade1,
    marginBottom: 8
  },
  adminName: {
    color: constants.firstColor
  },
  messageText: {
    ...constants.fontCustom(constants.primaryRegular, 14, 18),
    color: constants.black1,
    marginBottom: 8
  },
  timeText: {
    ...constants.fontCustom(constants.primaryLight, 13),
    color: constants.black2
  }
});

export default MessageBlob;
