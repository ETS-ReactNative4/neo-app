import React from "react";
import constants from "../../../constants/constants";
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  Image
} from "react-native";
import Icon from "../../../CommonComponents/Icon/Icon";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import DottedLoading from "../../../CommonComponents/DottedLoading/DottedLoading";

const PhraseInfo = ({
  selectedPhrase,
  translatedPhrase,
  isTranslating,
  speak,
  pinPhrase,
  unPinPhrase,
  pinnedPhrases,
  isSpeaking
}) => {
  /**
   * TODO: Add GIF animation for speaking
   */
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
        {isTranslating ? (
          <DottedLoading
            text={`Translating\n`}
            textStyle={[
              styles.selectedTranslation,
              { color: constants.firstColor }
            ]}
            numOfDots={3}
          />
        ) : (
          <Text
            style={[
              styles.selectedTranslation,
              translatedPhrase
                ? translatedPhrase.length > 20
                  ? { fontSize: 24 }
                  : {}
                : {}
            ]}
            numberOfLines={2}
            ellipsizeMode={"tail"}
          >
            {translatedPhrase}
          </Text>
        )}
      </View>

      {selectedPhrase ? (
        <View style={styles.actionsContainer}>
          <TouchableHighlight
            underlayColor={constants.shade1}
            onPress={speak}
            style={styles.buttonContainer}
          >
            {isSpeaking ? (
              <Image
                source={constants.speakerAnimatedIcon}
                resizeMode={"contain"}
                style={{ height: 24, width: 24 }}
              />
            ) : (
              <Image
                source={constants.speakerInactiveIcon}
                resizeMode={"contain"}
                style={{ height: 24, width: 24 }}
              />
            )}
          </TouchableHighlight>
          {pinnedPhrases.indexOf(selectedPhrase) === -1 ? (
            <TouchableHighlight
              underlayColor={constants.shade1}
              onPress={() => pinPhrase(selectedPhrase)}
              style={styles.buttonContainer}
            >
              <Icon
                size={24}
                color={constants.shade1}
                name={constants.pinIcon}
              />
            </TouchableHighlight>
          ) : (
            <TouchableHighlight
              underlayColor={constants.shade1}
              onPress={() => unPinPhrase(selectedPhrase)}
              style={[styles.buttonContainer, styles.buttonContainerPinned]}
            >
              <Icon size={24} color={"white"} name={constants.pinIcon} />
            </TouchableHighlight>
          )}
        </View>
      ) : (
        <View style={styles.actionsContainer} />
      )}
    </View>
  );
};

PhraseInfo.propTypes = forbidExtraProps({
  selectedPhrase: PropTypes.string.isRequired,
  translatedPhrase: PropTypes.string.isRequired,
  speak: PropTypes.func.isRequired,
  isSpeaking: PropTypes.bool.isRequired,
  isTranslating: PropTypes.bool.isRequired,
  pinPhrase: PropTypes.func.isRequired,
  unPinPhrase: PropTypes.func.isRequired,
  pinnedPhrases: PropTypes.array.isRequired
});

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 54,
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
    textAlign: "center",
    color: constants.shade1
  },
  selectedTranslationWrapper: {
    flex: 1,
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  selectedTranslation: {
    ...constants.font30(constants.primarySemiBold),
    textAlign: "center",
    color: constants.black1
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
  buttonContainerPinned: {
    backgroundColor: constants.shade1,
    borderColor: "white"
  },
  icon: {
    height: 24,
    width: 24
  }
});

export default PhraseInfo;
