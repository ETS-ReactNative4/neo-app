import React from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageBackground
} from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import ImagePositionIndicator from "./ImagePositionIndicator";

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
        onPressItem(item.node.image.uri);
        previewImage(item.node.image.uri);
      }}
      style={styles.imageTileContainer}
    >
      <ImageBackground
        style={[styles.tileImage, selected ? styles.selected : null]}
        source={{
          uri: item.node.image.uri
        }}
        resizeMode={"cover"}
      >
        {selected ? (
          <ImagePositionIndicator
            action={() => onPressItem(item.node.image.uri)}
            containerStyle={styles.selectionPositionWrapper}
            text={selectionPosition + 1}
          />
        ) : null}
      </ImageBackground>
    </TouchableOpacity>
  );
};

ImageTile.propTypes = forbidExtraProps({
  id: PropTypes.string,
  title: PropTypes.number,
  item: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  onPressItem: PropTypes.func.isRequired,
  previewImage: PropTypes.func.isRequired,
  selectionPosition: PropTypes.number.isRequired
});

const listContainerTotalWidth = responsiveWidth(100) - 48; // device width // flatlist margin

const styles = StyleSheet.create({
  imageTileContainer: {
    height: listContainerTotalWidth / 4,
    width: listContainerTotalWidth / 4,
    borderColor: "white",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tileImage: {
    height: listContainerTotalWidth / 4 - 1,
    width: listContainerTotalWidth / 4 - 1
  },
  selected: {
    height: listContainerTotalWidth / 4 - 16,
    width: listContainerTotalWidth / 4 - 16
  },
  selectionPositionWrapper: {
    position: "absolute",
    top: 2,
    right: 2
  }
});

export default ImageTile;
