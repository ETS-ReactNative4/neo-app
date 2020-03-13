import React from "react";
import { StyleSheet, View, ImageStyle, StyleProp, Text } from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

import SmartImageV2 from "../../SmartImage/SmartImageV2";
import {
  CONSTANT_shade6,
  CONSTANT_black1
} from "../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";
import { CONSTANT_defaultPlaceImage } from "../../../constants/imageAssets";

interface ItineraryCardImageProps {
  images: string[];
  imageStyle?: StyleProp<ImageStyle>;
  tripType: string;
}

const ItineraryCardImage = ({
  images = [],
  tripType = "",
  imageStyle
}: ItineraryCardImageProps) => {
  return (
    <View style={styles.scrollImageContainer}>
      <View style={styles.tripTypeContainer}>
        <Text style={styles.tripTypeTextStyle}>{tripType}</Text>
      </View>
      <SmartImageV2
        source={{
          uri: images[0]
        }}
        fallbackSource={{
          uri: CONSTANT_defaultPlaceImage
        }}
        resizeMode="cover"
        style={[styles.itineraryImage, imageStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itineraryImage: {
    height: 200,
    width: responsiveWidth(100)
  },
  scrollImageContainer: {
    alignItems: "center",
    backgroundColor: CONSTANT_shade6
  },
  tripTypeContainer: {
    position: "absolute",
    top: 12,
    left: 12,
    padding: 8,
    backgroundColor: CONSTANT_shade6,
    borderRadius: 4,
    zIndex: 1
  },
  tripTypeTextStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 13, 18)
  },
  dotContainer: {
    position: "absolute",
    bottom: 12,
    flexDirection: "row",
    zIndex: 1
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "white",
    opacity: 0.5,
    marginHorizontal: 4
  }
});

export default ItineraryCardImage;
