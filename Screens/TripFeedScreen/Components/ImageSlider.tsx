import React, {
  useState,
  useEffect,
  FunctionComponent,
  useRef,
  useCallback,
  //   ComponentType,
  //   MutableRefObject,
} from 'react';
import {Image, ImageProps} from '@pyt/micros';
import {isServer} from '@pyt/utils';

import {
  Dimensions,
  Platform,
  TouchableOpacity,
  TouchableOpacityProps,
  UIManager,
  ViewProps,
  Animated,
  StyleSheet,
  //   ScrollViewProps,
  FlatListProps as ReactNativeFlatListProps,
  FlatList,
} from 'react-native';
import {Text, Box} from '@pyt/micros';
import {ChevronRight, ChevronLeft} from '@pyt/icons';
import {StyleEngineProps, styled} from '@pyt/core/native';

interface CustomImageProps
  extends Omit<ImageProps, 'source'>,
    Omit<TouchableOpacityProps, 'style'> {
  image: string;
}
export interface MiniImageSliderProps extends Omit<ImageProps, 'source'> {
  images: Array<string | CustomImageProps>;
  active?: number;
  onChange?: (active: number) => void;
  autoplay?: boolean;
  autoplayDuration?: number;
  max?: number;
  showImageCount?: boolean;
  imageCountProps?: {};
  showArrow?: boolean;
  separatorWidth?: number;
}

const Wrapper = styled<
  StyleEngineProps &
    ViewProps & {
      onMouseEnter: () => void;
      onMouseLeave: () => void;
    }
>('View', {
  overflow: 'hidden',
  borderRadius: 4,
});

export interface FlatListProps<T = any> extends ReactNativeFlatListProps<T> {}

// const StyledFlatList = styled<
//   FlatListProps & {ref: MutableRefObject<FlatList<any> | undefined>}
// >('FlatList');

// const AnimatedView = styled<
//   Animated.AnimatedProps<Omit<ViewProps, keyof StyleEngineProps>> &
//     StyleEngineProps
// >(Animated.View as ComponentType<any>);

// const AnimatedScrollView = styled<
//   Animated.AnimatedProps<Omit<ScrollViewProps, keyof StyleEngineProps>> &
//     StyleEngineProps & {disableVirtualization?: boolean}
// >(Animated.ScrollView as ComponentType<any>);

const styles = StyleSheet.create({
  dotStyle: {
    position: 'relative',
    width: 5,
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.66)',
    borderRadius: 10,
    marginHorizontal: 3,
  },
  activeDotStyle: {
    width: 15,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  navigation: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
});

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 50,
};

export const MiniImageSlider: FunctionComponent<MiniImageSliderProps> = ({
  images = [],
  active: propActive = 0,
  onChange,
  autoplay,
  autoplayDuration = 5000,
  children,
  max = 10,
  imageProps,
  width,
  separatorWidth = 0,
  height,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  showImageCount,
  imageCountProps = {},
  showArrow,
  ...restProps
}) => {
  const [active, setActive] = useState(propActive);
  const [mouseIn, setMouseOut] = useState(false);
  const [compWidth, setCompWidth] = useState({
    width: isServer()
      ? 100
      : typeof width === 'number'
      ? width
      : Dimensions.get('window').width,
    height: isServer()
      ? 100
      : typeof height === 'number'
      ? height
      : Dimensions.get('window').height,
  });
  const sliderRef = useRef<FlatList<any | null>>();

  const changeSliderListIndex = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollToIndex({
        index: index,
        animated: true,
      });
      setActive(index);
    }
  };

  useEffect(() => {
    onChange && onChange(active);
    let timeOut: ReturnType<typeof setTimeout>;
    if (autoplay && !isServer() && sliderRef?.current) {
      timeOut = setTimeout(() => {
        if (active > images.length - 2) {
          changeSliderListIndex(0);
        } else {
          changeSliderListIndex(active + 1);
        }
      }, autoplayDuration);
    }
    return () => {
      if (autoplay) {
        clearTimeout(timeOut);
      }
    };
  }, [active]);

  const totalItemWidth = compWidth.width + separatorWidth;

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0 && !autoplay) {
      let currentIndex = viewableItems[0].index;
      setActive(currentIndex);
      if (onChange) {
        onChange(currentIndex);
      }
    }
  }, []);
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});
  console.log('compmWidth', compWidth, height, totalItemWidth);
  return (
    <Wrapper
      onMouseEnter={() => {
        showArrow && setMouseOut(true);
      }}
      onMouseLeave={() => {
        showArrow && setMouseOut(false);
      }}
      {...restProps}
      {...{
        width,
        height,
        borderRadius,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
      }}
      onLayout={event => {
        const {width, height} = event.nativeEvent.layout;
        setCompWidth({width, height});
      }}>
      {/* <Image
			source={{ image:'https://pyt-images.imgix.net/images/deals/Festival+Sale/herodesktop/festLife-2-min.png?w=566&h=438&dpr=2&auto=format,compress&q=20' }}
			width={'100%'}
			height={100}
			display={'flex'}
			flexDirection={'column'}
			justifyContent={'center'}
			alignItems={'center'}
			resizeMode={'cover'}
			backgroundColor={'#dfdfdf'}
			borderRadius={8}
			overflow={'hidden'}
		/>  */}
      <FlatList
        ref={sliderRef}
        style={{flex: 1}}
        horizontal
        pagingEnabled={true}
        snapToInterval={totalItemWidth}
        decelerationRate="fast"
        bounces={false}
        getItemLayout={(_, index) => ({
          length: totalItemWidth,
          offset: totalItemWidth * index,
          index,
        })}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={images}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          console.log('here-->');

          let src;
          if (typeof item === 'string') {
            src = item as string;
          } else {
            src = (item as CustomImageProps).image as string;
          }

          if ((item as CustomImageProps).onPress) {
            return (
              <TouchableOpacity
                onPress={event => {
                  event.preventDefault();
                  event.stopPropagation();
                  (item as CustomImageProps).onPress?.(event);
                }}>
                <Image
                  source={{
                    image: src,
                  }}
                  key={'image' + index}
                  resizeMode="cover"
                  {...{
                    width,
                    height,
                    borderRadius,
                    borderTopLeftRadius,
                    borderTopRightRadius,
                    borderBottomLeftRadius,
                    borderBottomRightRadius,
                  }}
                  {...imageProps}
                  width={100}
                  height={100}
                />
              </TouchableOpacity>
            );
          }

          return (
            <Image
              source={{
                image: src,
              }}
              key={'image' + index}
              resizeMode="cover"
              {...{
                width,
                height,
                borderRadius,
                borderTopLeftRadius,
                borderTopRightRadius,
                borderBottomLeftRadius,
                borderBottomRightRadius,
              }}
              {...imageProps}
              width={compWidth.width}
              height={compWidth.height}
            />
          );
        }}
        ItemSeparatorComponent={() => <Box style={{width: separatorWidth}} />}
        keyExtractor={(item, index) => `${item.toString()}-${index}`}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        viewabilityConfig={viewConfigRef.current}
        windowSize={1}
        initialNumToRender={2}
        maxToRenderPerBatch={1}
        removeClippedSubviews={true}
        disableVirtualization
      />
      {mouseIn ? (
        <>
          <Box
            position="absolute"
            zIndex={1}
            start={10}
            top={'50%'}
            display={active ? 'flex' : 'none'}>
            <TouchableOpacity
              onPress={() => {
                changeSliderListIndex(active - 1);
              }}>
              <Text>
                <ChevronLeft fill="white" width={14} height={14} />
              </Text>
            </TouchableOpacity>
          </Box>
          <Box
            zIndex={1}
            end={10}
            top={'50%'}
            position="absolute"
            display={images.length - 1 !== active ? 'flex' : 'none'}>
            <TouchableOpacity
              onPress={() => {
                if (images.length !== active) {
                  changeSliderListIndex(active + 1);
                }
              }}>
              <Text>
                {' '}
                <ChevronRight fill="white" width={14} height={14} />
              </Text>
            </TouchableOpacity>
          </Box>
        </>
      ) : null}
      {children}

      {images.length > 1 ? (
        <>
          {showImageCount ? (
            <Text
              color={'#ffffff'}
              fontSize={'15px'}
              alignSelf={'flex-end'}
              padding={'10px'}
              {...imageCountProps}>
              {images.length > 1 ? `${active + 1}/${images.length}` : null}
            </Text>
          ) : null}
          <Animated.ScrollView
            horizontal
            disableVirtualization
            style={styles.navigation}>
            {images.map((_, index) => {
              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.dotStyle,
                    active == index ? styles.activeDotStyle : {},
                  ]}
                />
              );
            })}
          </Animated.ScrollView>
        </>
      ) : null}
    </Wrapper>
  );
};
