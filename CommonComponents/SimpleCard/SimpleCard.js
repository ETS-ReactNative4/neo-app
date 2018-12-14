import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import FastImage from "react-native-fast-image";
import constants from "../../constants/constants";
import SmartImage from "../SmartImage/SmartImage";

/**
 * TODO: Fix Image urls
 * @param title
 * @param image
 * @param action
 * @returns {*}
 * @constructor
 */
const Card = ({
  title,
  image,
  action,
  containerStyle = {},
  imageStyle = {},
  textStyle = {}
}) => {
  if (containerStyle.width) {
    imageStyle.width = containerStyle.width;
  }
  if (containerStyle.height && imageStyle.height) {
    imageStyle.height =
      imageStyle.height > containerStyle.height * 0.75
        ? containerStyle.height * 0.75
        : imageStyle.height;
  }
  let textWrapper = {};
  if (textStyle.backgroundColor) {
    textWrapper.backgroundColor = textStyle.backgroundColor;
  }
  return (
    <TouchableOpacity
      onPress={action}
      style={[styles.cardContainer, containerStyle]}
    >
      <SmartImage
        defaultImageUri={
          "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg"
        }
        style={[styles.image, imageStyle]}
        uri={image.uri}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={[styles.textContainer, textWrapper]}>
        <Text style={[styles.titleText, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    height: 132,
    width: 152,
    borderRadius: 5,
    marginRight: 8,
    ...constants.elevationTwo
  },
  image: {
    width: 152,
    height: 96,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  textContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-start",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5
  },
  titleText: {
    ...constants.fontCustom(constants.primarySemiBold, 13),
    marginLeft: 8,
    color: constants.black2
  }
});

Card.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  textStyle: PropTypes.object
};

export default Card;
