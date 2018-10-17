import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import SmartImage from "../../../CommonComponents/SmartImage/SmartImage";
import FastImage from "react-native-fast-image";
import constants from "../../../constants/constants";

const PlaceCard = ({ title, image, action }) => {
  return (
    <TouchableOpacity onPress={action} style={styles.placeCardContainer}>
      <SmartImage
        defaultImageUri={
          "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg"
        }
        style={styles.image}
        uri={
          "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg" ||
          image.uri
        }
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeCardContainer: {
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

PlaceCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired
};

export default PlaceCard;
