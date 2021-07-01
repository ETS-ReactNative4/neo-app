import React, { useEffect, useState, ComponentType } from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  ImageURISource,
  ImageProps,
  StyleProp,
  ImageStyle
} from "react-native";
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

export interface ISmartImageSource {
  uri: string;
  headers?: any;
  priority?:
    | FastImage.priority.normal
    | FastImage.priority.high
    | FastImage.priority.low;
  isFastImageSet?: boolean;
}

export interface SmartImageV2Props extends ImageProps {
  useFastImage?: boolean;
  priority?: "low" | "normal" | "high";
  resizeMode?: "center" | "stretch" | "cover" | "contain";
  headers?: object;
  fallbackSource?: ImageSourcePropType;
  children?: React.ReactNode;
  source: ImageSourcePropType | ISmartImageSource;
  imageStyle?: StyleProp<ImageStyle>;
}

function isImageSourceObject(
  requiredImageSource: ImageSourcePropType | ISmartImageSource
): requiredImageSource is ImageURISource | ISmartImageSource {
  return (
    typeof requiredImageSource === "object" &&
    !Array.isArray(requiredImageSource)
  );
}

function isSmartImageSource(
  requiredImageSource: ImageSourcePropType | ISmartImageSource
): requiredImageSource is ISmartImageSource {
  return (
    typeof requiredImageSource === "object" &&
    !Array.isArray(requiredImageSource)
  );
}

function isResizeModeSet(
  givenResizeMode: "center" | "stretch" | "cover" | "contain" | undefined
): givenResizeMode is "center" | "stretch" | "cover" | "contain" {
  return (
    ["center", "stretch", "cover", "contain"].indexOf(givenResizeMode || "") >
    -1
  );
}

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
  priority = "normal",
  headers = {},
  resizeMode,
  source,
  fallbackSource = { uri: constants.defaultPlaceImage },
  children,
  ...otherProps
}: SmartImageV2Props) => {
  /**
   * TODO: Remove this `isValidImageUrl` condition check once FastImage issue is fixed
   * https://github.com/DylanVann/react-native-fast-image/issues/407
   *
   * Flag to check if the image can be rendered using FastImage since invalid urls
   * will cause crash in Android
   */
  const isValidImageUrl = isImageSourceObject(source)
    ? source.uri &&
      (source.uri.startsWith(constants.httpPrefix) ||
        source.uri.startsWith(constants.httpsPrefix))
    : false;

  /**
   * Set Image component
   */
  const ImageComponent: ComponentType<any> =
    isValidImageUrl && useFastImage
      ? FastImage
      : children
      ? ImageBackground
      : Image;

  /**
   * Set default source as the imageSource hook. This hook will be used
   * for rendering the image and will be modified in case of errors.
   */
  const [imageSource, setImageSource] = useState<
    ImageSourcePropType | ISmartImageSource
  >(source);

  /**
   * Flag to check if the component has already falled back to using the default image
   * Prevents infinite loop if the default fallback image has any issue.
   */
  const [isUsingDefaultImage, setUsingDefaultImage] = useState<boolean>(false);

  /**
   * In case the image source is changed dynamically, we need to compare the actualImageSource
   * with the new image source. This will reset all flags with new image url.
   * Works in the place of `componentWillReceiveProps`
   */
  const [actualImageSource, setActualImageSource] = useState<
    ImageSourcePropType | ISmartImageSource
  >(source);
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
  let fastImageSource: ImageSourcePropType | ISmartImageSource =
    typeof imageSource === "object" ? { ...imageSource } : imageSource;

  if (isSmartImageSource(imageSource)) {
    if (useFastImage && isValidImageUrl && imageSource.isFastImageSet) {
      if (isResizeModeSet(resizeMode)) {
        resizeModeProp = resizeModeMap[resizeMode];
      }
      priorityProp = priorityMap[priority];

      if (typeof imageSource === "object") {
        if (priority) {
          fastImageSource = Object.assign({}, fastImageSource, {
            priority: priorityProp
          });
        }
        if (headers) {
          fastImageSource = Object.assign({}, fastImageSource, {
            headers
          });
        }
        fastImageSource = Object.assign({}, fastImageSource, {
          isFastImageSet: true
        });
        setImageSource(fastImageSource);
      }
    }
  }

  const imageLoadError = () => {
    if (!isUsingDefaultImage) {
      setUsingDefaultImage(true);
      setImageSource(fallbackSource);
    }
  };

  if (isImageSourceObject(source)) {
    if (!isUsingDefaultImage && typeof source === "object" && !source.uri) {
      imageLoadError();
    }
  }

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

export default SmartImageV2;
