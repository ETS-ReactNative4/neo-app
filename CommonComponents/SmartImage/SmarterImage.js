import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";
import FastImage from "react-native-fast-image";
import constants from "../../constants/constants";

const resizeModeMap = {
  stretch: FastImage.resizeMode.stretch,
  center: FastImage.resizeMode.center,
  cover: FastImage.resizeMode.cover,
  contain: FastImage.resizeMode.contain
};

const priorityMap = {
  high: FastImage.priority.high,
  low: FastImage.priority.low,
  normal: FastImage.priority.normal
};

const SmartImage = ({
  useFastImage = false,
  priority = priorityMap.normal,
  headers = {},
  resizeMode,
  source,
  fallbackSource = { uri: constants.defaultPlaceImage },
  ...otherProps
}) => {
  const ImageComponent = useFastImage ? FastImage : Image;
  const [imageSource, setImageSource] = useState(source);
  const [isUsingDefaultImage, setUsingDefaultImage] = useState(false);

  const [actualImageSource, setActualImageSource] = useState(source);
  useEffect(() => {
    if (actualImageSource !== source) {
      setImageSource(source);
      setActualImageSource(source);
      setUsingDefaultImage(false);
    }
  }, [actualImageSource, source]);

  let resizeModeProp = resizeMode;
  let priorityProp = null;
  if (useFastImage) {
    resizeModeProp = resizeModeMap[resizeMode];
    priorityProp = priorityMap[priority];

    if (typeof source === "object") {
      if (priority) {
        source.priority = priorityProp;
      }
      if (headers) {
        source.headers = headers;
      }
    }
  }

  const imageLoadError = () => {
    if (!isUsingDefaultImage) {
      setUsingDefaultImage(true);
      setImageSource(fallbackSource);
    }
  };

  return (
    <ImageComponent
      {...otherProps}
      source={imageSource}
      onError={imageLoadError}
      resizeMode={resizeModeProp}
    />
  );
};

SmartImage.propTypes = {
  useFastImage: PropTypes.bool,
  priority: PropTypes.oneOf(["low", "normal", "high"]),
  resizeMode: PropTypes.oneOf(["center", "stretch", "cover", "contain"]),
  source: PropTypes.oneOfType([
    Image.propTypes.source.isRequired,
    PropTypes.shape({
      uri: PropTypes.string,
      headers: PropTypes.object,
      priority: PropTypes.oneOf([
        FastImage.priority.normal,
        FastImage.priority.high,
        FastImage.priority.low
      ])
    })
  ]),
  headers: PropTypes.object,
  fallbackSource: Image.propTypes.source.isRequired
};

export default SmartImage;
