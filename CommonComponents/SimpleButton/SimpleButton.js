import React from "react";
import { TouchableHighlight, Text, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import constants from "../../constants/constants";
import Icon from "../Icon/Icon";

const SimpleButton = ({
  color,
  text,
  action = () => null,
  textColor,
  underlayColor,
  textStyle = {},
  hasBorder,
  containerStyle = {},
  icon,
  iconSize,
  rightIcon = false,
  lightBoxMode = false
}) => {
  if (textColor) textStyle = { ...textStyle, color: textColor };

  if (color) {
    containerStyle = {
      ...containerStyle,
      backgroundColor: color
    };
  }

  if (hasBorder) {
    containerStyle = {
      borderWidth: 1.2,
      borderColor: textColor,
      ...containerStyle
    };
  }

  let Parent = TouchableHighlight,
    parentProps = {};
  if (!lightBoxMode) {
    Parent = TouchableHighlight;
    parentProps = {
      onPress: action,
      underlayColor: underlayColor || "white"
    };
  } else {
    /**
     * Lightbox mode doesn't support touchable components, hence normal View is used
     */
    Parent = View;
  }

  return (
    <Parent style={[styles.button, containerStyle]} {...parentProps}>
      <View
        style={[
          styles.buttonWrapper,
          rightIcon ? { flexDirection: "row-reverse" } : {}
        ]}
      >
        {icon && iconSize ? (
          <Icon name={icon} size={iconSize} color={textColor} />
        ) : null}
        <Text
          style={[
            styles.textStyle,
            textStyle,
            icon && iconSize ? { marginLeft: 8 } : {}
          ]}
        >
          {text}
        </Text>
      </View>
    </Parent>
  );
};

SimpleButton.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string.isRequired,
  action: PropTypes.func,
  textColor: PropTypes.string.isRequired,
  underlayColor: PropTypes.string,
  hasBorder: PropTypes.bool,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  lightBoxMode: PropTypes.bool
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
    marginTop: 2
  }
});

export default SimpleButton;
