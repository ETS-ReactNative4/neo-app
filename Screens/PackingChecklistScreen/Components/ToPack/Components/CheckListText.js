import React from "react";
import PropTypes from "prop-types";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform
} from "react-native";
import constants from "../../../../../constants/constants";
import Icon from "../../../../../CommonComponents/Icon/Icon";

const CheckListText = ({
  id,
  item,
  isComplete,
  type,
  toggleCheckListStatus
}) => {
  return (
    <TouchableOpacity
      style={styles.touchableContainer}
      activeOpacity={1}
      onPress={() => toggleCheckListStatus({ id, item, isComplete, type })}
    >
      <Icon name={constants.trainIcon} size={16} color={constants.shade5} />
      <Text
        style={[styles.textBox, isComplete ? styles.textBoxComplete : null]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
};

CheckListText.propTypes = {
  id: PropTypes.number.isRequired,
  item: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  toggleCheckListStatus: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  touchableContainer: {
    minHeight: 24,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white"
  },
  textBox: {
    marginLeft: 16,
    ...Platform.select({
      ios: {
        marginTop: 6
      }
    }),
    ...constants.fontCustom(constants.primaryLight, 17),
    color: constants.black2
  },
  textBoxComplete: {
    textDecorationLine: "line-through"
  }
});

export default CheckListText;
