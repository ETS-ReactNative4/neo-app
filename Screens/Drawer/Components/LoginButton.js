import React from 'react';
import {
  TouchableHighlight,
  Text,
  StyleSheet,
} from 'react-native';
import constants from "../../../constants/constants";
import PropTypes from 'prop-types';

const LoginButton = ({action, text}) => {
  return (
    <TouchableHighlight
      onPress={action}
      style={styles.buttonContainer}
      underlayColor={'transparent'}
      >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableHighlight>
  )
};

LoginButton.propTypes = {
  action: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    alignSelf: 'center',
    width: 64,
    height: 24,
    borderRadius: 17,
    marginBottom: 19,
    borderColor: constants.shade1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontFamily: constants.primaryRegular,
    fontWeight: "600",
    color: constants.shade1,
    fontSize: 10,
    lineHeight: 13,
  },
});

export default LoginButton;
