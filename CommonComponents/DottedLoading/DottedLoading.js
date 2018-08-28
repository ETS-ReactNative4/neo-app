import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";

class DottedLoading extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    numOfDots: PropTypes.number.isRequired,
    textStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
  };

  state = {
    dots: ""
  };
  _interval = {};

  componentDidMount() {
    this._interval = setInterval(() => {
      if (this.state.dots.length < this.props.numOfDots) {
        this.setState({
          dots: this.state.dots + "."
        });
      } else {
        this.setState({ dots: "" });
      }
    }, 100);
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
