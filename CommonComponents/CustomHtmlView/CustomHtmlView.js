import React, { Component } from "react";
import constants from "../../constants/constants";
import HTMLView from "react-native-htmlview";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";
import { logError } from "../../Services/errorLogger/errorLogger";
import { Text } from "../../Screens/VoucherScreens/TransferVoucherScreen/TransferVoucher";
import { ViewPropTypes } from "react-native";

class CustomHtmlView extends Component {
  static propTypes = {
    html: PropTypes.string.isRequired,
    styleSheet: PropTypes.object,
    addLineBreaks: PropTypes.bool,
    containerStyle: ViewPropTypes.style.isRequired
  };

  state = {
    hasError: false
  };

  componentDidCatch(error, errorInfo) {
    this.setState(
      {
        hasError: true
      },
      () => {
        const { html } = this.props;
        logError("Invalid HTML data found", {
          error,
          errorInfo,
          html
        });
      }
    );
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    const {
      html,
      styleSheet = constants.htmlStyleSheet,
      addLineBreaks = true,
      containerStyle = {}
    } = this.props;
    let htmlMin = html.replace(/(\r\n|\n|\r)/gm, ""); // remove unnecessary line breaks
    if (
      htmlMin.includes("<li>") &&
      !(htmlMin.includes("<ul>") || htmlMin.includes("<ol>"))
    ) {
      // check if li tag has ul or ol tag to prevent crash
      htmlMin = `<ul>${htmlMin}</ul>`;
    }
    return (
      <HTMLView
        style={containerStyle}
        addLineBreaks={addLineBreaks}
        value={htmlMin}
        stylesheet={styleSheet}
      />
    );
  }
}

export default CustomHtmlView;
