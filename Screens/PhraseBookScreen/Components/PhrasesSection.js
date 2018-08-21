import React from "react";
import {
  ScrollView,
  TouchableHighlight,
  Image,
  Text,
  StyleSheet,
  View
} from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";
import { isIphoneX } from "react-native-iphone-x-helper";

const PhrasesSection = ({ phrases, selectPhrase }) => {
  return (
    <ScrollView>
      {phrases.map((phrase, index) => {
        return (
          <Phrase
            key={index}
            phrase={phrase}
            selectPhrase={selectPhrase}
            isLast={index === phrases.length - 1}
          />
        );
      })}
    </ScrollView>
  );
};

const Phrase = ({ phrase, selectPhrase, isLast }) => {
  return (
    <TouchableHighlight
      onPress={() => {}}
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
      <View style={styles.phraseContainer}>
        <Text style={styles.phraseText}>{phrase.phrase}</Text>
        <TouchableHighlight
          onPress={() => {}}
          underlayColor={"transparent"}
          style={styles.favoriteTouchable}
        >
          <Icon size={18} name={constants.pinIcon} />
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );
};

PhrasesSection.propTypes = {
  phrases: PropTypes.arrayOf(
    PropTypes.shape({
      phrase: PropTypes.string.isRequired,
      translation: PropTypes.string.isRequired,
      sound: PropTypes.string.isRequired
    })
  ).isRequired,
  selectPhrase: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  phraseTouchable: {
    paddingHorizontal: 24,
    height: 40,
    borderTopWidth: 1,
    backgroundColor: constants.firstColorBackground,
    borderColor: constants.shade5
  },
  phraseContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row"
  },
  phraseText: {
    flex: 1
  },
  favoriteTouchable: {
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  favoriteIcon: {
    height: 18,
    width: 18
  }
});

export default PhrasesSection;
