import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../constants/constants";
import OptionsTile from "./OptionsTile";

const FilterOptions = ({ title, options, isVisible, onClose, onSelect }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modalContainer}
    >
      <View style={styles.filterView}>
        <Text style={styles.filterText}>{title}</Text>
        {options.map((option, optionIndex) => {
          return (
            <OptionsTile
              key={optionIndex}
              text={option.text}
              isSelected={option.isSelected}
              action={() => {
                onSelect(optionIndex);
                onClose();
              }}
            />
          );
        })}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  filterView: {
    width: responsiveWidth(100) - 48,
    backgroundColor: "white",
    borderRadius: 5
  },
  filterText: {
    ...constants.fontCustom(constants.primarySemiBold, 20),
    color: constants.black1,
    padding: 16
  }
});

FilterOptions.propTypes = forbidExtraProps({
  options: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
});

export default FilterOptions;
