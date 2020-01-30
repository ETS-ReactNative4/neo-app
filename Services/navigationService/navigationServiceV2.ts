import {
  NavigationActions,
  NavigationContainerComponent,
  NavigationAction
} from "react-navigation";

/**
 * External Navigation Reference for the screens based on
 * https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
 */

let _navigator: NavigationContainerComponent | null;

const navigatorTypeGuard = (
  navigator: NavigationContainerComponent | null
): navigator is NavigationContainerComponent => {
  return !!navigator;
};

const setTopLevelNavigator = (
  navigatorRef: NavigationContainerComponent
): void => {
  _navigator = navigatorRef;
};

const navigate = (routeName: string, params: object = {}): void => {
  if (navigatorTypeGuard(_navigator)) {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params
      })
    );
  }
};

const dispatcher = (action: NavigationAction) => {
  if (navigatorTypeGuard(_navigator)) {
    _navigator.dispatch(action);
  }
};

const navigationServiceV2 = {
  navigate,
  setTopLevelNavigator,
  dispatcher
};

export default navigationServiceV2;
