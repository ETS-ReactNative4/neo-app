import React from "react";
import { TouchableHighlight, Text, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import constants from "../../constants/constants";
import Icon from "../Icon/Icon";

const SimpleButton = ({
  color,
  text,
  action,
  textColor,
  underlayColor,
  textStyle,
  hasBorder,
  containerStyle,
  icon,
  iconSize
}) => {
  if (!textStyle) textStyle = {};

  if (!containerStyle) containerStyle = {};

  if (textColor) textStyle = { ...textStyle, color: textColor };

  if (color) containerStyle.backgroundColor = color;

  if (hasBorder) {
    containerStyle = {
      borderWidth: 1.2,
      borderColor: textColor,
      ...containerStyle
    };
  }

  return (
    <TouchableHighlight
      style={[styles.button, containerStyle]}
      onPress={action}
      underlayColor={underlayColor || "white"}
    >
      <View style={styles.buttonWrapper}>
        {icon && iconSize ? (
          <Icon name={icon} size={iconSize} color={textColor} />
        ) : null}
        <Text style={[styles.textStyle, textStyle]}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

SimpleButton.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  textColor: PropTypes.string.isRequired,
  underlayColor: PropTypes.string,
  hasBorder: PropTypes.bool,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  icon: PropTypes.string,
  iconSize: PropTypes.number
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 160,
    borderRadius: 4,
    backgroundColor: constants.firstColor
  },
  buttonWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  textStyle: {
    ...constants.font17(constants.primarySemiBold),
    lineHeight: 17,
    marginTop: 2,
    marginLeft: 8
  }
});

export default SimpleButton;
