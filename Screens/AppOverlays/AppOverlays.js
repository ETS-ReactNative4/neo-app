import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react/custom";
import FooterFeedbackPrompt from "../../CommonComponents/FooterFeedbackPrompt/FooterFeedbackPrompt";

@inject("feedbackPrompt")
@observer
class AppOverlays extends Component {
  render() {
    const { isFeedbackFooterActive } = this.props.feedbackPrompt;
    return (
      <Fragment>
        {isFeedbackFooterActive ? <FooterFeedbackPrompt /> : null}
      </Fragment>
    );
  }
}

export default AppOverlays;
