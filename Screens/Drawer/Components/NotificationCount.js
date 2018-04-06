import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import constants from "../../../constants/constants";

const NotificationCount = ({count}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{count}</Text>
    </View>
  );
};

NotificationCount.propTypes = {
  count: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: constants.firstColor,
    borderRadius: 12,
  },
  text: {
    fontFamily: constants.primaryRegular,
    fontSize: 15,
    lineHeight: 18,
    color: 'white',
  },
});

export default NotificationCount;
