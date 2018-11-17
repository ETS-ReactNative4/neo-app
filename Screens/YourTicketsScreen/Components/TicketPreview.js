import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../constants/constants";

const TicketPreview = ({
  title,
  lastMessage,
  lastMessageTime,
  action,
  isClosed,
  isUnRead,
  isLast
}) => {
  return (
    <TouchableOpacity
      onPress={action}
      style={[styles.previewContainer, isLast ? styles.lastContainer : null]}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{lastMessageTime}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.message} numberOfLines={1} ellipsizeMode={"tail"}>
          {lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    borderTopWidth: 1,
    borderTopColor: constants.shade4,
    paddingVertical: 4
  },
  lastContainer: {
    borderBottomWidth: 1,
    borderBottomColor: constants.shade4
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    ...constants.fontCustom(constants.primarySemiBold, 17, 24),
    color: constants.black2
  },
  time: {
    ...constants.fontCustom(constants.primaryLight, 15, 18),
    color: constants.black2
  },
  textContainer: {},
  message: {
    ...constants.fontCustom(constants.primaryLight, 15, 24)
  }
});

TicketPreview.propTypes = forbidExtraProps({
  title: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
  lastMessageTime: PropTypes.string.isRequired,
  isClosed: PropTypes.bool.isRequired,
  isUnRead: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired
});

export default TicketPreview;
