import React from "react";
import constants from "../../constants/constants";
import CommonHeader from "../CommonHeader/CommonHeader";
import SimpleButton from "../SimpleButton/SimpleButton";
import MultiLineHeader from "../MultilineHeader/MultiLineHeader";
import PropTypes from "prop-types";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";

const ActionHeader = ({
  navigation,
  leftAction = () => null,
  rightAction = () => null,
  leftText = "",
  rightText = "",
  titleText = "",
  titleDesc = ""
}) => {
  return (
    <CommonHeader
      TitleComponent={
        titleDesc ? (
          <MultiLineHeader
            duration={titleDesc || ""}
            title={titleText || ""}
            disableDropDown={true}
          />
        ) : null
      }
      title={titleText || ""}
      navigation={navigation}
      leftAction={() => null}
      rightAction={() => null}
      LeftButton={
        <SimpleButton
          action={leftAction}
          text={leftText}
          textColor={constants.firstColor}
          color={"transparent"}
          textStyle={{ fontSize: 16 }}
          containerStyle={{ marginLeft: 24, width: 50, height: null }}
        />
      }
      RightButton={
        rightText ? (
          <SimpleButton
            action={rightAction}
            text={rightText}
            textColor={constants.firstColor}
            color={"transparent"}
            textStyle={{ fontSize: 16 }}
            containerStyle={{ marginRight: 24, width: 50, height: null }}
          />
        ) : null
      }
    />
  );
};

ActionHeader.propTypes = forbidExtraProps({
  navigation: PropTypes.object.isRequired,
  leftAction: PropTypes.func.isRequired,
  rightAction: PropTypes.func,
  leftText: PropTypes.string.isRequired,
  rightText: PropTypes.string,
  titleText: PropTypes.string.isRequired,
  titleDesc: PropTypes.string
});

export default ActionHeader;
