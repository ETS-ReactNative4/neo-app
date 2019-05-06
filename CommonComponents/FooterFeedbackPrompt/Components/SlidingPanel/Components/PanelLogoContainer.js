import React, { Fragment } from "react";
import { Image, View, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import constants from "../../../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";

const PanelLogoContainer = ({ titleIllustrationRef }) => {
  return (
    <Fragment>
      <View style={styles.logoBackgroundPlaceholder} />
      <View style={styles.titleLogoContainer}>
        <Animatable.Image
          ref={titleIllustrationRef}
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
    height: 48, // added 4 to the actual height of the logo container to prevent lines in android
    backgroundColor: "white",
    width: responsiveWidth(100),
    position: "absolute",
    top: 44, // keep it exactly half of the height of the logo container
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  },
  containerTitleLogo: {
    height: 88,
    width: 88
  }
});

export default PanelLogoContainer;
