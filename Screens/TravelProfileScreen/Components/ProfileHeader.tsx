import React from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextStyle
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

interface ProfileHeaderProps {
  leftLinkText?: string;
  rightLinkText: string;
  containerStyle?: StyleProp<ViewStyle>;
  clickLeftLink?: () => any;
  clickRightLink?: () => any;
  rightTextColorStyle?: StyleProp<TextStyle>;
  enableLeftLink?: boolean;
}

const ProfileHeader = ({
  containerStyle,
  leftLinkText = "",
  rightLinkText = "",
  clickLeftLink = () => null,
  clickRightLink = () => null,
  rightTextColorStyle,
  enableLeftLink = false
}: ProfileHeaderProps) => {
  return (
    <View style={[styles.headerContainerStyle, containerStyle]}>
      <View>
        {enableLeftLink ? (
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
    position: "absolute",
    top: 0,
    left: 0,
    width: responsiveWidth(100),
    paddingHorizontal: 32
  },

  linkTouchableStyle: {
    paddingVertical: 16,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  linkLeftTouchableStyle: { paddingLeft: 8 },
  linkRightTouchableStyle: { paddingRight: 8 },

  backArrowIconStyle: {
    marginTop: -4,
    marginRight: 8,
    transform: [{ scaleX: -1 }]
  },

  leftTextStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 10),
    textTransform: "uppercase"
  },

  rightTextStyle: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 10),
    textTransform: "uppercase",
    textDecorationLine: "underline"
  }
});

export default ProfileHeader;
