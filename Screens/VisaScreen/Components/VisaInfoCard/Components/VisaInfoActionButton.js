import React from "react";
import {
  StyleSheet,
  ViewPropTypes,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import constants from "../../../../../constants/constants";

const VisaInfoActionButton = ({
  containerStyle = StyleSheet.create({}),
  image,
  cta,
  action = () => null
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action}
      style={[styles.visaInfoActionButtonContainer, containerStyle]}
    >
      <Image source={image} resizeMode={"contain"} style={styles.ctaImage} />
      <Text style={styles.ctaText}>{cta}</Text>
    </TouchableOpacity>
  );
};

VisaInfoActionButton.propTypes = {
  containerStyle: ViewPropTypes.style,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  cta: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  visaInfoActionButtonContainer: {
    flexDirection: "row",
    backgroundColor: constants.black1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4
  },
  ctaImage: {
    width: 16,
    height: 22
  },
  ctaText: {
    ...constants.fontCustom(constants.primarySemiBold, 14),
    color: "white",
    marginLeft: 4
  }
});

export default VisaInfoActionButton;
