import React from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const XSensorPlaceholder = ({containerStyle}) => {

  if(!containerStyle) containerStyle = {};

  return (
    <View style={[{height: 30}, containerStyle]}/>
  );
};

XSensorPlaceholder.propTypes = {
  containerStyle: PropTypes.object,
};

export default XSensorPlaceholder;
