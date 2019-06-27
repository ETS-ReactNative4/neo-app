import React from "react";
import { Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const ImagePreviewThumbnail = ({
  imageStyle = {},
  imageSource,
  action = () => null
}) => {
  return (
    <TouchableOpacity onPress={action}>
      <Image style={imageStyle} source={imageSource} />
    </TouchableOpacity>
  );
};

ImagePreviewThumbnail.propTypes = forbidExtraProps({
  imageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  imageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  action: PropTypes.func
});

export default ImagePreviewThumbnail;
