import React from 'react';
import {
  TouchableHighlight,
  Text,
  StyleSheet,
} from 'react-native';
import constants from "../../../constants/constants";
import PropTypes from 'prop-types';

const PrimaryTool = ({text, action, containerStyle}) => {
  return (
    <TouchableHighlight style={[styles.primaryContainer, containerStyle || {}]} onPress={action} underlayColor={constants.shade3}>
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  )
};

PrimaryTool.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  primaryContainer: {
    height: 80,
    borderRadius: 5,
    backgroundColor: constants.shade4,
    justifyContent: 'center',
  },
  text: {
    fontFamily: constants.primaryFont,
    fontWeight: "600",
    color: constants.black2,
    fontSize: 20,
    lineHeight: 24,
    marginLeft: 16,
  },
});

export default PrimaryTool;
