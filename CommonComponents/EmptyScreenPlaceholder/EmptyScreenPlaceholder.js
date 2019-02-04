import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import constants from "../../constants/constants";
import SimpleButton from "../SimpleButton/SimpleButton";
import {
  responsiveWidth,
  responsiveHeight
} from "react-native-responsive-dimensions";
import { isIphoneX } from "react-native-iphone-x-helper";

const EmptyScreenPlaceholder = ({
  title,
  body,
  image = null,
  buttonText,
  buttonAction = () => {},
  buttonContainerStyle = {},
  buttonTextStyle = {},
  containerStyle = {},
  titleStyle = {},
  bodyTextStyle = {},
  buttonProps = {}
}) => {
  return (
    <View style={[styles.placeholderContainer, containerStyle]}>
      {image ? (
        <Image
          source={image}
          style={styles.illustration}
          resizeMode={"contain"}
        />
      ) : null}
      {title ? (
        <Text style={[styles.placeholderTitle, titleStyle]}>{title}</Text>
      ) : null}
      {body ? (
        <Text style={[styles.placeholderBody, bodyTextStyle]}>{body}</Text>
      ) : null}
      {buttonText ? (
        <SimpleButton
          containerStyle={{ marginTop: 8, ...buttonContainerStyle }}
          textStyle={{ ...buttonTextStyle }}
          text={buttonText}
          action={buttonAction}
          textColor={constants.black2}
          color={"transparent"}
          hasBorder={true}
          {...buttonProps}
        />
      ) : null}
    </View>
  );
};

EmptyScreenPlaceholder.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  buttonText: PropTypes.string,
  buttonAction: PropTypes.func,
  containerStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  buttonProps: PropTypes.object,
  bodyTextStyle: PropTypes.object,
  buttonContainerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number
  ]),
  buttonTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    width: responsiveWidth(100),
    height:
      responsiveHeight(100) -
      constants.headerHeight -
      (isIphoneX() ? constants.xSensorAreaHeight : 0)
  },
  placeholderTitle: {
    ...constants.fontCustom(constants.primarySemiBold, 20),
    color: constants.black1,
    marginVertical: 8
  },
  placeholderBody: {
    ...constants.fontCustom(constants.primaryLight, 15, 18),
    color: constants.black2,
    textAlign: "center"
  },
  illustration: {
    width: responsiveWidth(100) - 48,
    height: responsiveHeight(25)
  }
});

export default EmptyScreenPlaceholder;
