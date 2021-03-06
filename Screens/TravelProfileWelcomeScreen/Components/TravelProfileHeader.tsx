import React from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextStyle,
  Platform
} from "react-native";

import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

import {
  CONSTANT_white1,
  CONSTANT_black1,
  CONSTANT_shade1,
  CONSTANT_black2
} from "../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../constants/fonts";
import Icon from "../../../CommonComponents/Icon/Icon";
import { CONSTANT_arrowRight } from "../../../constants/imageAssets";

interface TravelProfileHeaderProps {
  leftLinkText?: string;
  rightLinkText: string;
  containerStyle?: StyleProp<ViewStyle>;
  clickLeftLink?: () => any;
  clickRightLink?: () => any;
  rightTextColorStyle?: StyleProp<TextStyle>;
}

const TravelProfileHeader = ({
  containerStyle,
  leftLinkText = "",
  rightLinkText = "",
  clickLeftLink = () => null,
  clickRightLink = () => null,
  rightTextColorStyle
}: TravelProfileHeaderProps) => {
  return (
    <View style={[styles.headerContainerStyle, containerStyle]}>
      <View>
        {leftLinkText ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.linkTouchableStyle, styles.linkRightTouchableStyle]}
            onPress={clickLeftLink}
          >
            <View style={styles.backArrowIconStyle}>
              <Icon
                name={CONSTANT_arrowRight}
                size={14}
                color={CONSTANT_black2}
              />
            </View>

            <Text style={styles.leftTextStyle}>{leftLinkText}</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.linkTouchableStyle, styles.linkLeftTouchableStyle]}
          onPress={clickRightLink}
        >
          <Text style={[styles.rightTextStyle, rightTextColorStyle]}>
            {rightLinkText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainerStyle: {
    backgroundColor: CONSTANT_white1,
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: responsiveWidth(100),
    paddingHorizontal: 24
  },

  linkTouchableStyle: {
    paddingVertical: 16,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        marginTop: 2
      }
    })
  },

  linkLeftTouchableStyle: { paddingLeft: 8 },
  linkRightTouchableStyle: { paddingRight: 8 },

  backArrowIconStyle: {
    marginTop: -1,
    marginRight: 8,
    transform: [{ scaleX: -1 }]
  },

  leftTextStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14),
    ...Platform.select({
      ios: {
        marginTop: 2
      }
    })
    // textTransform: "uppercase"
  },

  rightTextStyle: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12),
    // textTransform: "uppercase",
    textDecorationLine: "underline"
  }
});

export default TravelProfileHeader;
