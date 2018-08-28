import React from "react";
import { ScrollView } from "react-native";
import PropTypes from "prop-types";
import Phrase from "./Phrase";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const PhrasesSection = ({ phrases, selectPhrase, targetLanguage }) => {
  return (
    <ScrollView>
      {phrases.map((phrase, index) => {
        return (
          <Phrase
            key={index}
            phrase={phrase}
            selectPhrase={selectPhrase}
            targetLanguage={targetLanguage}
            isLast={index === phrases.length - 1}
          />
        );
      })}
    </ScrollView>
  );
};

PhrasesSection.propTypes = forbidExtraProps({
  phrases: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  selectPhrase: PropTypes.func.isRequired,
  targetLanguage: PropTypes.string.isRequired,
  tabLabel: PropTypes.string.isRequired
});

export default PhrasesSection;
