import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import CommonHeader from "../../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../../constants/constants";

class FAQ extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam("title", "FAQ");
    return {
      header: <CommonHeader title={title} navigation={navigation} />
    };
  };

  render() {
    return (
      <View style={styles.faqQuestionsContainer}>
        <ScrollView style={styles.faqScrollView} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  faqQuestionsContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  faqScrollView: {
    marginHorizontal: 24,
    borderTopWidth: 2,
    borderTopColor: constants.shade4
  }
});

export default FAQ;
