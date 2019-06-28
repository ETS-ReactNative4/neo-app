import React from "react";
import { Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import FastImage from "react-native-fast-image";
import constants from "../../../constants/constants";

const ImagePreviewThumbnail = ({
  imageStyle = {},
  imageSource,
  action = () => null
}) => {
  let ImageWrapper;
  if (
    imageSource.uri &&
    (imageSource.uri.startsWith(constants.httpPrefix) ||
      imageSource.uri.startsWith(constants.httpsPrefix))
  ) {
    ImageWrapper = FastImage;
  } else {
    ImageWrapper = Image;
  }
  return (
    <TouchableOpacity onPress={action}>
      <ImageWrapper style={imageStyle} source={imageSource} />
    </TouchableOpacity>
  );
};

ImagePreviewThumbnail.propTypes = forbidExtraProps({
  imageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  imageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  action: PropTypes.func
});

export default ImagePreviewThumbnail;
