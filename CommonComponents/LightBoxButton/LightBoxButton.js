import React from "react";
import Lightbox from "react-native-lightbox";
import SimpleButton from "../SimpleButton/SimpleButton";
import PropTypes from "prop-types";

const LightBoxButton = ({ LightBoxComponent, ...otherProps }) => {
  return (
    <Lightbox underlayColor={"transparent"} renderContent={LightBoxComponent}>
      <SimpleButton {...otherProps} lightBoxMode={true} />
    </Lightbox>
  );
};

LightBoxButton.propTypes = {
  LightBoxComponent: PropTypes.func.isRequired,
  ...SimpleButton.propTypes
};

export default LightBoxButton;
