import React, { Fragment } from "react";
import { Image, View, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import Icon from "../../../CommonComponents/Icon/Icon";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

/**
 * Contains the thumps up logo for the feedback panel
 * It is an animatable components hence ref should be passed to the parent
 */
const PanelLogoContainer = ({ titleIllustrationRef, isFeedbackPositive }) => {
  return (
    <View style={styles.titleLogoContainer}>
      <View style={styles.logoBackgroundPlaceholder} />
      <Animatable.Image
        duration={1500}
        ref={titleIllustrationRef}
        source={
          isFeedbackPositive
            ? constants.positiveBackgroundShape
            : constants.negativeBackgroundShape
        }
        style={styles.containerTitleLogo}
        resizeMode={"contain"}
        useNativeDriver={true}
      />
      <View style={styles.titleIcon}>
        <Icon
          name={
            isFeedbackPositive
              ? constants.thumbsUpIcon
              : constants.thumbsDownIcon
          }
          size={30}
          color={"white"}
        />
      </View>
    </View>
  );
};

PanelLogoContainer.propTypes = forbidExtraProps({
  titleIllustrationRef: PropTypes.object.isRequired,
  isFeedbackPositive: PropTypes.bool.isRequired
});

const styles = StyleSheet.create({
  titleLogoContainer: {
    height: 94,
    width: responsiveWidth(100),
    alignItems: "center",
    backgroundColor: "transparent",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  logoBackgroundPlaceholder: {
    height: 48, // added 4 to the actual height of the logo container to prevent lines in android
    backgroundColor: "white",
    width: responsiveWidth(100),
    position: "absolute",
    top: 47, // keep it exactly half of the height of the logo container
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  },
  containerTitleLogo: {
    height: 88,
    width: 88
  },
  titleIcon: {
    position: "absolute",
    height: 88,
    width: 88,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default PanelLogoContainer;
