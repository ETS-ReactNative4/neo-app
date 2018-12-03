import React, { Component } from "react";
import { logError } from "../../Services/errorLogger/errorLogger";
import { View } from "react-native";

const ErrorBoundary = WrappedComponent => {
  return class extends Component {
    static navigationOptions = WrappedComponent.navigationOptions;

    state = {
      isCrashed: false
    };

    componentDidCatch(error) {
      logError(error);
      if (!this.state.isCrashed) {
        this.setState({
          isCrashed: true
        });
      }
    }

    render() {
      if (this.state.isCrashed) {
        return <View style={{ flex: 1, backgroundColor: "red" }} />;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default ErrorBoundary;
