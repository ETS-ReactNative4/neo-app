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
              backgroundColor: constants.firstColorBackground
            }
          : {}
      ]}
      onPress={action}
      underlayColor={isActive ? "transparent" : constants.shade4}
    >
      <View style={styles.buttonView}>
        <View style={styles.iconContainer}>
          <Icon
            name={icon}
            size={24}
            color={isActive ? constants.firstColor : constants.shade4}
          />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.menuName,
              isActive
                ? { color: constants.firstColor }
                : { color: constants.black2 }
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
    marginLeft: 24,
    marginRight: 18
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
    ...constants.fontCustom(constants.primaryRegular, 15),
    marginTop: 4
  },
  infoArea: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default DrawerButton;
