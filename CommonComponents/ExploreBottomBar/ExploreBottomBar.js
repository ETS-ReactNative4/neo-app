import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import {
  CONSTANT_bottomBarHeight,
  CONSTANT_xSensorAreaHeight
} from "../../constants/styles";
import BottomBarWrapper from "../BottomBarWrapper/BottomBarWrapper";
import Icon from "../Icon/Icon";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../constants/fonts";
import { CONSTANT_white } from "../../constants/colorPallete";

/**
 * PT TODO: Typing unavailable for bottom bar hence the file is in js
 * Must be updated once typings are updated
 */
const ExploreBottomBar = ({ state, descriptors, navigation }) => {
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

        return (
          <TouchableOpacity
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ["selected"] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.buttonContainer, buttonContainerStyle]}
          >
            <Icon name={options.icon} color={color} size={24} />
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
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  bottomBarContainer: {
    flexDirection: "row",
    height: CONSTANT_bottomBarHeight + CONSTANT_xSensorAreaHeight,
    backgroundColor: "transparent"
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 12),
    marginTop: 8,
    color: CONSTANT_white
  }
});

export default BottomBarWrapper(ExploreBottomBar);
