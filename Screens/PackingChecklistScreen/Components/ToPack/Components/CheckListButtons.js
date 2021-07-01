import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Icon from "../../../../../CommonComponents/Icon/Icon";
import constants from "../../../../../constants/constants";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";

const CheckListButtons = ({ id, item, isComplete, type, deleteListItem }) => {
  return (
    <TouchableOpacity
      style={styles.checklistButtonContainer}
      onPress={() => {
        recordEvent(constants.PackingChecklist.event, {
          click: constants.PackingChecklist.click.removeItem
        });
        deleteListItem(item);
      }}
      activeOpacity={0.5}
    >
      <Icon name={constants.trashCanIcon} size={18} color={"white"} />
    </TouchableOpacity>
  );
};

CheckListButtons.propTypes = forbidExtraProps({
  id: PropTypes.number.isRequired,
  item: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  deleteListItem: PropTypes.func.isRequired
});

const styles = StyleSheet.create({
  checklistButtonContainer: {
    backgroundColor: constants.thirdColor,
    flex: 1,
    justifyContent: "center",
    paddingLeft: 24
  }
});

export default CheckListButtons;
