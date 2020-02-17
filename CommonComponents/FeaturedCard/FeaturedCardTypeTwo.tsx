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

interface FeaturedCardTypeTwoProps {
  image: ImageSourcePropType;
  fallbackImage: ImageSourcePropType;
  blurRadius?: number;
  action: () => any;
  name: string;
  nights: string;
  region: string;
  description: string;
}

const FeaturedCardTypeTwo = ({
  image = { uri: "" },
  fallbackImage = { uri: "" },
  blurRadius,
  action = () => null,
  name = "",
  nights = "",
  region = "",
  description = ""
}: FeaturedCardTypeTwoProps) => {
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

          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.subText}>
            {nights} to {region}
          </Text>

          <View style={styles.contentStyle}>
            <Text
              style={styles.descriptionStyle}
              numberOfLines={3}
              ellipsizeMode={"tail"}
            >
              “{description}”
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
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  fgImageStyle: {
    height: 248,
    borderRadius: 8,
    marginBottom: 16
  },
  nameText: {
    textTransform: "uppercase",
    color: CONSTANT_white1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 10),
    marginBottom: 8
  },
  subText: {
    color: CONSTANT_white1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16),
    marginBottom: 8
  },
  descriptionStyle: {
    width: 216,
    color: CONSTANT_white1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 12, 24)
  },
  backArrowStyle: {
    transform: [
      {
        scaleX: -1
      }
    ]
  }
});

export default FeaturedCardTypeTwo;
