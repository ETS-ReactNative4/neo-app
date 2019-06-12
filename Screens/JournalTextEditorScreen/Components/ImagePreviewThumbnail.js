import React from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const ImagePreviewThumbnail = ({ imageStyle = {}, imageSource }) => {
  return <Image style={imageStyle} source={imageSource} />;
};

ImagePreviewThumbnail.propTypes = forbidExtraProps({
  imageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  imageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
});

export default ImagePreviewThumbnail;
