import React from "react";
import {
  View,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView
} from "react-native";
import {
  CONSTANT_white,
  CONSTANT_shade2,
  CONSTANT_shade5,
  CONSTANT_black1
} from "../../constants/colorPallete";
import Icon from "../../CommonComponents/Icon/Icon";
import {
  CONSTANT_primaryRegular,
  CONSTANT_fontCustom
} from "../../constants/fonts";

const menuList = [
  {
    name: "Trip mode",
    iconName: "heart1",
    active: true
  },
  {
    name: "Payments",
    iconName: "heart1",
    active: false
  },
  {
    name: "Explore trips",
    iconName: "heart1",
    active: false
  },
  {
    name: "My Saved Itineraries",
    iconName: "heart1",
    active: false
  },
  {
    name: "My Traveller Profile",
    iconName: "heart1",
    active: false
  },
  {
    name: "My Booking History",
    iconName: "heart1",
    active: false
  },
  {
    name: "About",
    iconName: "heart1",
    active: false
  }
];

interface UltimateMenuProps {
  containerStyle?: ViewStyle;
}

const UltimateMenu = ({ containerStyle }: UltimateMenuProps) => {
  return (
    <View style={[styles.ultimateMenuContainerStyle, containerStyle]}>
      <View style={styles.headerContainer} />
      <View style={styles.bodyContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {menuList.map((item, itemIndex) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => Alert.alert(`Click -> ${item.name}`)}
                style={styles.menuListStyle}
                key={itemIndex}
              >
                <View style={styles.leftColStyle}>
                  <Icon
                    name={item.iconName}
                    size={20}
                    color={
                      item.active ? "rgba(34, 156, 116, 1)" : CONSTANT_shade2
                    }
                  />
                </View>

                <View style={styles.rightColStyle}>
                  <Text
                    style={[
                      styles.menuListTextStyle,
                      item.active ? styles.activeTextColor : null
                    ]}
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ultimateMenuContainerStyle: {
    flex: 1
  },
  headerContainer: {
    backgroundColor: "rgba(34, 156, 116, 1)",
    height: 216
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: CONSTANT_white,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    marginTop: -24
  },

  menuListStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 32
  },
  leftColStyle: {
    marginTop: -4,
    marginRight: 24
  },
  rightColStyle: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: CONSTANT_shade5,
    minHeight: 72
  },
  menuListTextStyle: {
    flex: 1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16, 20),
    color: CONSTANT_black1
  },
  activeTextColor: {
    color: "rgba(0, 178, 119, 1)"
  }
});

export default UltimateMenu;
