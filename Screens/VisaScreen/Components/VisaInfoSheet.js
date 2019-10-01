import React from "react";
import { Text, View, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import fonts from "../../../constants/fonts";
import constants from "../../../constants/constants";
import CustomHtmlView from "../../../CommonComponents/CustomHtmlView/CustomHtmlView";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import { responsiveWidth } from "react-native-responsive-dimensions";

const visaActionSheetText = {
  ...constants.htmlStyleSheet,
  p: {
    fontFamily: fonts.primaryLight,
    color: constants.black1,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16
  },
  li: {
    fontFamily: fonts.primaryRegular,
    color: constants.black1,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 21
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
  title,
  action = () => null
}) => {
  return (
    <View style={[styles.visaInfoSheetContainer, containerStyle]}>
      <Text style={styles.titleText}>{title}</Text>
      <CustomHtmlView styleSheet={visaActionSheetText} html={content} />
      <SimpleButton
        text={"Close"}
        action={action}
        textColor={"white"}
        containerStyle={{ marginTop: 8, width: responsiveWidth(100) - 48 }}
      />
    </View>
  );
};

VisaInfoSheet.propTypes = {
  containerStyle: ViewPropTypes.style,
  content: PropTypes.string,
  title: PropTypes.string,
  action: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  visaInfoSheetContainer: {
    backgroundColor: "white",
    justifyContent: "flex-end",
    padding: 24,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  titleText: {
    ...constants.fontCustom(constants.primarySemiBold, 18),
    color: constants.black1,
    marginBottom: 16
  }
});

export default VisaInfoSheet;
