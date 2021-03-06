import React from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import openCustomTab from "../../../Services/openCustomTab/openCustomTab";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../constants/constants";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import { isIphoneX } from "react-native-iphone-x-helper";

const ViewVoucherButton = ({
  containerStyle = {},
  title = "View Voucher",
  voucherUrl
}) => {
  /**
   * TODO: Disabled this button. Will be enabled after confirming new UI
   */
  return null;
  if (!voucherUrl) return null;

  if (Platform.OS === "android") {
    voucherUrl = constants.googleDrivePdfViewer + voucherUrl;
  }

  const viewVoucher = () => openCustomTab(voucherUrl);

  return (
    <SimpleButton
      text={title}
      underlayColor={constants.firstColorAlpha(0.7)}
      action={viewVoucher}
      containerStyle={[
        {
          height: 40,
          width: responsiveWidth(100) - 48,
          marginBottom: isIphoneX() ? constants.xSensorAreaHeight + 16 : 16
        },
        containerStyle
      ]}
      textColor={"white"}
    />
  );
};

ViewVoucherButton.propTypes = forbidExtraProps({
  containerStyle: PropTypes.object,
  title: PropTypes.string,
  voucherUrl: PropTypes.string
});

export default ViewVoucherButton;
