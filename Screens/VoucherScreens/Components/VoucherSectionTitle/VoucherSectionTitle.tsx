import React from "react";
import { View, StyleSheet, Text, ViewStyle, TextStyle } from "react-native";
import Icon from "../../../../CommonComponents/Icon/Icon";
import constants from "../../../../constants/constants";

export interface VoucherSectionTitleProps {
  containerStyle?: ViewStyle;
  titleText: string;
  sectionIcon?: string;
}

const VoucherSectionTitle = ({
  containerStyle = StyleSheet.create({}),
  titleText,
  sectionIcon
}: VoucherSectionTitleProps) => {
  return (
    <View style={[styles.voucherSectionTitleContainer, containerStyle]}>
      {sectionIcon ? (
        <View style={styles.iconContainer}>
          <Icon size={14} name={sectionIcon} color={constants.shade1} />
        </View>
      ) : null}
      <View
        style={[styles.textContainer, sectionIcon ? styles.textMargin : null]}
      >
        <Text style={styles.titleText}>{titleText}</Text>
      </View>
    </View>
  );
};

export interface VoucherSectionTitleStyles {
  voucherSectionTitleContainer: ViewStyle;
  iconContainer: ViewStyle;
  textContainer: ViewStyle;
  titleText: TextStyle;
  textMargin: TextStyle;
}

const styles = StyleSheet.create<VoucherSectionTitleStyles>({
  voucherSectionTitleContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 24
  },
  iconContainer: {},
  textContainer: {},
  titleText: {
    ...constants.fontCustom(constants.primarySemiBold, 14),
    color: constants.black1
  },
  textMargin: {
    marginTop: 2,
    marginLeft: 8
  }
});

export default VoucherSectionTitle;
