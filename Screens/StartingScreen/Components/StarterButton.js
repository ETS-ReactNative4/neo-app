import React from 'react';
import {
  TouchableHighlight,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import constants from "../../../constants/constants";

const StarterButton = ({color, text, action, textColor, underlayColor, hasBorder, marginBottom}) => {

  let containerStyle = {};
  const textStyle = {};

  if(textColor) textStyle.color = textColor;

  if(color) containerStyle.backgroundColor = color;

  if(marginBottom) containerStyle.marginBottom = marginBottom;

  if(hasBorder) {
    containerStyle = {
      ...containerStyle,
      borderWidth: 1,
      borderColor: textColor,
    }
  }

  return (
    <TouchableHighlight
      style={[styles.button, containerStyle]}
      onPress={action}
      underlayColor={underlayColor || 'white'}
      >
      <Text style={[styles.textStyle, textStyle]}>{text}</Text>
    </TouchableHighlight>
  )
};

StarterButton.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  textColor: PropTypes.string.isRequired,
  underlayColor: PropTypes.string,
  hasBorder: PropTypes.bool,
  marginBottom: PropTypes.number,
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    marginHorizontal: 25,
    marginVertical: 4,
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  textStyle: {
    ...constants.font20(constants.primarySemiBold),
  },
});

export default StarterButton;
