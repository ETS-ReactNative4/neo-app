import React from "react";
import { View, StyleSheet, Text, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";

const VisaRejectedActionBar = ({
  containerStyle = StyleSheet.create({}),
  title = constants.visaScreenText.visaRejected,
  action = () => null
}) => {
  return (
    <View style={[styles.visaRejectedActionBarContainer, containerStyle]}>
      <Text style={styles.titleText}>{title}</Text>
      <SimpleButton
        text={"Call us"}
        textColor={"white"}
        containerStyle={{ width: 86 }}
        underlayColor={constants.firstColorAlpha(0.8)}
      />
    </View>
  );
};

VisaRejectedActionBar.propTypes = {
  containerStyle: ViewPropTypes.style,
  title: PropTypes.string,
  action: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  visaRejectedActionBarContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "white"
  },
  titleText: {
    ...constants.fontCustom(constants.primaryRegular, 15, 19),
    paddingBottom: 16,
    textAlign: "center"
  }
});

export default VisaRejectedActionBar;
