import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import constants from "../../constants/constants";

/**
 * TODO: Fix Image urls
 */
const SimpleCard = ({
  title,
  image,
  action,
  containerStyle = {},
  imageStyle = {},
  textStyle = {},
  backdropColor = constants.black1
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
  textWrapper.backgroundColor = backdropColor;
  return (
    <TouchableOpacity
      onPress={action}
      style={[styles.cardContainer, containerStyle]}
    >
      <View style={styles.imageContainer}>
        <Image
          style={[styles.image, imageStyle]}
          source={image}
          resizeMode={"cover"}
        />
      </View>
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
  imageContainer: {
    overflow: "hidden",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  image: {
    width: 152,
    height: 96,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  textContainer: {
    flex: 1,
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

SimpleCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  textStyle: PropTypes.object,
  backdropColor: PropTypes.string
};

export default SimpleCard;
