import React, { Component, Fragment, useEffect } from "react";

/**
 * This component accepts a `viewComponent` as param
 * If `viewComponent` is not present, it will render an empty fragment which will
 * automatically closes the ActionSheet
 */
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
