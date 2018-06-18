import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Icon from "../../../../../CommonComponents/Icon/Icon";
import constants from "../../../../../constants/constants";

const CheckListButtons = ({
  id,
  item,
  isComplete,
  type,
  deleteCheckListItem
}) => {
  return (
    <TouchableOpacity
      style={styles.checklistButtonContainer}
      onPress={() => deleteCheckListItem({ id, item, isComplete, type })}
      activeOpacity={0.5}
    >
      <Icon name={constants.trainIcon} size={18} color={"white"} />
    </TouchableOpacity>
  );
};

CheckListButtons.propTypes = {
  id: PropTypes.number.isRequired,
  item: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  deleteCheckListItem: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  checklistButtonContainer: {
    backgroundColor: constants.thirdColor,
    flex: 1,
    justifyContent: "center",
    paddingLeft: 24
  }
});

export default CheckListButtons;
