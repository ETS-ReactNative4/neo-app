import React from "react";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import Icon from "../../../CommonComponents/Icon/Icon";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";

const TicketTile = ({ action, containerStyle }) => {
  if (!containerStyle) containerStyle = {};
  return (
    <TouchableOpacity
      onPress={action}
      style={[styles.ticketTileContainer, containerStyle]}
    >
      <Text style={styles.ticketTileText}>{"Your tickets"}</Text>
      <View style={styles.iconContainer}>
        <Icon name={constants.arrowRight} color={constants.shade2} size={16} />
      </View>
    </TouchableOpacity>
  );
};

TicketTile.propTypes = forbidExtraProps({
  action: PropTypes.func.isRequired
});

const styles = StyleSheet.create({
  ticketTileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    borderWidth: 2,
    borderColor: constants.firstColor,
    borderRadius: 5,
    backgroundColor: "rgba(47,209,93,0.1)",
    paddingHorizontal: 14
  },
  ticketTileText: {
    ...constants.fontCustom(constants.primaryLight, 17),
    color: constants.black2,
    ...Platform.select({
      ios: {
        marginTop: 8
      }
    })
  }
});

TicketTile.propTypes = forbidExtraProps({
  action: PropTypes.func.isRequired
});

export default TicketTile;
