import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import constants from "../../../constants/constants";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";

const PreTrip = ({ action }) => {
  return (
    <View style={styles.preTripContainer}>
      <Text style={styles.message}>
        {
          "Chat will be enabled 48hrs prior to your trip. Meanwhile, please visit our support center if you have questions or clarifications."
        }
      </Text>
      <SimpleButton
        containerStyle={{ marginTop: 8, width: 192 }}
        text={"Visit support center"}
        action={action}
        textColor={"white"}
      />
    </View>
  );
};

PreTrip.propTypes = forbidExtraProps({
  action: PropTypes.func.isRequired
});

const styles = StyleSheet.create({
  preTripContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24
  },
  message: {
    ...constants.fontCustom(constants.primaryLight, 15, 18),
    color: constants.black2,
    textAlign: "center"
  }
});

export default PreTrip;
