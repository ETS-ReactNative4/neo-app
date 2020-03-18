import React from "react";
import {
  responsiveHeight
  // @ts-ignore
} from "react-native-responsive-dimensions";
import { StyleSheet, View, ViewStyle } from "react-native";

import CustomHtmlView from "../../../CommonComponents/CustomHtmlView/CustomHtmlView";

interface PromoContentProps {
  containerStyle?: ViewStyle;
}

const PromoContent = ({ containerStyle }: PromoContentProps) => {
  return (
    <View style={[styles.promoContentWrapper, containerStyle]}>
      <CustomHtmlView
        html={`<div>Key information on how to avail the promotional offer. <br /><br />Step 1<br />It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  promoContentWrapper: {
    height: responsiveHeight(60),
    marginHorizontal: 16
  }
});

export default PromoContent;
