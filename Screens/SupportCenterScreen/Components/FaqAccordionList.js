import React from "react";
import { View, Text, StyleSheet, ViewPropTypes } from "react-native";
import FaqAccordionTile from "./FaqAccordionTile";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";

const FaqAccordionList = ({
  containerStyle = StyleSheet.create({}),
  faqSections = [],
  supportCta = "",
  supportAction = () => null
}) => {
  return (
    <View style={containerStyle}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{`Frequently Asked Questions`}</Text>
        {supportCta ? (
          <Text onPress={supportAction} style={styles.supportCtaText}>
            {supportCta}
          </Text>
        ) : null}
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
  containerStyle: ViewPropTypes.style,
  faqSections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  ).isRequired,
  supportCta: PropTypes.string,
  supportAction: PropTypes.func
};

const styles = StyleSheet.create({
  title: {
    ...constants.fontCustom(constants.primarySemiBold, 12),
    color: constants.shade1
  },
  supportCtaText: {
    ...constants.fontCustom(constants.primaryRegular, 14),
    color: constants.firstColor,
    textDecorationLine: "underline"
  },
  titleWrapper: {
    marginHorizontal: 24,
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  tileMargin: {
    marginBottom: 2
  }
});

export default FaqAccordionList;
