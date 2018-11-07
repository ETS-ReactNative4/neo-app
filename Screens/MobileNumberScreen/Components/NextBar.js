import React from "react";
import { View, KeyboardAvoidingView } from "react-native";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const NextBar = ({ onClickNext }) => {
  return (
    <SimpleButton
      containerStyle={{
        height: 24,
        width: 52,
        alignSelf: "flex-end",
        marginHorizontal: 24
      }}
      text={"next"}
      action={onClickNext}
      textColor={constants.firstColor}
      underlayColor={"transparent"}
      color={"transparent"}
    />
  );
};

NextBar.propTypes = forbidExtraProps({
  onClickNext: PropTypes.func.isRequired
});

export default NextBar;
