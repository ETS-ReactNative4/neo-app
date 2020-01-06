import React, { Component, ComponentClass } from "react";
import { logError } from "../../Services/errorLogger/errorLogger";
import CrashScreen from "../CrashScreen/CrashScreen";

export interface IErrorBoundaryComponentProps {
  navigation: object;
}

export interface IErrorBoundaryComponentState {
  isCrashed: boolean;
}

export interface ComponentClassWithNavigation<P, S>
  extends ComponentClass<P, S> {
  navigationOptions: any;
}

const ErrorBoundary = ({ isRoot }: { isRoot: boolean } = { isRoot: false }) => <
  P extends Object,
  S extends Object
>(
  WrappedComponent: ComponentClassWithNavigation<P, S>
): any => {
  return class ErrorBoundaryComponent extends Component<
    P & IErrorBoundaryComponentProps,
    IErrorBoundaryComponentState
  > {
    public static navigationOptions = WrappedComponent.navigationOptions;

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
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default ErrorBoundary;
