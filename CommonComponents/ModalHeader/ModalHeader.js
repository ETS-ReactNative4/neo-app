import React from "react";
import { Text, TouchableHighlight, View, StyleSheet } from "react-native";
import Icon from "../Icon/Icon";
import constants from "../../constants/constants";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";

const ModalHeader = ({
  containerStyle = {},
  leftIcon = constants.closeIcon,
  leftButtonAction = () => null,
  rightIcon = "",
  rightButtonAction = () => null,
  title = ""
}) => {
  return (
    <View style={[styles.header, containerStyle]}>
      <TouchableHighlight
        style={styles.icon}
        underlayColor={"transparent"}
        onPress={leftButtonAction}
      >
        <Icon size={24} name={leftIcon} color={constants.black1} />
      </TouchableHighlight>
      <View style={styles.headingArea}>
        <Text style={styles.headingText}>{title}</Text>
      </View>
      {rightIcon ? (
        <TouchableHighlight style={styles.icon}>
          <Icon style={24} name={rightIcon} color={constants.black1} />
        </TouchableHighlight>
      ) : null}
    </View>
  );
};

ModalHeader.propTypes = forbidExtraProps({
  leftIcon: PropTypes.string.isRequired,
  leftButtonAction: PropTypes.func.isRequired,
  rightIcon: PropTypes.string,
  rightButtonAction: PropTypes.func,
  title: PropTypes.string.isRequired,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
});

const styles = StyleSheet.create({
  header: {
    height: 32,
    marginVertical: 32,
    flexDirection: "row",
    alignItems: "center"
  },
  headingArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headingText: {
    ...constants.font20(constants.primarySemiBold)
  },
  icon: {
    height: 24,
    width: 24
  }
});

export default ModalHeader;
