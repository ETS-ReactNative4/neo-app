import React, { Fragment } from "react";
import { Image, View, StyleSheet } from "react-native";
import constants from "../../../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";

const PanelLogoContainer = () => {
  return (
    <Fragment>
      <View style={styles.logoBackgroundPlaceholder} />
      <View style={styles.titleLogoContainer}>
        <Image
          source={constants.positiveBackgroundShape}
          style={styles.containerTitleLogo}
          resizeMode={"contain"}
        />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  titleLogoContainer: {},
  logoBackgroundPlaceholder: {
    height: 44,
    backgroundColor: "white",
    width: responsiveWidth(100),
    position: "absolute",
    top: 44,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  },
  containerTitleLogo: {
    height: 88,
    width: 88
  }
});

export default PanelLogoContainer;
