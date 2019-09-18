import React, { Component, Fragment, useEffect } from "react";

class ActionSheet extends Component {
  render() {
    const ViewComponents = this.props.navigation.getParam(
      "viewComponent",
      ({ navigation }) => {
        useEffect(() => {
          navigation.goBack();
        });
        return <Fragment />;
      }
    );
    return <ViewComponents navigation={this.props.navigation} />;
  }
}

export default ActionSheet;
