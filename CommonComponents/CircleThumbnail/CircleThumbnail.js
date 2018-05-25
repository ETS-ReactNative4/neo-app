import React from "react";
import { Image, StyleSheet, View } from "react-native";
import constants from "../../constants/constants";
import PropTypes from "prop-types";
import Icon from "../Icon/Icon";

const CircleThumbnail = ({ image, icon, containerStyle, iconStyle }) => {
  if (!containerStyle) containerStyle = {};
  if (!iconStyle) iconStyle = {};

  const customStyle = {};
  if (icon === constants.aeroplaneIcon) customStyle.paddingLeft = 1;

  return (
    <View style={[styles.thumbnailContainer, containerStyle]}>
      <View style={styles.imageWrapper}>
        <Image resizeMode={"cover"} source={image} style={styles.image} />
      </View>
      {icon ? (
        <View style={[styles.iconContainer, customStyle]}>
          <Icon size={14} color={"white"} name={icon} />
        </View>
      ) : null}
    </View>
  );
};

CircleThumbnail.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  icon: PropTypes.string,
  containerStyle: PropTypes.object,
  iconStyle: PropTypes.object
};

const styles = StyleSheet.create({
  thumbnailContainer: {
    height: 45,
    width: 45,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  imageWrapper: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: constants.shade4
  },
  iconContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: constants.black1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  }
});

export default CircleThumbnail;
