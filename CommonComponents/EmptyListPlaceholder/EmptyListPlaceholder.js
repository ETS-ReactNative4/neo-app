import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import constants from '../../constants/constants';

const EmptyListPlaceholder = ({text, containerStyle, textStyle}) => {
  if (!containerStyle) {
    containerStyle = {};
  }

  if (!textStyle) {
    textStyle = {};
  }

  return (
    <View style={[styles.placeholderContainer, containerStyle]}>
      <Text style={[styles.placeholderText, textStyle]}>{text}</Text>
    </View>
  );
};

EmptyListPlaceholder.propTypes = {
  text: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  placeholderText: {
    ...constants.font17(constants.primaryLight),
    color: constants.shade1,
  },
});

export default EmptyListPlaceholder;
