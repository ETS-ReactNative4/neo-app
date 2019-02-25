import React, { Component } from "react";
import constants from "../../constants/constants";
import HTMLView from "react-native-htmlview";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";
import { logError } from "../../Services/errorLogger/errorLogger";
import { Text } from "../../Screens/VoucherScreens/TransferVoucherScreen/TransferVoucher";

class CustomHtmlView extends Component {
  static propTypes = forbidExtraProps({
    html: PropTypes.string.isRequired,
    styleSheet: PropTypes.object,
    addLineBreaks: PropTypes.bool,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
      .isRequired
  });

  state = {
    hasError: false,
    isUlWrapped: false
  };

  componentDidCatch(error, errorInfo) {
    if (!this.state.isUlWrapped) {
      this.setState({
        isUlWrapped: true
      });
    } else {
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
  }

  render() {
    if (this.state.hasError) return null;
    const {
      html,
      styleSheet = constants.htmlStyleSheet,
      addLineBreaks = true,
      containerStyle = {}
    } = this.props;
    const htmlMin = html.replace(/(\r\n|\n|\r)/gm, "");
    const { isUlWrapped } = this.state;
    return (
      <HTMLView
        style={containerStyle}
        addLineBreaks={addLineBreaks}
        value={isUlWrapped ? `<ul>${htmlMin}</ul>` : htmlMin}
        stylesheet={styleSheet}
      />
    );
  }
}

export default CustomHtmlView;
