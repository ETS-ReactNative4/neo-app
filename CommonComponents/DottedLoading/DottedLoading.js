import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";

class DottedLoading extends Component {
  static propTypes = forbidExtraProps({
    text: PropTypes.string.isRequired,
    numOfDots: PropTypes.number.isRequired,
    textStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    animationSpeed: PropTypes.number
  });

  state = {
    dots: ""
  };
  _interval = {};

  componentDidMount() {
    const { animationSpeed = 100 } = this.props;
    this._interval = setInterval(() => {
      if (this.state.dots.length < this.props.numOfDots) {
        this.setState({
          dots: this.state.dots + "."
        });
      } else {
        this.setState({ dots: "" });
      }
    }, animationSpeed);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    let { textStyle, text } = this.props;
    if (!textStyle) textStyle = {};
    return <Text style={textStyle}>{`${text}${this.state.dots}`}</Text>;
  }
}

export default DottedLoading;
