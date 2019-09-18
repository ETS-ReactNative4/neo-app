import React from "react";
import { Text, View, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import fonts from "../../../constants/fonts";
import constants from "../../../constants/constants";
import CustomHtmlView from "../../../CommonComponents/CustomHtmlView/CustomHtmlView";

const visaActionSheetText = {
  p: {
    fontFamily: fonts.primaryLight,
    color: constants.shade1,
    fontSize: 14,
    lineHeight: 19
  },
  li: {
    fontFamily: fonts.primaryRegular,
    color: constants.black1,
    fontSize: 16,
    lineHeight: 22
  },
  a: {
    color: constants.firstColor,
    fontFamily: fonts.primarySemiBold,
    textDecorationLine: "underline"
  }
};

/**
 * Sliding Visa Info Sheet component that will appear on the ActionSheet screen
 */
const VisaInfoSheet = ({
  containerStyle = StyleSheet.create({}),
  content,
  title
}) => {
  return (
    <View style={[styles.visaInfoSheetContainer, containerStyle]}>
      <View style={styles.contentContainer}>
        <Text>{title}</Text>
        <CustomHtmlView styleSheet={visaActionSheetText} html={content} />
      </View>
    </View>
  );
};

VisaInfoSheet.propTypes = {
  containerStyle: ViewPropTypes.style
};

const styles = StyleSheet.create({
  visaInfoSheetContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end"
  },
  contentContainer: {}
});

export default VisaInfoSheet;
