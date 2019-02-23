import React from "react";
import {
  TouchableHighlight,
  View,
  StyleSheet,
  Image,
  Text
} from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";

const DrawerButton = ({ icon, text, action, info, isActive }) => {
  return (
    <TouchableHighlight
      style={[
        styles.buttonContainer,
        isActive
          ? {
              backgroundColor: "rgba(0,0,0,0.2)"
            }
          : {}
      ]}
      onPress={action}
      underlayColor={isActive ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.2)"}
    >
      <View style={styles.buttonView}>
        <View style={styles.iconContainer}>
          <Icon
            name={icon}
            size={24}
            color={isActive ? "white" : "rgba(255,255,255,0.8)"}
          />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.menuName,
              isActive ? { color: "white" } : { color: "rgba(255,255,255,0.8)" }
            ]}
          >
            {text}
          </Text>
        </View>

        <View style={styles.infoArea}>{info}</View>
      </View>
    </TouchableHighlight>
  );
};

DrawerButton.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  info: PropTypes.element,
  isActive: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 48
  },
  buttonView: {
    flex: 1,
    flexDirection: "row"
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8
  },
  icon: {
    height: 24,
    width: 24
  },
  textContainer: {
    flex: 5,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  menuName: {
    ...constants.fontCustom(constants.primarySemiBold, 17),
    paddingLeft: 8,
    marginTop: 4
  },
  infoArea: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default DrawerButton;
