import React from "react";
import { View, Text, StyleSheet } from "react-native";
import constants from "../../../../../constants/constants";
import { PropTypes } from "prop-types";

const ContentSection = ({
  title,
  text,
  containerStyle = {},
  titleStyle = {},
  textStyle = {}
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {title ? (
        <View>
          <Text style={[styles.titleText, titleStyle]}>{title}</Text>
        </View>
      ) : null}
      {text ? (
        <View style={styles.textContainer}>
          <Text style={[styles.subText, textStyle]} numberOfLines={3}>
            {text}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

ContentSection.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8
  },
  textContainer: {
    marginTop: 8
  },
  titleText: {
    color: constants.black1,
    ...constants.fontCustom(constants.primaryRegular, 20),
    fontWeight: "600"
  },
  subText: {
    ...constants.fontCustom(constants.primaryRegular, 15),
    color: constants.shade1,
    fontWeight: "300"
  }
});

export default ContentSection;
