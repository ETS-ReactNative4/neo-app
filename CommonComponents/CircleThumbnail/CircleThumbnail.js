import React from "react";
import { ImageBackground, Image, StyleSheet } from "react-native";
import constants from "../../constants/constants";
import PropTypes from "prop-types";

const CircleThumbnail = ({ image, icon, containerStyle, iconStyle }) => {
  if (!containerStyle) containerStyle = {};
  if (!iconStyle) iconStyle = {};

  return (
    <ImageBackground
      resizeMode={"cover"}
      source={image}
      style={[styles.imageBackground, containerStyle]}
    >
      {icon ? (
        <Image
          resizeMode={"contain"}
          source={icon}
          style={[styles.planeIcon, iconStyle]}
        />
      ) : null}
    </ImageBackground>
  );
};

CircleThumbnail.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  containerStyle: PropTypes.object,
  iconStyle: PropTypes.object
};

const styles = StyleSheet.create({
  imageBackground: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: constants.shade4
  },
  planeIcon: {
    position: "absolute",
    right: -6,
    top: -6,
    height: 20,
    width: 20,
    backgroundColor: constants.black1,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10
  }
});

export default CircleThumbnail;
