import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import Icon from "../../../CommonComponents/Icon/Icon";
import constants from "../../../constants/constants";

const ForexAmountField = ({ selectedCurrency = "" }) => {
  return (
    <View>
      <View style={styles.countryCodeTextWrapper}>
        <Text style={styles.countryCodeText}>{selectedCurrency}</Text>
      </View>
      <View style={styles.dropDownIconContainer}>
        <Icon name={constants.arrowDown} color={constants.shade2} size={8} />
      </View>
      <View />
    </View>
  );
};

ForexAmountField.propTypes = {};

export default ForexAmountField;
