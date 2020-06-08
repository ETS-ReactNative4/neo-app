import React, { Fragment } from "react";
import {
  View,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import BetterImage from "../BetterImage/BetterImage";
import ratioCalculator from "../../Services/ratioCalculator/ratioCalculator";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";
import {
  CONSTANT_secondColor,
  CONSTANT_black1,
  CONSTANT_shade1,
  CONSTANT_shade3,
  CONSTANT_seventeenthColor,
  CONSTANT_seventhColor,
  CONSTANT_white,
  CONSTANT_fifteenthColor
} from "../../constants/colorPallete";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
// @ts-ignore
import Triangle from "@react-native-toolkit/triangle";

export interface DealsCardProps {
  imgSource: ImageSourcePropType;
  defaultSource: ImageSourcePropType;
  width: number;
  location: string;
  title: string;
  info: string;
  bookingTime: string;
  offerPercent?: number;
  offerText?: string;
  strikedPrice?: string;
  price: string;
  isPerPerson?: boolean;
  onClick: () => any;
}

export const OFFER_BOX_HEIGHT = 24;
export const OFFER_BOX_WIDTH = 120;
export const OFFER_LEFT_SPACE = -8;
export const OFFER_TOP_SPACE = 8;

const DealsCard = ({
  imgSource,
  defaultSource,
  width,
  location,
  title,
  info,
  bookingTime,
  offerPercent,
  offerText,
  strikedPrice,
  price,
  onClick,
  isPerPerson = false
}: DealsCardProps) => {
  const action = () => {
    onClick && onClick();
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={action} style={{ width }}>
      <BetterImage
        source={imgSource}
        containerStyle={[
          { height: ratioCalculator(41, 21, width), width },
          styles.imageContainer
        ]}
        fallbackSource={defaultSource}
      />
      <View style={styles.infoView}>
        <Text
          numberOfLines={2}
          ellipsizeMode={"tail"}
          style={styles.locationText}
        >
          {location}
        </Text>
        <Text numberOfLines={2} ellipsizeMode={"tail"} style={styles.titleText}>
          {title}
        </Text>
        <Text numberOfLines={2} ellipsizeMode={"tail"} style={styles.infoText}>
          {info}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode={"tail"}
          style={styles.bookingTimeText}
        >
          {bookingTime}
        </Text>
      </View>
      <View style={styles.priceView}>
        <View style={styles.leftSection}>
          <View style={styles.offerRow}>
            {offerPercent ? (
              <View style={styles.percentTextWrapper}>
                <Text style={styles.percentText}>{`${offerPercent}% off`}</Text>
              </View>
            ) : null}
            <Text style={styles.strikedText}>
              {strikedPrice ? strikedPrice : ""}
            </Text>
          </View>
          <View style={styles.rupeeRow}>
            <Text style={styles.rupeeSymbol}>{"₹"}</Text>
            <Text style={styles.priceText}>{price}</Text>
            <Text style={styles.perPersonText}>
              {isPerPerson ? "/person" : ""}
            </Text>
          </View>
        </View>
        <View style={styles.rightSection}>
          <PrimaryButton
            text={"View"}
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonTextStyle}
            clickAction={action}
          />
        </View>
      </View>
      {offerText ? (
        <Fragment>
          <View style={styles.offerBox}>
            <Text style={styles.offerText}>{offerText}</Text>
          </View>
          <Triangle
            type={"rightAngle"}
            mode={"bottom-right"}
            base={OFFER_BOX_HEIGHT / 2 + 1}
            height={16}
            color={CONSTANT_fifteenthColor}
            style={styles.offerBoxTail1}
          />
          <Triangle
            type={"rightAngle"}
            mode={"bottom-left"}
            base={OFFER_BOX_HEIGHT / 2 + 1}
            height={16}
            color={CONSTANT_fifteenthColor}
            style={styles.offerBoxTail2}
          />
          <Triangle
            type={"rightAngle"}
            mode={"top-right"}
            base={-OFFER_LEFT_SPACE}
            height={OFFER_BOX_HEIGHT / 2}
            color={CONSTANT_fifteenthColor}
            style={styles.offerBoxShadow}
          />
        </Fragment>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  locationText: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14, 14),
    color: CONSTANT_secondColor,
    textTransform: "uppercase",
    marginHorizontal: 16,
    marginTop: 8
  },
  infoView: {
    borderWidth: 1,
    borderColor: CONSTANT_shade3,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8
  },
  titleText: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16, 18),
    color: CONSTANT_black1,
    marginTop: 8,
    marginHorizontal: 16
  },
  infoText: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14, 14),
    color: CONSTANT_shade1,
    marginTop: 8,
    marginHorizontal: 16
  },
  bookingTimeText: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16, 16),
    color: CONSTANT_seventeenthColor,
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 12
  },
  priceView: {
    flexDirection: "row",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: CONSTANT_shade3,
    borderRadius: 8
  },
  leftSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16
  },
  offerRow: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  percentTextWrapper: {
    backgroundColor: CONSTANT_seventhColor,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 4
  },
  percentText: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 13, 13),
    color: CONSTANT_white,
    textAlign: "center",
    textAlignVertical: "center"
  },
  strikedText: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14, 14),
    color: CONSTANT_shade1,
    textDecorationLine: "line-through"
  },
  rightSection: {
    flex: 1
  },
  rupeeRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  rupeeSymbol: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 13, 13),
    color: CONSTANT_black1,
    alignSelf: "flex-start"
  },
  priceText: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 20, 20),
    color: CONSTANT_black1
  },
  perPersonText: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 13, 13),
    color: CONSTANT_shade1,
    alignSelf: "flex-end"
  },
  buttonStyle: {
    height: undefined,
    flex: 1,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 16
  },
  buttonTextStyle: {},
  offerBox: {
    position: "absolute",
    top: OFFER_TOP_SPACE,
    left: OFFER_LEFT_SPACE,
    backgroundColor: CONSTANT_fifteenthColor,
    height: OFFER_BOX_HEIGHT,
    width: OFFER_BOX_WIDTH,
    alignItems: "center",
    justifyContent: "center"
  },
  offerBoxTail1: {
    position: "absolute",
    left: OFFER_LEFT_SPACE + OFFER_BOX_WIDTH,
    transform: [{ rotate: "90deg" }],
    top: OFFER_BOX_HEIGHT - 6.5
  },
  offerBoxTail2: {
    position: "absolute",
    left: OFFER_LEFT_SPACE + OFFER_BOX_WIDTH,
    transform: [{ rotate: "90deg" }],
    top: OFFER_TOP_SPACE - 1.5
  },
  offerBoxShadow: {
    position: "absolute",
    top: OFFER_TOP_SPACE + OFFER_BOX_HEIGHT,
    left: OFFER_LEFT_SPACE
  },
  offerText: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 11, 11),
    color: CONSTANT_white
  }
});

export default DealsCard;
