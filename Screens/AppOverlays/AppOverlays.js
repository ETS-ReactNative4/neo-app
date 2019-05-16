import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react/custom";
import FooterFeedbackPrompt from "../../CommonComponents/FooterFeedbackPrompt/FooterFeedbackPrompt";
import OverlayErrorBoundary from "./Components/OverlayErrorBoundary";

@inject("feedbackPrompt")
@inject("appState")
@observer
class AppOverlays extends Component {
  render() {
    const { isFeedbackFooterActive } = this.props.feedbackPrompt;
    const { isDrawerOpen } = this.props.appState;
    return (
      <Fragment>
        <OverlayErrorBoundary>
          {!isDrawerOpen && isFeedbackFooterActive ? (
            <FooterFeedbackPrompt />
          ) : (
            <Fragment />
          )}
        </OverlayErrorBoundary>
      </Fragment>
    );
  }
}

export default AppOverlays;
