import React, { Component } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import CommonHeader from "../../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../../constants/constants";
import ErrorBoundary from "../../../CommonComponents/ErrorBoundary/ErrorBoundary";

@ErrorBoundary()
class FAQAnswers extends Component {
  static navigationOptions = ({ navigation }) => {
    const data = navigation.getParam("data", {});
    const title = data.title || "FAQ";
    return {
      header: <CommonHeader title={title} navigation={navigation} />
    };
  };

  render() {
    const data = this.props.navigation.getParam("data", {});
    const { question, answer } = data;
    return (
      <ScrollView style={styles.faqAnswersContainer}>
        <Text style={styles.question}>{question}</Text>
        <Text style={styles.answer}>{answer}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  faqAnswersContainer: {
    backgroundColor: "white",
    paddingHorizontal: 24
  },
  question: {
    ...constants.fontCustom(constants.primarySemiBold, 20, 24),
    color: constants.black2,
    marginTop: 32
  },
  answer: {
    ...constants.fontCustom(constants.primaryLight, 17),
    marginTop: 8
  }
});

export default FAQAnswers;
