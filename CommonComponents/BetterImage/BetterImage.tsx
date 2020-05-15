import React, { useRef, useCallback, useState, ReactNode } from "react";
import {
  View,
  Image,
  ImageBackground,
  Animated,
  StyleSheet,
  ImageProps,
  ViewStyle,
  StyleProp,
  ImageSourcePropType,
  NativeSyntheticEvent,
  ImageErrorEventData
} from "react-native";
import { useDeepCompareEffectNoCheck } from "use-deep-compare-effect";
import { CONSTANT_defaultPlaceImage } from "../../constants/imageAssets";

export interface BetterImageProps extends ImageProps {
  containerStyle?: StyleProp<ViewStyle>;
  thumbnailFadeDuration?: number;
  imageFadeDuration?: number;
  thumbnailSource?: ImageSourcePropType;
  thumbnailBlurRadius?: number;
  fallbackSource?: ImageSourcePropType;
  children?: ReactNode;
}

const { Value, createAnimatedComponent, timing } = Animated;

const AnimatedImage = createAnimatedComponent(Image);
const AnimatedImageBackground = createAnimatedComponent(ImageBackground);

const BetterImage = ({
  containerStyle,
  thumbnailFadeDuration = 250,
  imageFadeDuration = 250,
  thumbnailSource,
  source,
  onLoadEnd,
  resizeMethod,
  resizeMode,
  thumbnailBlurRadius = 1,
  style,
  fallbackSource = { uri: CONSTANT_defaultPlaceImage },
  onError,
  children,
  ...otherProps
}: BetterImageProps) => {
  const imageOpacity = useRef(new Value(0)).current;
  const thumbnailOpacity = useRef(new Value(0)).current;
  const [hasError, setHasError] = useState(false);

  const onImageLoad = () => {
    timing(imageOpacity, {
      toValue: 1,
      duration: imageFadeDuration
    }).start();

    onLoadEnd && onLoadEnd();
  };

  const onThumbnailLoad = () => {
    timing(thumbnailOpacity, {
      toValue: 1,
      duration: thumbnailFadeDuration
    }).start();
  };

  const onImageLoadError = (
    event: NativeSyntheticEvent<ImageErrorEventData>
  ) => {
    setHasError(true);
    onError && onError(event);
  };

  useDeepCompareEffectNoCheck(
    useCallback(() => {
      imageOpacity.setValue(0);
      thumbnailOpacity.setValue(0);
      setHasError(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
    [source, thumbnailSource]
  );

  const ImageComponent = children ? AnimatedImageBackground : AnimatedImage;

  return (
    <View style={[styles.imageContainerStyle, containerStyle]}>
      {thumbnailSource ? (
        <AnimatedImage
          onLoadEnd={onThumbnailLoad}
          style={[styles.thumbnailImageStyle, { opacity: thumbnailOpacity }]}
          source={thumbnailSource}
          blurRadius={thumbnailBlurRadius}
          resizeMethod={resizeMethod}
          resizeMode={resizeMode}
        />
      ) : null}
      <ImageComponent
        children={children}
        resizeMethod={resizeMethod}
        resizeMode={resizeMode}
        onLoadEnd={onImageLoad}
        onError={hasError ? () => null : onImageLoadError}
        source={hasError ? fallbackSource : source}
        style={[styles.imageStyle, { opacity: imageOpacity }, style]}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainerStyle: {
    overflow: "hidden"
  },
  thumbnailImageStyle: {
    ...StyleSheet.absoluteFillObject
  },
  imageStyle: {
    ...StyleSheet.absoluteFillObject
  }
});

export default BetterImage;
