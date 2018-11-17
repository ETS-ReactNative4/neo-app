import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import constants from "../../../constants/constants";

const ConversationCard = ({ message, time, user }) => {
  return (
    <View style={styles.conversationCard}>
      <View style={styles.header}>
        <Text style={styles.name}>{user}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

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
