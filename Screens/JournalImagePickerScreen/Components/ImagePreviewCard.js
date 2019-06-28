import React, { Fragment } from "react";
import { View, StyleSheet, Image } from "react-native";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import PreviewControlButton from "./PreviewControlButtons";
import ImagePositionIndicator from "./ImagePositionIndicator";
import FastImage from "react-native-fast-image";

const ImagePreviewCard = ({
  index,
  actionIndex,
  previewImage = constants.starterBackground,
  imageUri,
  isContain = false,
  toggleImageContain = () => null,
  cropImage = () => null,
  removeImage = () => null,
  isPreselected = false
}) => {
  let ImageWrapper, imageProps;
  if (
    previewImage.uri &&
    (previewImage.uri.startsWith(constants.httpPrefix) ||
      previewImage.uri.startsWith(constants.httpsPrefix))
  ) {
    ImageWrapper = FastImage;
    imageProps = {
      resizeMode: isContain
        ? FastImage.resizeMode.contain
        : FastImage.resizeMode.cover
    };
  } else {
    ImageWrapper = Image;
    imageProps = {
      resizeMode: isContain ? "contain" : "cover"
    };
  }
  return (
    <View style={styles.imagePreviewCardContainer}>
      <ImageWrapper
        style={styles.previewImage}
        source={isContain ? { uri: imageUri } : previewImage}
        {...imageProps}
      />
      {!isPreselected ? (
        <Fragment>
          <PreviewControlButton
            icon={constants.cropIcon}
            containerStyle={styles.cropButton}
            onClick={() => cropImage(actionIndex, imageUri)}
            isSelected={!isContain && imageUri !== previewImage.uri}
          />
          <PreviewControlButton
            icon={constants.containIcon}
            containerStyle={styles.containButton}
            onClick={() => toggleImageContain(actionIndex)}
            isSelected={isContain}
          />
          <ImagePositionIndicator
            action={() => null}
            containerStyle={styles.selectionPositionWrapper}
            text={index + 1}
          />
        </Fragment>
      ) : (
        <Fragment>
          <PreviewControlButton
            icon={constants.trashCanIcon}
            containerStyle={styles.removeButton}
            onClick={() => removeImage(index)}
            isSelected={false}
          />
        </Fragment>
      )}
    </View>
  );
};

ImagePreviewCard.propTypes = forbidExtraProps({
  index: PropTypes.number.isRequired,
  actionIndex: PropTypes.number.isRequired,
  previewImage: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired,
  toggleImageContain: PropTypes.func,
  imageUri: PropTypes.string.isRequired,
  cropImage: PropTypes.func,
  isPreselected: PropTypes.bool
});

const styles = StyleSheet.create({
  imagePreviewCardContainer: {
    height: constants.journalImagePicker.selectedImageHeight,
    width: Math.min(
      constants.journalImagePicker.selectedImageWidth,
      responsiveWidth(80)
    ),
    borderRadius: 2,
    marginRight: 8
  },
  previewImage: {
    height: constants.journalImagePicker.selectedImageHeight,
    width: Math.min(
      constants.journalImagePicker.selectedImageWidth,
      responsiveWidth(80)
    ),
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
  },
  removeButton: {
    position: "absolute",
    bottom: -16,
    right: 24
  },
  selectionPositionWrapper: {
    position: "absolute",
    top: 2,
    left: 2
  }
});

export default ImagePreviewCard;
