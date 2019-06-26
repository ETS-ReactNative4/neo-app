import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const ImagePermissionDenied = ({ action = () => null }) => {
  return (
    <View style={styles.imagePermissionDeniedContainer}>
      <Text style={styles.infoText}>
        {constants.journalFailureMessages.userDeniedImagePermission}
      </Text>
      <SimpleButton
        text={"Go To Settings"}
        textColor={constants.themeDarkBlue}
        color={"transparent"}
        underlayColor={"transparent"}
        icon={constants.editIcon}
        iconSize={14}
        action={action}
      />
    </View>
  );
};

ImagePermissionDenied.propTypes = forbidExtraProps({
  action: PropTypes.func.isRequired
});

const styles = StyleSheet.create({
  imagePermissionDeniedContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  infoText: {
    textAlign: "center",
    marginHorizontal: 24,
    marginVertical: 24,
    ...constants.fontCustom(constants.primaryRegular, 14, 20),
    color: constants.black1
  }
});

export default ImagePermissionDenied;
