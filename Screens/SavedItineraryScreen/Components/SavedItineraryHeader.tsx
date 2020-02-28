import React from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import {
  CONSTANT_black1,
  CONSTANT_black2,
  CONSTANT_white,
  CONSTANT_shade5
} from "../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../constants/fonts";
import Icon from "../../../CommonComponents/Icon/Icon";
import { CONSTANT_arrowRight } from "../../../constants/imageAssets";

interface SavedItineraryHeaderProps {
  containerStyle?: StyleProp<ViewStyle>;
  action: () => any;
  title: string;
}

const SavedItineraryHeader = ({
  containerStyle,
  action = () => null,
  title = ""
}: SavedItineraryHeaderProps) => {
  return (
    <View style={[styles.headerContainerStyle, containerStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.backArrowIconStyle}
        onPress={action}
      >
        <Icon name={CONSTANT_arrowRight} size={16} color={CONSTANT_black2} />
      </TouchableOpacity>

      <Text style={styles.textStyle}>{title}</Text>
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
  backArrowIconStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    transform: [{ scaleX: -1 }]
  },

  textStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16)
  }
});

export default SavedItineraryHeader;
