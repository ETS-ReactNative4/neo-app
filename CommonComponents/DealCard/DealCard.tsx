import React from "react";
import {
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity
} from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

import SmartImageV2 from "../SmartImage/SmartImageV2";
import Icon from "../Icon/Icon";
import {
  CONSTANT_white,
  CONSTANT_white1,
  CONSTANT_black1,
  CONSTANT_black2,
  CONSTANT_shade1,
  CONSTANT_shade2,
  CONSTANT_shade3,
  CONSTANT_sixteenthColor
} from "../../constants/colorPallete";
import { CONSTANT_transferIcon } from "../../constants/imageAssets";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";

interface DealCardProps {
  containerStyle?: StyleProp<ViewStyle>;
  action: () => any;
}

const DealCard = ({ containerStyle, action = () => null }: DealCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={action}>
      <View style={[styles.dealCardContainer, containerStyle]}>
        <SmartImageV2
          source={{
            uri: "https://pyt-images.imgix.net/images/city/2400xh/rome.jpg"
          }}
          fallbackSource={{
            uri: "https://pyt-images.imgix.net/images/city/2400xh/rome.jpg"
          }}
          style={[styles.dealImage, styles.imageStyle]}
          resizeMode="cover"
        >
          <View style={styles.offerTextContainer}>
            <Text style={styles.percentageText}>
              30<Text style={styles.percentageStyle}>%</Text>
            </Text>
            <Text style={styles.offerText}>OFF</Text>
          </View>

          <View style={styles.pillWrapper}>
            <View style={styles.pillStyle}>
              <Text style={[styles.pillTextStyle]}>New zealand</Text>
            </View>
            <View style={styles.pillStyle}>
              <Text style={[styles.pillTextStyle]}>Car rental</Text>
            </View>
            <View style={[styles.pillStyle, styles.activePillStyle]}>
              <Text style={[styles.pillTextStyle, styles.activePillTextStyle]}>
                early bird offer
              </Text>
            </View>
          </View>
        </SmartImageV2>

        <View style={styles.content}>
          <Text style={styles.titleText}>Early Booker Special 2020/21</Text>

          <View style={styles.subTextWrapper}>
            <View>
              <Icon
                name={CONSTANT_transferIcon}
                size={14}
                color={CONSTANT_shade2}
              />
            </View>

            <Text style={styles.subText}>
              Travel Period: <Text>01 Apr 20 - 31 Mar 21</Text>
            </Text>
          </View>

          <View style={styles.bottomContainer}>
            <Text
              style={styles.leftText}
              numberOfLines={2}
              ellipsizeMode={"tail"}
            >
              For bookings made 120 days prior to pick up date.
            </Text>

            <View style={styles.rightColumn}>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar} />
              </View>
              <Text style={[styles.rightText]}>64% claimed</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dealCardContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginHorizontal: 16,
    marginVertical: 16,
    overflow: "hidden",
    backgroundColor: CONSTANT_white,
    width: responsiveWidth(100) - 32
  },

  imageStyle: {
    padding: 8,
    width: responsiveWidth(100) - 32,
    justifyContent: "space-between"
  },

  dealImage: {
    height: 178,
    width: responsiveWidth(100)
  },

  offerTextContainer: {
    backgroundColor: CONSTANT_sixteenthColor,
    borderRadius: 100,
    width: 54,
    height: 54,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto"
  },

  percentageText: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 18),
    color: CONSTANT_white
  },
  percentageStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12, 15)
  },
  offerText: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12),
    color: CONSTANT_shade3
  },

  pillWrapper: {
    flexWrap: "wrap",
    flexDirection: "row"
  },

  pillStyle: {
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 22,
    marginRight: 4,
    marginBottom: 4
  },

  pillTextStyle: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 11, 14),
    textTransform: "uppercase"
  },

  activePillStyle: {
    backgroundColor: "#1FC0E5"
  },

  activePillTextStyle: {
    color: "#FFFFFF"
  },

  content: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: CONSTANT_white1,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: CONSTANT_shade3,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },

  titleText: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16, 20),
    marginBottom: 6
  },

  subTextWrapper: {
    flexDirection: "row"
  },

  subText: {
    color: CONSTANT_black2,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 13, 16),
    marginLeft: 6,
    marginBottom: 48
  },

  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  leftText: {
    width: 152,
    color: CONSTANT_black2,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 13, 18)
  },
  rightColumn: {},
  rightText: {
    color: CONSTANT_black2,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 12, 15),
    textAlign: "right"
  },

  progressBarContainer: {
    width: 88,
    height: 6,
    backgroundColor: CONSTANT_shade3,
    borderRadius: 3,
    marginBottom: 8
  },
  progressBar: {
    backgroundColor: "red",
    width: 64,
    height: 6,
    borderRadius: 3
  }
});

export default DealCard;
