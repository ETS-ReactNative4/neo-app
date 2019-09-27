import React from "react";
import { View, StyleSheet, ViewPropTypes, Text } from "react-native";
import PropTypes from "prop-types";
import CustomHtmlView from "../../../CommonComponents/CustomHtmlView/CustomHtmlView";
import constants from "../../../constants/constants";

const questionStyleSheet = {
  ...constants.htmlStyleSheet,
  p: {
    fontFamily: constants.primarySemiBold,
    fontSize: 18,
    lineHeight: 22,
    color: constants.black1
  }
};

const answerStyleSheet = {
  ...constants.htmlStyleSheet,
  p: {
    fontFamily: constants.primaryRegular,
    fontSize: 17,
    lineHeight: 24,
    color: constants.black2
  },
  a: {
    ...constants.htmlStyleSheet.a,
    fontFamily: constants.primaryRegular
  }
};

const HelpDetailsBlock = ({
  question = "",
  answer = "",
  containerStyle = StyleSheet.create({})
}) => {
  return (
    <View style={[styles.helpDetailsBlockContainer, containerStyle]}>
      <View style={styles.questionWrapper}>
        <CustomHtmlView html={question} styleSheet={questionStyleSheet} />
      </View>
      <View style={styles.answerWrapper}>
        <CustomHtmlView html={answer} styleSheet={answerStyleSheet} />
      </View>
    </View>
  );
};

HelpDetailsBlock.propTypes = {
  containerStyle: ViewPropTypes.style,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  helpDetailsBlockContainer: {},
  questionWrapper: {},
  questionText: {},
  answerWrapper: {
    marginTop: 16
  }
});

export default HelpDetailsBlock;
