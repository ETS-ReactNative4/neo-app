import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";

import {
  CONSTANT_firstColor,
  CONSTANT_white
} from "../../constants/colorPallete";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";
import {
  CONSTANT_elevationFive,
  CONSTANT_xSensorAreaHeight
} from "../../constants/styles";
import { isIphoneX } from "react-native-iphone-x-helper";

interface BottomButtonBarProps {
  containerStyle?: StyleProp<ViewStyle>;
  leftButtonName?: string;
  leftButtonAction?: () => any;
  disableLeftButton?: boolean;
  rightButtonName: string;
  rightButtonAction: () => any;
}

const BottomButtonBar = ({
  containerStyle,
  leftButtonName = "",
  leftButtonAction = () => {},
  disableLeftButton = false,
  rightButtonName = "",
  rightButtonAction = () => {}
}: BottomButtonBarProps) => {
  return (
    <View style={[styles.bottomButtonBar, containerStyle]}>
      {!disableLeftButton ? (
        <PrimaryButton
          text={leftButtonName}
          buttonStyle={[styles.buttonStyle, styles.leftBtn]}
          buttonTextStyle={[styles.buttonTextStyle, styles.leftBtnTextStyle]}
          clickAction={leftButtonAction}
        />
      ) : null}
      <PrimaryButton
        text={rightButtonName}
        buttonStyle={[styles.buttonStyle, styles.rightBtn]}
        buttonTextStyle={styles.buttonTextStyle}
        clickAction={rightButtonAction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomButtonBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    backgroundColor: CONSTANT_white,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: isIphoneX() ? CONSTANT_xSensorAreaHeight : 16,
    ...CONSTANT_elevationFive
  },
  buttonStyle: {
    flex: 1,
    height: 44
  },
  leftBtn: {
    marginRight: 4,
    backgroundColor: CONSTANT_white,
    borderColor: CONSTANT_firstColor,
    borderWidth: 2
  },
  leftBtnTextStyle: {
    color: CONSTANT_firstColor
  },
  rightBtn: {
    marginLeft: 4
  },
  buttonTextStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14, 16)
  }
});

export default BottomButtonBar;
