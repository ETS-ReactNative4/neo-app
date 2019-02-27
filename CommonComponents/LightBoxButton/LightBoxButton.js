import React, { Component } from "react";
import Lightbox from "react-native-lightbox";
import SimpleButton from "../SimpleButton/SimpleButton";
import PropTypes from "prop-types";

class LightBoxButton extends Component {
  static propTypes = {
    LightBoxComponent: PropTypes.func.isRequired,
    ...SimpleButton.propTypes
  };

  state = {
    isClosing: false
  };

  willClose = () => {
    this.setState({
      isClosing: true
    });
  };

  onOpen = () => {
    this.setState({
      isClosing: false
    });
  };

  render() {
    const { isClosing } = this.state;
    const { LightBoxComponent, ...otherProps } = this.props;
    return (
      <Lightbox
        springConfig={{ tension: 900000, friction: 900000 }}
        onOpen={this.onOpen}
        willClose={this.willClose}
        swipeToDismiss={false}
        underlayColor={"transparent"}
        renderContent={isClosing ? () => null : LightBoxComponent}
      >
        <SimpleButton {...otherProps} lightBoxMode={true} />
      </Lightbox>
    );
  }
}

export default LightBoxButton;
