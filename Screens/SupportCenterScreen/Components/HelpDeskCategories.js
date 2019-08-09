import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text } from "react-native";
import { ViewPropTypes } from "react-native";
import HelpSectionTile from "./HelpSectionTile";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";

const HelpDeskCategories = ({
  categoryTitle,
  categories,
  containerStyle = StyleSheet.create({})
}) => {
  return (
    <View style={[styles.helpDeskCategoriesContainer, containerStyle]}>
      {categoryTitle ? (
        <Text style={styles.categoryTitleText}>{categoryTitle}</Text>
      ) : null}
      <View style={styles.categoryWrapper}>
        {categories.map((category, categoryIndex) => {
          return (
            <HelpSectionTile
              key={categoryIndex}
              {...category}
              containerStyle={styles.helpSectionTileMargin}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryTitleText: {
    ...constants.fontCustom(constants.primaryRegular, 12),
    color: constants.shade1,
    marginBottom: 16
  },
  helpDeskCategoriesContainer: {
    marginHorizontal: 16
  },
  categoryWrapper: {
    borderColor: constants.shade4,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: constants.white1,
    ...constants.elevationFive,
    width: responsiveWidth(100) - 32,
    alignSelf: "center"
  },
  helpSectionTileMargin: {
    marginVertical: 1
  }
});

HelpDeskCategories.propTypes = {
  containerStyle: ViewPropTypes.style,
  categoryTitle: PropTypes.string,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      containerStyle: ViewPropTypes.style,
      icon: PropTypes.string,
      title: PropTypes.string,
      action: PropTypes.func.isRequired
    })
  ).isRequired
};

export default HelpDeskCategories;
