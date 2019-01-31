import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import constants from "../../../constants/constants";
import getLocaleString from "../../../Services/getLocaleString/getLocaleString";

const PackageCard = ({ title, image, price, region }) => {
  return (
    <TouchableOpacity style={styles.packagesCardContainer}>
      <View style={styles.packageImageWrapper}>
        <Image
          source={image}
          style={styles.packageImage}
          resizeMode={"cover"}
        />
      </View>
      <View style={styles.textViewWrapper}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.priceWrapper}>
        <Text style={styles.priceText}>
          {getLocaleString(price)}
          <Text style={styles.priceRateText}>{"/person"}</Text>
        </Text>
      </View>
      <View style={styles.regionNameContainer}>
        <View style={styles.regionNameWrapper}>
          <Text style={styles.regionName}>{region}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  packagesCardContainer: {
    width: 224
  },
  packageImageWrapper: {
    overflow: "hidden",
    borderRadius: 5
  },
  packageImage: {
    borderRadius: 5,
    width: 224,
    height: 144
  },
  textViewWrapper: {
    marginTop: 8
  },
  titleText: {
    ...constants.fontCustom(constants.primaryLight, 13, 16),
    color: constants.black1
  },
  priceWrapper: {
    marginTop: 8
  },
  priceText: {
    ...constants.fontCustom(constants.primarySemiBold, 15, 20),
    color: constants.firstColor
  },
  priceRateText: {
    fontFamily: constants.primaryLight
  },
  regionNameContainer: {
    position: "absolute",
    top: 0,
    left: 0
  },
  regionNameWrapper: {
    height: 24,
    borderTopLeftRadius: 5,
    backgroundColor: constants.firstColor,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8
  },
  regionName: {
    ...constants.fontCustom(constants.primarySemiBold, 13),
    color: "white"
  }
});

export default PackageCard;
