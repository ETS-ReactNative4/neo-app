import React from "react";
import constants from "../../../constants/constants";
import { Text, TouchableHighlight, View, StyleSheet } from "react-native";
import Icon from "../../../CommonComponents/Icon/Icon";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const PhraseInfo = ({
  selectedPhrase,
  selectedTranslation,
  speak,
  isSpeaking
}) => {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.selectedPhraseWrapper}>
        <Text
          style={styles.selectedPhrase}
          numberOfLines={2}
          ellipsizeMode={"tail"}
        >
          {selectedPhrase}
        </Text>
      </View>
      <View style={styles.selectedTranslationWrapper}>
        <Text
          style={[
            styles.selectedTranslation,
            selectedTranslation.length > 20 ? { fontSize: 24 } : {}
          ]}
          numberOfLines={2}
          ellipsizeMode={"tail"}
        >
          {selectedTranslation}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableHighlight
          underlayColor={constants.shade1}
          onPress={speak}
          style={styles.buttonContainer}
        >
          <Icon size={24} name={constants.speakerIcon} />
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={constants.shade1}
          onPress={() => {}}
          style={styles.buttonContainer}
        >
          <Icon size={24} name={constants.pinIcon} />
        </TouchableHighlight>
      </View>
    </View>
  );
};

PhraseInfo.propTypes = forbidExtraProps({
  selectedPhrase: PropTypes.string.isRequired,
  selectedTranslation: PropTypes.string.isRequired,
  speak: PropTypes.func.isRequired,
  isSpeaking: PropTypes.bool.isRequired
});

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 16,
    paddingHorizontal: 24,
    height: 184,
    alignItems: "center",
    justifyContent: "center"
  },
  selectedPhraseWrapper: {
    height: 24
  },
  selectedPhrase: {
    ...constants.font17(constants.primaryLight),
    textAlign: "center"
  },
  selectedTranslationWrapper: {
    flex: 1,
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  selectedTranslation: {
    ...constants.font30(constants.primarySemiBold),
    textAlign: "center"
  },
  actionsContainer: {
    flexDirection: "row",
    height: 42,
    marginBottom: 16
  },
  buttonContainer: {
    height: 42,
    width: 42,
    borderRadius: 21,
    borderWidth: 0.5,
    borderColor: constants.shade1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8
  },
  icon: {
    height: 24,
    width: 24
  }
});

export default PhraseInfo;
