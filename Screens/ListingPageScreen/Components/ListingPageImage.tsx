import React from "react";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TouchableOpacity,
  ImageBackground
} from "react-native";

import Icon from "../../../CommonComponents/Icon/Icon";
import { CONSTANT_arrowRight } from "../../../constants/imageAssets";
import { CONSTANT_white } from "../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../constants/fonts";

import ratioCalculator from "../../../Services/ratioCalculator/ratioCalculator";

interface ListingPageImageProps {
  containerStyle?: ViewStyle;
}

const BANNER_WIDTH = responsiveWidth(100);
const BANNER_HEIGHT = ratioCalculator(3, 2, BANNER_WIDTH);

const ListingPageImage = ({ containerStyle }: ListingPageImageProps) => {
  return (
    <View style={[styles.bannerWrapper, containerStyle]}>
      <ImageBackground
        source={{
          uri:
            "https://pyt-images.imgix.net/images/product_blog/itinerary-box/australia-small.jpeg"
        }}
        resizeMode={"cover"}
        style={styles.bannerImage}
      >
        <View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
            <View style={styles.backArrowWrapper}>
              <View style={styles.backArrowIconStyle}>
                <Icon
                  name={CONSTANT_arrowRight}
                  size={14}
                  color={CONSTANT_white}
                />
              </View>

              <Text style={styles.backTextStyle}>BACK</Text>
            </View>
          </TouchableOpacity>

          <View>
            <Text style={styles.customizeText}>18 CUSTOMIZABLE OPTIONS</Text>
            <Text style={styles.titleText}>
              Romantic holidays for you and your better half.
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    height: BANNER_HEIGHT
  },
  bannerImage: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center"
  },
  backArrowWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  backArrowIconStyle: {
    transform: [{ scaleX: -1 }]
  },
  backTextStyle: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14, 18),
    textTransform: "uppercase",
    paddingLeft: 4
  },
  customizeText: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12, 15),
    textTransform: "uppercase",
    marginBottom: 8
  },
  titleText: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 20, 28)
  }
});

export default ListingPageImage;
