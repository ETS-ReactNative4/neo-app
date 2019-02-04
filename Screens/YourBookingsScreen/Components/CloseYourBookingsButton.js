import React from "react";
import { TouchableHighlight, Image, BackHandler, Platform } from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import Icon from "../../../CommonComponents/Icon/Icon";
import { recordEvent } from "../../../Services/analytics/analyticsService";

const CloseYourBookingsButton = ({ goBack }) => {
  return (
    <TouchableHighlight
      style={{ paddingHorizontal: 16 }}
      onPress={() => {
        recordEvent(constants.yourBookingsCloseButtonClick);
        goBack();
      }}
      underlayColor={"transparent"}
    >
      <Icon color={constants.black1} name={constants.closeIcon} size={24} />
    </TouchableHighlight>
  );
};

CloseYourBookingsButton.propTypes = {
  goBack: PropTypes.func.isRequired
};

export default CloseYourBookingsButton;
