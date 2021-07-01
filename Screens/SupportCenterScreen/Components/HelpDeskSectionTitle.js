import React from "react";
import { View, Text, StyleSheet, ViewPropTypes } from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import InfoPill from "../../../CommonComponents/InfoPill/InfoPill";

const HelpDeskSectionTitle = ({
  containerStyle = StyleSheet.create({}),
  title = "",
  info = "",
  infoColor = constants.black1,
  infoBackgroundColor = constants.shade1
}) => {
  return (
    <View style={[styles.helpDeskSectionTitleContainer, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      {info ? (
        <InfoPill
          info={info}
          infoBackgroundColor={infoBackgroundColor}
          infoColor={infoColor}
        />
      ) : (
        <View />
      )}
    </View>
  );
};

HelpDeskSectionTitle.propTypes = {
  containerStyle: ViewPropTypes.style,
  title: PropTypes.string,
  info: PropTypes.string,
  infoColor: PropTypes.string,
  infoBackgroundColor: PropTypes.string
};

const styles = StyleSheet.create({
  helpDeskSectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    ...constants.fontCustom(constants.primarySemiBold, 12),
    color: constants.shade1
  }
});

export default HelpDeskSectionTitle;
