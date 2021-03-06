import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  Platform
} from "react-native";
import constants from "../../../constants/constants";
import getLocaleString from "../../../Services/getLocaleString/getLocaleString";
import openCustomTab from "../../../Services/openCustomTab/openCustomTab";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import { recordEvent } from "../../../Services/analytics/analyticsService";
import SmartImageV2 from "../../../CommonComponents/SmartImage/SmartImageV2";

const PackageCard = ({
  title,
  image,
  triangle,
  price,
  region,
  slug,
  color,
  rowIndex,
  index: colIndex
}) => {
  return (
    <TouchableOpacity
      style={styles.packagesCardContainer}
      onPress={() => {
        recordEvent(constants.Home.event, {
          click: constants.Home.click.packageCard
        });
        openCustomTab(
          `${constants.productUrl}${slug}${constants.leadSourceMappingQueryParams}`
        );
      }}
      activeOpacity={0.8}
    >
      <View style={styles.packageImageWrapper}>
        {/**
         * First four visible images to the user must be loaded with high priority
         */}
        <SmartImageV2
          priority={rowIndex < 2 && colIndex < 2 ? "high" : "low"}
          style={styles.packageImage}
          resizeMode={"cover"}
          useFastImage={false} // TODO: Temporarily disabled fast image due to load failures of many images
          source={image}
        />
      </View>
      <View style={styles.textViewWrapper}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.priceWrapper}>
        <Text style={styles.priceText}>
          {getLocaleString(price).slice(0, -3)}
          <Text style={styles.priceRateText}>{"/person"}</Text>
        </Text>
      </View>
      <View style={styles.regionNameContainer}>
        <View style={[styles.regionNameWrapper, { backgroundColor: color }]}>
          <Text style={styles.regionName}>{region}</Text>
        </View>
        <Image
          source={triangle}
          resizeMode={"contain"}
          style={styles.regionNameTriangle}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  packagesCardContainer: {
    width: 224,
    marginRight: 16,
    alignSelf: "flex-start"
  },
  packageImageWrapper: {
    overflow: "hidden",
    borderRadius: 5,
    backgroundColor: constants.shade5
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
    left: 0,
    flexDirection: "row"
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
  },
  regionNameTriangle: {
    height: 24,
    width: 9.5,
    ...Platform.select({
      ios: {
        marginLeft: -1
      }
    })
  }
});

PackageCard.propTypes = forbidExtraProps({
  title: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  triangle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired,
  price: PropTypes.number.isRequired,
  region: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  rowIndex: PropTypes.number,
  index: PropTypes.number
});

export default PackageCard;
