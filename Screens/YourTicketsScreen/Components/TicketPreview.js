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
  isLast,
  containerStyle
}) => {
  if (!containerStyle) containerStyle = {};
  return (
    <TouchableOpacity
      onPress={action}
      style={[
        styles.previewContainer,
        isLast ? styles.lastContainer : null,
        containerStyle
      ]}
    >
      <View style={styles.titleContainer}>
        <Text style={[styles.title, isUnRead ? styles.isUnread : {}]}>
          {title}
        </Text>
        <Text style={[styles.time, isUnRead ? styles.isUnread : {}]}>
          {isClosed ? "Closed" : lastMessageTime}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text
          style={[styles.message, isUnRead ? styles.isUnread : {}]}
          numberOfLines={1}
          ellipsizeMode={"tail"}
        >
          {lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade4,
    paddingVertical: 4
  },
  lastContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade4
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    ...constants.fontCustom(constants.primarySemiBold, 17, 24),
    color: constants.shade1
  },
  time: {
    ...constants.fontCustom(constants.primaryLight, 15, 18),
    color: constants.shade2
  },
  isUnread: {
    color: constants.black1,
    fontWeight: "bold"
  },
  textContainer: {},
  message: {
    ...constants.fontCustom(constants.primaryLight, 15, 24),
    color: constants.shade2
  }
});

TicketPreview.propTypes = forbidExtraProps({
  title: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
  lastMessageTime: PropTypes.string.isRequired,
  isClosed: PropTypes.bool.isRequired,
  isUnRead: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

export default TicketPreview;
