import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react/custom";
import FooterFeedbackPrompt from "../../CommonComponents/FooterFeedbackPrompt/FooterFeedbackPrompt";
import OverlayErrorBoundary from "./Components/OverlayErrorBoundary";

/**
 * This component has zIndex greater than the rest of the app and is
 * used to display overlays that appears over all the screens
 */
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
