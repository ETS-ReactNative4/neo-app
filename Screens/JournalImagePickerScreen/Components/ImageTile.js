import React from "react";
import { Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const ImageTile = ({
  item,
  selected,
  onPressItem,
  previewImage,
  selectionPosition
}) => {
  if (!item || !item.node || !item.node.image) return null;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (!selected) onPressItem(item.node.image.uri);
        previewImage(item.node.image.uri);
      }}
      style={styles.imageTileContainer}
    >
      <Image
        style={[styles.tileImage, selected ? styles.selected : null]}
        source={{
          uri: item.node.image.uri
        }}
        resizeMode={"cover"}
      />
      {selected ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onPressItem(item.node.image.uri)}
          style={styles.selectionPositionWrapper}
        >
          <Text style={styles.selectionPositionText}>
            {selectionPosition + 1}
          </Text>
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

ImageTile.propTypes = forbidExtraProps({
  item: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  onPressItem: PropTypes.func.isRequired,
  previewImage: PropTypes.func.isRequired,
  selectionPosition: PropTypes.func.isRequired
});

const styles = StyleSheet.create({
  imageTileContainer: {
    height: responsiveWidth(100) / 4,
    width: responsiveWidth(100) / 4,
    borderColor: "white",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tileImage: {
    height: responsiveWidth(100) / 4,
    width: responsiveWidth(100) / 4
  },
  selected: {
    height: responsiveWidth(100) / 4 - 16,
    width: responsiveWidth(100) / 4 - 16
  },
  selectionPositionWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: constants.seventhColor,
    alignItems: "center",
    justifyContent: "center"
  },
  selectionPositionText: {
    ...constants.fontCustom(constants.primaryRegular, 16),
    color: "white"
  }
});

export default ImageTile;
