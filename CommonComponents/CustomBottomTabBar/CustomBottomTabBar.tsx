import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Text
} from "react-native";
import { BottomTabBarProps } from "react-navigation-tabs/lib/typescript/src/types";
import constants from "../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";
import { inject, observer } from "mobx-react/custom";
import ChatDetails from "../../mobx/ChatDetails";
import { openChat } from "../../Services/freshchatService/freshchatService";

export interface CustomBottomTabBarProps {
  containerStyle?: ViewStyle;
  bottomTabBarProps: BottomTabBarProps;
  chatDetailsStore: ChatDetails;
}

/**
 * Custom bottom bar for rendering post trip booking home page tabs
 * This component is built re-using all the bottom tab navigator props.
 * Reference - https://dev.to/hrastnik/lets-create-a-custom-animated-tab-bar-with-react-native-3496
 *
 * This tab bar will open freshchat when support icon is pressed and user has active chat support enabled.
 *
 * Important Note:
 * Currently this tab bar is only used in the post booking app home screen. These screens do not have keyboard inputs.
 * This tab bar will appear above the keyboard if keyboard inputs are introduced, hence this will be wrapped inside
 * `KeyboardFriendlyBottomTabBar` component before it is used. (only on Android)
 */
const CustomBottomTabBar = ({
  containerStyle = StyleSheet.create({}),
  bottomTabBarProps,
  chatDetailsStore
}: CustomBottomTabBarProps) => {
  const {
    renderIcon,
    getLabelText,
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation
  } = bottomTabBarProps;

  const { routes, index: activeRouteIndex } = navigation.state;

  const { isChatActive } = chatDetailsStore;

  return (
    <View style={[styles.customBottomTabBarContainer, containerStyle]}>
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
        let tabPressAction = () => onTabPress({ route });
        let tabLongPressAction = () => onTabLongPress({ route });

        /**
         * Check if user is on support screen & chat is active
         */
        if (getLabelText({ route }) === "Support" && isChatActive) {
          tabPressAction = () => openChat();
          tabLongPressAction = () => openChat();
        }

        return (
          <TouchableOpacity
            key={routeIndex}
            style={{}}
            onPress={tabPressAction}
            onLongPress={tabLongPressAction}
            accessibilityLabel={getAccessibilityLabel({ route })}
          >
            {renderIcon({ route, focused: isRouteActive, tintColor })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export interface CustomBottomTabBarStyles {
  customBottomTabBarContainer: ViewStyle;
}

const styles = StyleSheet.create<CustomBottomTabBarStyles>({
  customBottomTabBarContainer: {
    height: constants.tabBarBottomHeight,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: constants.shade3,
    paddingBottom: isIphoneX() ? constants.xSensorAreaHeight : 0
  }
});

export default inject("chatDetailsStore")(observer(CustomBottomTabBar));
