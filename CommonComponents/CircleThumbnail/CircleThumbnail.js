import React from "react";
import { Image, StyleSheet, View } from "react-native";
import constants from "../../constants/constants";
import PropTypes from "prop-types";
import Icon from "../Icon/Icon";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";
import SmartImage from "../SmartImage/SmartImage";
import FastImage from "react-native-fast-image";

/**
 * TODO: Only works with 40px circles... needs more generic design
 * @param image
 * @param icon
 * @param containerStyle
 * @param iconStyle
 * @param isContain
 * @param defaultImageUri
 * @returns {*}
 * @constructor
 */
const CircleThumbnail = ({
  image,
  icon,
  containerStyle,
  iconStyle,
  isContain,
  defaultImageUri
}) => {
  if (!containerStyle) containerStyle = {};
  if (!iconStyle) iconStyle = {};

  const customStyle = {};
  if (icon === constants.aeroplaneIcon) customStyle.paddingLeft = 1;

  const styleArray = [
    styles.image,
    isContain ? { backgroundColor: "white" } : null
  ];
  return (
    <View style={[styles.thumbnailContainer, containerStyle]}>
      <View style={styles.imageWrapper}>
        {image.uri ? (
          <SmartImage
            resizeMode={
              isContain
                ? FastImage.resizeMode.contain
                : FastImage.resizeMode.cover
            }
            uri={image.uri}
            style={styleArray}
            defaultImageUri={defaultImageUri}
          />
        ) : (
          <Image
            resizeMode={isContain ? "contain" : "cover"}
            source={image}
            style={styleArray}
          />
        )}
      </View>
      {icon ? (
        <View style={[styles.iconContainer, customStyle]}>
          <Icon size={14} color={"white"} name={icon} />
        </View>
      ) : null}
    </View>
  );
};

CircleThumbnail.propTypes = forbidExtraProps({
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  icon: PropTypes.string,
  containerStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  isContain: PropTypes.bool,
  defaultImageUri: PropTypes.string
});

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
    backgroundColor: "white"
  },
  iconContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    height: 20,
    width: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: constants.black1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  }
});

export default CircleThumbnail;
