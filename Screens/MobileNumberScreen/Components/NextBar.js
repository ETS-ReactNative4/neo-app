import React from "react";
import { View, KeyboardAvoidingView } from "react-native";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import { recordEvent } from "../../../Services/analytics/analyticsService";

const NextBar = ({ onClickNext }) => {
  return (
    <SimpleButton
      containerStyle={{
        height: 40,
        width: 160,
        marginRight: 24,
        alignSelf: "flex-end"
      }}
      text={"next"}
      action={() => {
        recordEvent(constants.mobileNumberNextClick);
        onClickNext();
      }}
      textColor={"white"}
      underlayColor={constants.firstColorAlpha(0.3)}
      color={constants.firstColor}
    />
  );
};

NextBar.propTypes = forbidExtraProps({
  onClickNext: PropTypes.func.isRequired
});

export default NextBar;
