import React from "react";
import { View, StyleSheet, Image } from "react-native";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import PreviewControlButton from "./PreviewControlButtons";

const ImagePreviewCard = ({
  index,
  previewImage = constants.starterBackground,
  imageUri,
  isContain = false,
  toggleImageContain = () => null,
  cropImage = () => null
}) => {
  return (
    <View style={styles.imagePreviewCardContainer}>
      <Image
        style={styles.previewImage}
        source={isContain ? { uri: imageUri } : previewImage}
        resizeMode={isContain ? "contain" : "cover"}
      />
      <PreviewControlButton
        containerStyle={styles.cropButton}
        onClick={() => cropImage(index, imageUri)}
      />
      <PreviewControlButton
        containerStyle={styles.containButton}
        onClick={() => toggleImageContain(index)}
      />
    </View>
  );
};

ImagePreviewCard.propTypes = forbidExtraProps({
  previewImage: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired,
  toggleImageContain: PropTypes.func.isRequired,
  imageUri: PropTypes.string.isRequired,
  cropImage: PropTypes.func.isRequired
});

const styles = StyleSheet.create({
  imagePreviewCardContainer: {
    height: constants.journalImagePicker.selectedImageHeight,
    width:
      responsiveWidth(80) || constants.journalImagePicker.selectedImageWidth,
    borderRadius: 2,
    marginRight: 24
  },
  previewImage: {
    height: constants.journalImagePicker.selectedImageHeight,
    width:
      responsiveWidth(80) || constants.journalImagePicker.selectedImageWidth,
    backgroundColor: constants.shade5,
    borderRadius: 2,
    overflow: "hidden"
  },
  cropButton: {
    position: "absolute",
    bottom: -16,
    right: 24
  },
  containButton: {
    position: "absolute",
    bottom: -16,
    right: 80
  }
});

export default ImagePreviewCard;
