import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes,
  Text
} from "react-native";
import PropTypes from "prop-types";
import Icon from "../../../../CommonComponents/Icon/Icon";
import constants from "../../../../constants/constants";

const VoucherButton = ({
  containerStyle = StyleSheet.create({}),
  cta = "",
  action = () => null,
  isLast = false
}) => {
  return (
    <TouchableOpacity
      onPress={action}
      style={[
        styles.voucherButtonContainer,
        !isLast ? styles.buttonBorder : {},
        containerStyle
      ]}
      activeOpacity={0.8}
    >
      <Text style={styles.ctaText}>{cta}</Text>
      <Icon
        name={constants.arrowRight}
        size={12}
        color={constants.firstColor}
      />
    </TouchableOpacity>
  );
};

VoucherButton.propTypes = {
  containerStyle: ViewPropTypes.style,
  cta: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  isLast: PropTypes.bool
};

const styles = StyleSheet.create({
  voucherButtonContainer: {
    paddingVertical: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  buttonBorder: {
    borderBottomWidth: 1,
    borderBottomColor: constants.shade5
  },
  ctaText: {
    ...constants.fontCustom(constants.primarySemiBold, 14),
    color: constants.firstColor
  }
});

export default VoucherButton;
