import React from "react";
import { ScrollView } from "react-native";
import PropTypes from "prop-types";
import Phrase from "./Phrase";

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

PhrasesSection.propTypes = {
  phrases: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  selectPhrase: PropTypes.func.isRequired
};

export default PhrasesSection;
