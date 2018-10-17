import React from "react";
import {
  View,
  StyleSheet,
  LayoutAnimation,
  Image,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../constants/constants";
import Icon from "../Icon/Icon";

const BackButtonIos = ({ backAction, isVisible, containerStyle }) => {
  if (!containerStyle) containerStyle = {};
  if (!isVisible) return null;
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  /**
   * TODO: Use ICON!!
   */
  return (
    <View style={[styles.backButtonIosContainer, containerStyle]}>
      <TouchableOpacity onPress={backAction} style={styles.buttonContainer}>
        <Image
          resizeMode={"contain"}
          source={constants.backArrow}
          style={styles.leftButtonIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonIosContainer: {
    height: 36,
    width: responsiveWidth(100),
    backgroundColor: "white",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0, 0, 0, .3)",
    flexDirection: "row",
    alignItems: "center"
  },
  buttonContainer: {
    padding: 4,
    marginLeft: 24,
    alignItems: "center",
    justifyContent: "center",
    height: 24,
    width: 24
  },
  leftButtonIcon: {
    height: 24,
    width: 24
  }
});

BackButtonIos.propTypes = {
  backAction: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  containerStyle: PropTypes.object
};

export default BackButtonIos;
