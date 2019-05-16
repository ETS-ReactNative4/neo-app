import React, { Component } from "react";
import { logError } from "../../../Services/errorLogger/errorLogger";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";

class OverlayErrorBoundary extends Component {
  static propTypes = forbidExtraProps({
    children: PropTypes.node.isRequired
  });

  state = {
    isCrashed: false
  };

  componentDidCatch(error, errorInfo) {
    logError(error, { errorInfo });
    if (!this.state.isCrashed) {
      this.setState({
        isCrashed: true
      });
    }
  }

  render() {
    if (this.state.isCrashed) {
      return null;
    }
    return this.props.children;
  }
}

export default OverlayErrorBoundary;
