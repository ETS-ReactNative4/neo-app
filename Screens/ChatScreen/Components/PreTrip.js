import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import constants from "../../../constants/constants";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import moment from "moment";

const PreTrip = ({ action, chatActivationMessage }) => {
  return (
    <View style={styles.preTripContainer}>
      <Image
        source={constants.preChatSupportIllus}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.message}>{chatActivationMessage}</Text>
      <SimpleButton
        containerStyle={{ marginTop: 8, width: 192 }}
        text={"Visit Help Desk"}
        action={action}
        textColor={"white"}
      />
    </View>
  );
};

PreTrip.propTypes = forbidExtraProps({
  action: PropTypes.func.isRequired,
  chatActivationMessage: PropTypes.string.isRequired
});

const styles = StyleSheet.create({
  preTripContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24
  },
  image: {
    width: responsiveWidth(60),
    maxWidth: 200
  },
  message: {
    ...constants.fontCustom(constants.primaryLight, 15, 18),
    color: constants.black2,
    textAlign: "center"
  }
});

export default PreTrip;
