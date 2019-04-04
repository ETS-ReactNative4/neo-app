import React from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";

const ContentSection = ({
  title = "",
  text = "",
  quote = "",
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
          <Text style={[styles.subText, textStyle]} numberOfLines={5}>
            {text}
          </Text>
        </View>
      ) : null}
      {quote ? (
        <Text numberOfLines={2} style={styles.textContainer}>
          <Text>{`    `}</Text>
          <Image
            source={constants.quotationMarkImage}
            style={styles.quotationImage}
          />
          <Text style={[styles.quoteText, textStyle]} numberOfLines={2}>
            {`  ${quote}`}
          </Text>
        </Text>
      ) : null}
    </View>
  );
};

ContentSection.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  quote: PropTypes.string,
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
    ...constants.fontCustom(constants.primarySemiBold, 20, 22)
  },
  quotationImage: {
    ...Platform.select({
      ios: {
        height: 20,
        width: 20
      },
      android: {
        height: 20,
        width: 20
      }
    })
  },
  quoteText: {
    ...constants.fontCustom(constants.primaryLight, 17, 22),
    color: constants.shade1,
    fontStyle: "italic"
  },
  subText: {
    ...constants.fontCustom(constants.primaryLight, 15, 18),
    color: constants.shade1
  }
});

export default ContentSection;
