import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import BottomBarWrapper from '../BottomBarWrapper/BottomBarWrapper';
import Icon from '../Icon/Icon';
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
} from '../../constants/fonts';
import {CONSTANT_white} from '../../constants/colorPallete';
import {
  CONSTANT_dealsFlare,
  CONSTANT_chatIcon,
} from '../../constants/imageAssets';
import LottieView from 'lottie-react-native';
import {chatLauncher} from '../../Services/freshchatService/freshchatService';
import SmartImageV2 from '../SmartImage/SmartImageV2';

/**
 * PT TODO: Typing unavailable for bottom bar hence the file is in js
 * Must be updated once typings are updated
 */
const ExploreBottomBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.bottomBarContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (label === 'Chat') {
              chatLauncher();
            } else {
              navigation.navigate(route.name);
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const color = isFocused
          ? options.activeTintColor
          : options.inactiveTintColor;
        const buttonContainerStyle = {
          backgroundColor: isFocused
            ? options.activeBackgroundColor
            : options.inactiveBackgroundColor,
        };

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.buttonContainer, buttonContainerStyle]}>
            <View style={styles.iconContainer}>
              {label === 'Deals' && !isFocused ? (
                <LottieView source={CONSTANT_dealsFlare()} autoPlay loop />
              ) : label === 'Chat' ? (
                <SmartImageV2
                  source={CONSTANT_chatIcon()}
                  style={styles.chatStyle}
                />
              ) : (
                <Icon name={options.icon} color={color} size={24} />
              )}
            </View>
            <Text style={styles.text}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

ExploreBottomBar.propTypes = {
  state: PropTypes.object,
  descriptors: PropTypes.object,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  bottomBarContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 12),
    marginTop: 8,
    color: CONSTANT_white,
  },
  chatStyle: {width: 22, height: 22, opacity: 0.4, marginTop: 4},
});

export default BottomBarWrapper(ExploreBottomBar);
