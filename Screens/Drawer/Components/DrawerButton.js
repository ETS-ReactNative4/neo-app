import React from 'react';
import {
  TouchableHighlight,
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import constants from "../../../constants/constants";

const DrawerButton = ({icon, text, action, info, isActive}) => {
  return (
    <TouchableHighlight
      style={[
        styles.buttonContainer,
        isActive
        ?
          {
            backgroundColor: constants.shade4
          }
        : {}
      ]}
      onPress={action}
      underlayColor={
        isActive
          ?
          constants.shade3
          :
          constants.shade4
      }
      >
      <View style={styles.buttonView}>

        <View style={styles.iconContainer}>
          <Image
            source={icon}
            style={styles.icon}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.menuName}>{text}</Text>
        </View>

        <View style={styles.infoArea}>
          {info}
        </View>

      </View>
    </TouchableHighlight>
  );
};

DrawerButton.propTypes = {
  icon: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  info: PropTypes.element,
  isActive: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 48,
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 24,
    width: 24,
  },
  textContainer: {
    flex: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  menuName: {
    fontWeight: "300",
    fontFamily: constants.primaryFont,
    color: constants.shade1,
    fontSize: 20,
    lineHeight: 48,
    paddingLeft: 8,
  },
  infoArea: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DrawerButton;
