import React from "react";
import { Image } from "react-native";
import FastImage from "react-native-fast-image";

const resizeMode = {
  stretch: FastImage.resizeMode.stretch,
  center: FastImage.resizeMode.center,
  cover: FastImage.resizeMode.cover,
  contain: FastImage.resizeMode.contain
};

const priority = {
  high: FastImage.priority.high,
  low: FastImage.priority.low,
  normal: FastImage.priority.normal
};

const SmartImage = ({
  useFastImage = false,
  priority = priority.normal,
  resizeMode,
  source,
  ...otherProps
}) => {
  const ImageComponent = useFastImage ? FastImage : Image;

  return <ImageComponent />;
};

export default SmartImage;
