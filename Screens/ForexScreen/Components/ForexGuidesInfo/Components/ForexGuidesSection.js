import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ForexFeaturesList from "../../ForexFeaturesList/ForexFeaturesList";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";

const ForexGuidesSection = ({ title = "", data = [] }) => {
  const displayList = data.reduce((textArray, item) => {
    textArray.push(item.pointContent);
    return textArray;
  }, []);
  const arrayLength = displayList.length;
  const firstList = displayList.slice(0, arrayLength - 2);
  const secondList = displayList.slice(arrayLength - 2);
  return (
    <View>
      <Text style={styles.forexGuidesTitle}>{title}</Text>
      <ForexFeaturesList
        lineWidth={responsiveWidth(100) - 48}
        containerStyle={styles.forexData}
        features={firstList}
        hideIcon={true}
      />
      <ForexFeaturesList
        lineWidth={responsiveWidth(100) - 48 - 8} // additional 8px padding added by the highlight
        containerStyle={styles.forexData}
        features={secondList}
        highlight={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  forexGuidesTitle: {
    ...constants.font20(constants.primarySemiBold),
    color: constants.black1
  },
  forexData: {
    marginHorizontal: 0,
    marginVertical: 16
  }
});

ForexGuidesSection.propTypes = forbidExtraProps({
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
});

export default ForexGuidesSection;
