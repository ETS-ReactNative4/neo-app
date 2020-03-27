import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import BottomBarWrapper from "../../CommonComponents/BottomBarWrapper/BottomBarWrapper";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../constants/fonts";
import Icon from "../../CommonComponents/Icon/Icon";

/**
 * PT TODO: Typing unavailable for bottom bar hence the file is in js
 * Must be updated once typings are updated
 */
const PostBookingBottomBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.bottomBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key
          });
        };

        const color = isFocused
          ? options.activeTintColor
          : options.inactiveTintColor;
        const buttonContainerStyle = {
          backgroundColor: isFocused
            ? options.activeBackgroundColor
            : options.inactiveBackgroundColor
        };

        const icon = isFocused ? options.selectedIcon : options.icon;

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ["selected"] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.buttonContainer, buttonContainerStyle]}
          >
            <Icon name={icon} color={color} size={24} />
            <Text style={[styles.text, { color }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

PostBookingBottomBar.propTypes = {
  state: PropTypes.object,
  descriptors: PropTypes.object,
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  bottomBarContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent"
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 12),
    marginTop: 8
  }
});

export default BottomBarWrapper(PostBookingBottomBar);
