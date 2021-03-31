import React, {Fragment} from 'react';
import Animated from 'react-native-reanimated';

import {StyleSheet, StyleProp, ImageStyle, Image} from 'react-native';

import {
  responsiveWidth,
  // @ts-ignore
} from 'react-native-responsive-dimensions';
import {IIntroData} from '../IntroScreen';

const {Extrapolate, interpolate, createAnimatedComponent} = Animated;

const AnimatedImage = createAnimatedComponent(Image);

interface IntroCoverImageProps {
  containerStyle?: StyleProp<ImageStyle>;
  scrollX?: Animated.Value<number>;
  appIntroData: IIntroData[];
}

const IntroCoverImage = ({
  containerStyle,
  appIntroData = [],
  scrollX,
}: IntroCoverImageProps) => {
  return (
    <Fragment>
      {appIntroData.map((appIntroObj, index) => {
        let opacity: number | Animated.Node<number> = 1,
          transform: number | Animated.Node<number> = 1;

        if (scrollX) {
          opacity = interpolate(scrollX, {
            inputRange: [
              responsiveWidth(100) * (index - 1),
              responsiveWidth(100) * index,
              responsiveWidth(100) * (index + 1),
            ],
            outputRange: [0, 1, 0],
            extrapolate: Extrapolate.CLAMP,
          });
          transform = interpolate(scrollX, {
            inputRange: [
              responsiveWidth(100) * (index - 1),
              responsiveWidth(100) * index,
              responsiveWidth(100) * (index + 1),
            ],
            outputRange: [0.8, 1, 0.8],
            extrapolate: Extrapolate.CLAMP,
          });
        }
        const imageFadeStyle = {opacity, transform: [{scale: transform}]};
        const image =
          typeof appIntroObj.image === 'string' &&
          appIntroObj.image.includes('http')
            ? {uri: appIntroObj.image}
            : appIntroObj.image;
        return (
          <AnimatedImage
            key={index}
            source={image}
            style={[styles.coverImageStyle, containerStyle, imageFadeStyle]}
          />
        );
      })}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  coverImageStyle: {
    resizeMode: 'cover',
  },
});

export default IntroCoverImage;
