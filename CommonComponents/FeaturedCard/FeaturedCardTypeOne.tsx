import React from "react";
import { StyleSheet, ImageSourcePropType, View, Text } from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import SmartImageV2 from "../SmartImage/SmartImageV2";
import Icon from "../Icon/Icon";
import { CONSTANT_white1 } from "../../constants/colorPallete";
import { CONSTANT_backIcon } from "../../constants/imageAssets";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";
import { TouchableOpacity } from "react-native-gesture-handler";

interface FeaturedCardTypeOneProps {
  image: ImageSourcePropType;
  fallbackImage: ImageSourcePropType;
  blurRadius?: number;
  action: () => any;
  price: string;
}

const FeaturedCardTypeOne = ({
  image = { uri: "" },
  fallbackImage = { uri: "" },
  blurRadius,
  action = () => null,
  price
}: FeaturedCardTypeOneProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={action}>
      <SmartImageV2
        source={image}
        fallbackSource={fallbackImage}
        resizeMode="cover"
        style={styles.bgImageStyle}
        blurRadius={blurRadius}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.innerCard}>
          <SmartImageV2
            source={image}
            fallbackSource={fallbackImage}
            resizeMode="cover"
            style={styles.fgImageStyle}
          />

          <View style={styles.contentStyle}>
            <Text style={styles.textStyle}>
              {" "}
              From <Text style={styles.boldTextStyle}>{price}</Text> / person
            </Text>

            <View style={styles.backArrowStyle}>
              <Icon
                name={CONSTANT_backIcon}
                size={18}
                color={CONSTANT_white1}
              />
            </View>
          </View>
        </View>
      </SmartImageV2>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bgImageStyle: {
    width: responsiveWidth(100) - 32,
    marginBottom: 32
  },
  imageStyle: {
    borderRadius: 4
  },
  innerCard: {
    padding: 24
  },
  contentStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  fgImageStyle: {
    height: 328,
    borderRadius: 8,
    marginBottom: 24
  },
  textStyle: {
    color: CONSTANT_white1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16)
  },
  boldTextStyle: {
    color: CONSTANT_white1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16)
  },
  backArrowStyle: {
    transform: [
      {
        scaleX: -1
      }
    ]
  }
});

export default FeaturedCardTypeOne;
