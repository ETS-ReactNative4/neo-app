import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import Icon from "../../../CommonComponents/Icon/Icon";
import constants from "../../../constants/constants";

const AddStoryButton = ({ action = () => null, containerStyle = {} }) => {
  return (
    <TouchableOpacity
      onPress={action}
      style={[styles.addStoryButtonContainer, containerStyle]}
    >
      <View style={styles.iconContainer}>
        <Icon name={constants.addIcon} size={14} color={"white"} />
      </View>
      <Text style={styles.buttonText}>{"Add a new story"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addStoryButtonContainer: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  iconContainer: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: constants.firstColor,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    ...constants.fontCustom(constants.primaryRegular, 16, 16),
    color: constants.black1,
    marginLeft: 8,
    ...Platform.select({
      ios: {
        marginTop: 4
      }
    })
  }
});

AddStoryButton.propTypes = forbidExtraProps({
  action: PropTypes.func.isRequired,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
});

export default AddStoryButton;
