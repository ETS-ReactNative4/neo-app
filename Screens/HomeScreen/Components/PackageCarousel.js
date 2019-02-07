import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Carousel from "../../../CommonComponents/Carousel/Carousel";
import PackageCard from "./PackageCard";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const PackageCarousel = ({ title, packages, index: rowIndex }) => {
  return (
    <View style={styles.packageCarouselContainer}>
      <Text style={styles.packageCarouselTitle}>{title}</Text>
      <Carousel firstMargin={24} containerStyle={{ marginTop: 16 }}>
        {packages.map((packageData, packageIndex) => {
          return (
            <PackageCard
              key={packageIndex}
              {...packageData}
              rowIndex={rowIndex}
              index={packageIndex}
            />
          );
        })}
      </Carousel>
    </View>
  );
};

PackageCarousel.propTypes = forbidExtraProps({
  title: PropTypes.string.isRequired,
  packages: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
        .isRequired,
      triangle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
        .isRequired,
      price: PropTypes.number.isRequired,
      region: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  ).isRequired,
  index: PropTypes.number
});

const styles = StyleSheet.create({
  packageCarouselContainer: {
    marginVertical: 16
  },
  packageCarouselTitle: {
    marginLeft: 24,
    ...constants.fontCustom(constants.primarySemiBold, 16, 24),
    color: constants.black1
  }
});

export default PackageCarousel;
