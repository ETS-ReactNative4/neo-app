import React, { Component } from "react";
import { logError } from "../../Services/errorLogger/errorLogger";
import CrashScreen from "../CrashScreen/CrashScreen";

const ErrorBoundary = ({ isRoot } = {}) => WrappedComponent => {
  return class extends Component {
    static navigationOptions = WrappedComponent.navigationOptions;

    state = {
      isCrashed: false
    };

    componentDidCatch(error, errorInfo) {
      logError(error, { errorInfo });
      if (!this.state.isCrashed) {
        this.setState({
          isCrashed: true
        });
      }
    }

    render() {
      if (this.state.isCrashed) {
        return (
          <CrashScreen isRoot={isRoot} navigation={this.props.navigation} />
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default ErrorBoundary;
