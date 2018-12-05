import React from "react";
import { View, Text, StyleSheet } from "react-native";
import constants from "../../../../constants/constants";
import { PropTypes } from "prop-types";

const ItineraryHeader = props => {
  const {
    title,
    text,
    containerStyle = {},
    titleStyle = {},
    textStyle = {}
  } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      {title ? (
        <View style={styles.childContainer}>
          <Text style={[styles.titleText, titleStyle]}>{title}</Text>
        </View>
      ) : null}
      {text ? (
        <View style={styles.childContainer}>
          <Text style={[styles.subText, textStyle]} numberOfLines={3}>
            {text}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

ItineraryHeader.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

const styles = StyleSheet.create({
  container: {},
  childContainer: {
    marginVertical: 8
  },
  titleText: {
    color: constants.black1,
    ...constants.fontCustom(constants.primaryRegular, 24),
    fontWeight: "600"
  },
  subText: {
    ...constants.fontCustom(constants.primaryPrimary, 17),
    fontWeight: "300"
  }
});

export default ItineraryHeader;
