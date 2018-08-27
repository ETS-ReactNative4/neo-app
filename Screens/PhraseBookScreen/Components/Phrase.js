import React from "react";
import PropTypes from "prop-types";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../../constants/constants";
import { StyleSheet, TouchableHighlight, Platform, Text } from "react-native";

const Phrase = ({ phrase, selectPhrase, isLast }) => {
  return (
    <TouchableHighlight
      onPress={() => selectPhrase(phrase)}
      underlayColor={"white"}
      style={[
        styles.phraseTouchable,
        isLast
          ? {
              borderBottomWidth: 1,
              marginBottom: 48 + isIphoneX() ? constants.xSensorAreaHeight : 0
            }
          : {}
      ]}
    >
      <Text style={styles.phraseText}>{phrase}</Text>
    </TouchableHighlight>
  );
};

Phrase.propTypes = {
  phrase: PropTypes.string.isRequired,
  selectPhrase: PropTypes.func.isRequired,
  isLast: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  phraseTouchable: {
    flex: 1,
    paddingHorizontal: 24,
    height: 40,
    borderTopWidth: 1,
    backgroundColor: constants.firstColorBackground,
    borderColor: constants.shade5,
    justifyContent: "center"
  },
  phraseText: {
    ...constants.fontCustom(constants.primaryLight, 15, 15),
    ...Platform.select({
      ios: {
        paddingTop: 4
      }
    }),
    color: constants.black2
  }
});

export default Phrase;
