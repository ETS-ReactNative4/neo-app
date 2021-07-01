import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import FooterFeedbackPrompt from "../../CommonComponents/FooterFeedbackPrompt/FooterFeedbackPrompt";
import OverlayErrorBoundary from "./Components/OverlayErrorBoundary";
import ForceUpdateModal from "./Components/ForceUpdateModal/ForceUpdateModal";
import PropTypes from "prop-types";
import DialogBox from "../../CommonComponents/DialogBox/DialogBox";

/**
 * This component has zIndex greater than the rest of the app and is
 * used to display overlays that appears over all the screens
 */
@inject("feedbackPrompt")
@inject("appState")
@inject("infoStore")
@observer
class AppOverlays extends Component {
  static propTypes = {
    feedbackPrompt: PropTypes.object,
    appState: PropTypes.object,
    infoStore: PropTypes.object
  };

  render() {
    const { isFeedbackFooterActive } = this.props.feedbackPrompt;
    const { infoStore } = this.props;
    const { isDrawerOpen } = this.props.appState;
    // console.log(infoStore.success)
    return (
      <Fragment>
        <OverlayErrorBoundary>
          {!isDrawerOpen && isFeedbackFooterActive ? (
            <FooterFeedbackPrompt />
          ) : (
            <Fragment />
          )}
          <ForceUpdateModal />
          <DialogBox
            {...infoStore.info}
            onClose={() => {
              infoStore.info.action && infoStore.info.action();
              infoStore.resetInfo();
            }}
          />
          <DialogBox
            {...infoStore.error}
            onClose={() => {
              infoStore.error.action && infoStore.error.action();
              infoStore.resetError();
            }}
          />
          <DialogBox
            {...infoStore.success}
            onClose={() => {
              infoStore.success.action && infoStore.success.action();
              infoStore.resetSuccess();
            }}
          />
        </OverlayErrorBoundary>
      </Fragment>
    );
  }
}

export default AppOverlays;
