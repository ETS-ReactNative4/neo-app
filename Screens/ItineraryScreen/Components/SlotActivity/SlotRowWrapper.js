import { Component } from "react";
import { logError } from "../../../../Services/errorLogger/errorLogger";
import PropTypes from "prop-types";

/**
 * Will catch any errors that prevent a slot from rendering
 * and hides the slot completely.
 */
class SlotRowWrapper extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]).isRequired,
    data: PropTypes.object.isRequired
  };

  state = {
    hasError: false
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true
    });
    logError(error, {
      type: "Failed to render itinerary view slot row",
      errorInfo,
      slotData: this.props.data
    });
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export default SlotRowWrapper;
