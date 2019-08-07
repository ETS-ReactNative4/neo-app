import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FaqAccordionTile from "./FaqAccordionTile";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";

const FaqAccordionList = ({ faqSections }) => {
  return (
    <View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{`Frequently Asked Questions`}</Text>
      </View>
      <View>
        {faqSections.map((faq, faqIndex) => {
          return (
            <FaqAccordionTile
              key={faqIndex}
              content={faq.content}
              title={faq.title}
              containerStyle={styles.tileMargin}
            />
          );
        })}
      </View>
    </View>
  );
};

FaqAccordionList.propTypes = {
  faqSections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  ).isRequired
};

const styles = StyleSheet.create({
  title: {
    ...constants.fontCustom(constants.primarySemiBold, 12),
    color: constants.shade1
  },
  titleWrapper: {
    marginHorizontal: 24,
    marginVertical: 16
  },
  tileMargin: {
    marginBottom: 1
  }
});

export default FaqAccordionList;
