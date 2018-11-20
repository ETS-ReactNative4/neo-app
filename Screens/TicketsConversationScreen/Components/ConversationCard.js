import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const ConversationCard = ({ message, time, user, containerStyle }) => {
  if (!containerStyle) containerStyle = {};
  return (
    <View style={[styles.conversationCard, containerStyle]}>
      <View style={styles.header}>
        <Text style={styles.name}>{user}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

ConversationCard.propTypes = forbidExtraProps({
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

const styles = StyleSheet.create({
  conversationCard: {
    marginVertical: 8
  },
  name: {
    ...constants.fontCustom(constants.primarySemiBold, 15),
    color: constants.black1
  },
  time: {
    ...constants.fontCustom(constants.primaryLight, 13),
    color: constants.black2
  },
  message: {
    ...constants.fontCustom(constants.primaryLight, 17),
    color: constants.black2
  }
});

export default ConversationCard;
