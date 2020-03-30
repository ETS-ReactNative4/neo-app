import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import CustomHtmlView from "../../../CommonComponents/CustomHtmlView/CustomHtmlView";

interface PromoContentProps {
  containerStyle?: ViewStyle;
  html: string;
}

const PromoContent = ({ containerStyle, html = "" }: PromoContentProps) => {
  return (
    <View style={[styles.promoContentWrapper, containerStyle]}>
      <CustomHtmlView html={html} />
    </View>
  );
};

const styles = StyleSheet.create({
  promoContentWrapper: {
    marginHorizontal: 16
  }
});

export default PromoContent;
