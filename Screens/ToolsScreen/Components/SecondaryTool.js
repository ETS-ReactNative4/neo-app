import React from 'react';
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import constants from "../../../constants/constants";
import PropTypes from 'prop-types';

const SecondaryTool = ({icon, action, text, containerStyle}) => {
  return (
    <TouchableHighlight style={[styles.secondaryContainer, containerStyle || {}]} onPress={action} underlayColor={'transparent'}>
      <View style={styles.secondaryWrapper}>
        <Image
          source={icon}
          style={styles.icon}
        />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableHighlight>
  )
};

SecondaryTool.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]).isRequired,
  action: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  secondaryContainer: {
    height: 24,
    marginTop: 24,
  },
  secondaryWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    height: 24,
    width: 24,
  },
  text: {
    fontFamily: constants.primaryRegular,
    marginLeft: 8,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "300",
    color: constants.black2,
  },
});

export default SecondaryTool;
