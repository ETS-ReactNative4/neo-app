import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react/custom";
import FooterFeedbackPrompt from "../../CommonComponents/FooterFeedbackPrompt/FooterFeedbackPrompt";
import OverlayErrorBoundary from "./Components/OverlayErrorBoundary";

@inject("feedbackPrompt")
@observer
class AppOverlays extends Component {
  render() {
    const { isFeedbackFooterActive } = this.props.feedbackPrompt;
    return (
      <Fragment>
        <OverlayErrorBoundary>
          {isFeedbackFooterActive ? <FooterFeedbackPrompt /> : null}
        </OverlayErrorBoundary>
      </Fragment>
    );
  }
}

export default AppOverlays;
