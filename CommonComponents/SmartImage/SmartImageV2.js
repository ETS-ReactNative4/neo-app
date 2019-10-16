import React, { useEffect, useState } from "react";
import { Image, ImageBackground } from "react-native";
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

/**
 * TODO: Priority once set cannot be changed dynamically since it is attached to the
 * image source object. However, changing priority is useless after image has loaded
 * and changing the image will also change to latest priority so it is ignored.
 */

/**
 * A super-smart image component capable of falling back to default image
 * if the provided image url fails to load. Also supports fast image option
 * with priority, resize mode and headers...
 */
const SmartImageV2 = ({
  useFastImage = false,
  priority = priorityMap.normal,
  headers = {},
  resizeMode,
  source,
  fallbackSource = { uri: constants.defaultPlaceImage },
  children,
  ...otherProps
}) => {
  /**
   * Set Image component
   */
  const ImageComponent = useFastImage
    ? FastImage
    : children
    ? ImageBackground
    : Image;

  /**
   * Set default source as the imageSource hook. This hook will be used
   * for rendering the image and will be modified in case of errors.
   */
  const [imageSource, setImageSource] = useState(source);

  /**
   * Flag to check if the component has already falled back to using the default image
   * Prevents infinite loop if the default fallback image has any issue.
   */
  const [isUsingDefaultImage, setUsingDefaultImage] = useState(false);

  /**
   * In case the image source is changed dynamically, we need to compare the actualImageSource
   * with the new image source. This will reset all flags with new image url.
   * Works in the place of `componentWillReceiveProps`
   */
  const [actualImageSource, setActualImageSource] = useState(source);
  useEffect(() => {
    if (actualImageSource !== source) {
      setImageSource(source);
      setActualImageSource(source);
      setUsingDefaultImage(false);
    }
  }, [actualImageSource, source]);

  /**
   * Modify the image props to support fast image.This will update the `imageSource`
   * hook to new fast image source with priority.
   *
   * Also, a `isFastImageSet` flag is needed to prevent infinite loop rendering similar to `isUsingDefaultImage` hook
   */
  let resizeModeProp = resizeMode;
  let priorityProp = null;
  let fastImageSource = { ...imageSource };
  if (useFastImage && imageSource.isFastImageSet) {
    resizeModeProp = resizeModeMap[resizeMode];
    priorityProp = priorityMap[priority];

    if (typeof imageSource === "object") {
      if (priority) {
        fastImageSource = {
          ...fastImageSource,
          priority: priorityProp
        };
      }
      if (headers) {
        fastImageSource = {
          ...fastImageSource,
          headers
        };
      }
      fastImageSource = {
        ...fastImageSource,
        isFastImageSet: true
      };
      setImageSource(fastImageSource);
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
      children={children}
      source={imageSource}
      onError={imageLoadError}
      resizeMode={resizeModeProp}
    />
  );
};

SmartImageV2.propTypes = {
  ...Image.propTypes,
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
  fallbackSource: Image.propTypes.source.isRequired,
  children: PropTypes.element
};

export default SmartImageV2;
