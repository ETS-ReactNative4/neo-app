import React from "react";
import { View, StyleSheet } from "react-native";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../constants/constants";
import directions from "../../../Services/directions/directions";
import dialer from "../../../Services/dialer/dialer";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const doesContainNumber = contact => /\d/.test(contact);

const VoucherContactActionBar = ({ contact, location = {} }) => {
  const { lat, lon } = location;
  return (
    <View style={styles.actionRow}>
      {lat && lon ? (
        <SimpleButton
          text={"Directions"}
          containerStyle={
            doesContainNumber(contact)
              ? { width: responsiveWidth(43), marginRight: 16 }
              : { width: responsiveWidth(100) - 48 }
          }
          action={() => directions({ latitude: lat, longitude: lon })}
          color={"transparent"}
          textColor={constants.firstColor}
          hasBorder={true}
          icon={constants.compassIcon}
          iconSize={16}
        />
      ) : null}
      {doesContainNumber(contact) ? (
        <SimpleButton
          text={"Contact"}
          containerStyle={
            lat && lon
              ? { width: responsiveWidth(43) }
              : { width: responsiveWidth(100) - 48 }
          }
          action={() => dialer(contact)}
          color={"transparent"}
          textColor={constants.firstColor}
          hasBorder={true}
          icon={constants.callIcon}
          iconSize={16}
        />
      ) : null}
    </View>
  );
};

VoucherContactActionBar.propTypes = forbidExtraProps({
  contact: PropTypes.number,
  location: PropTypes.shape({
    lat: PropTypes.string.isRequired,
    lon: PropTypes.string.isRequired
  })
});

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade4
  }
});

export default VoucherContactActionBar;
