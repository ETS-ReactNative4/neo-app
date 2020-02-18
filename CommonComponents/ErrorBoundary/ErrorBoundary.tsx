import React, { Component, ReactNode } from "react";
import { logError } from "../../Services/errorLogger/errorLogger";
import CrashScreen from "../CrashScreen/CrashScreen";

export interface IErrorBoundaryComponentProps {
  navigation: object;
}

export interface IErrorBoundaryComponentState {
  isCrashed: boolean;
}

const ErrorBoundary = ({ isRoot }: { isRoot: boolean } = { isRoot: false }) => <
  P extends Object,
  S extends Object
>(
  WrappedComponent: ReactNode
): any => {
  return class ErrorBoundaryComponent extends Component<
    P & IErrorBoundaryComponentProps,
    IErrorBoundaryComponentState
  > {
    state = {
      isCrashed: false
    };

    componentDidCatch(error: Error, errorInfo: object) {
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
      // @ts-ignore
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default ErrorBoundary;
