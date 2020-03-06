import React from "react";
import { View, ViewStyle, StyleSheet, ScrollView } from "react-native";
import { CONSTANT_white } from "../../constants/colorPallete";
import BottomButtonBar from "../../CommonComponents/BottomButtonBar/BottomButtonBar";

import GCMBanner from "./Components/GCMBanner";
import GCMSearch from "./Components/GCMSearch";

interface GCMFormProps {
  containerStyle?: ViewStyle;
}

const GCMForm = ({ containerStyle }: GCMFormProps) => {
  return (
    <View style={[styles.formContainerStyle, containerStyle]}>
      <GCMBanner
        bannerImage={"https://d3lf10b5gahyby.cloudfront.net/misc/hungary.jpeg"}
        backAction={() => {}}
        title={"4 nights to Kuta and Ubud"}
      />

      <View style={styles.bodyContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <GCMSearch />
        </ScrollView>

        <BottomButtonBar
          disableLeftButton
          rightButtonName={"Lorem Ipsum"}
          rightButtonAction={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainerStyle: {
    flex: 1
  },

  bodyContainer: {
    flex: 1,
    backgroundColor: CONSTANT_white,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    marginTop: -24
  }
});

export default GCMForm;
