import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react/custom";
import FooterFeedbackPrompt from "../../CommonComponents/FooterFeedbackPrompt/FooterFeedbackPrompt";

@inject("feedbackPrompt")
@observer
class AppOverlays extends Component {
  render() {
    return (
      <Fragment>
        <FooterFeedbackPrompt />
      </Fragment>
    );
  }
}

export default AppOverlays;
