import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp
} from "react-native";
import { CONSTANT_closeIcon } from "../../../constants/imageAssets";
import {
  CONSTANT_black1,
  CONSTANT_shade5,
  CONSTANT_white
} from "../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../constants/fonts";
import Icon from "../../../CommonComponents/Icon/Icon";

export type filterModalHeaderType = {
  closeAction: () => any;
  containerStyle?: StyleProp<ViewStyle>;
  title: string;
};

const FilterModalHeader = ({
  closeAction,
  containerStyle,
  title
}: filterModalHeaderType) => {
  return (
    <View style={[styles.headerContainerStyle, containerStyle]}>
      <TouchableOpacity
        style={styles.closeIconStyle}
        activeOpacity={0.8}
        onPress={closeAction}
      >
        <Icon name={CONSTANT_closeIcon} size={24} color={CONSTANT_black1} />
      </TouchableOpacity>

      <Text style={styles.headerTextStyle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainerStyle: {
    backgroundColor: CONSTANT_white,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: CONSTANT_shade5
  },
  closeIconStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56
  },
  headerTextStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 18, 24)
  }
});

export default FilterModalHeader;
