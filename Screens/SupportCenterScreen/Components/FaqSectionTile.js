import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import Icon from "../../../CommonComponents/Icon/Icon";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const FaqSectionTile = ({ containerStyle, sectionName, onClick }) => {
  if (!containerStyle) containerStyle = {};
  return (
    <TouchableOpacity style={[styles.faqTileContainer, containerStyle]}>
      <Text style={styles.faqTileText}>{sectionName}</Text>
      <View style={styles.iconContainer}>
        <Icon name={constants.arrowRight} color={constants.shade2} size={16} />
      </View>
    </TouchableOpacity>
  );
};

FaqSectionTile.propTypes = forbidExtraProps({
  containerStyle: PropTypes.object,
  sectionName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
});

const styles = StyleSheet.create({
  faqTileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    borderBottomWidth: 2,
    borderBottomColor: constants.shade4
  },
  faqTileText: {
    ...constants.fontCustom(constants.primaryLight, 17),
    color: constants.black2,
    ...Platform.select({
      ios: {
        marginTop: 8
      }
    })
  }
});

export default FaqSectionTile;
