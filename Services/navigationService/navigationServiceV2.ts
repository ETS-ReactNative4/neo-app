import {NavigationContainerRef, CommonActions} from '@react-navigation/native';

export interface INavigationObject {
  navigator?: React.MutableRefObject<NavigationContainerRef>;
}

const navigationObject: INavigationObject = {};

export const updateNavigationService = (
  navRef: React.MutableRefObject<NavigationContainerRef>,
) => {
  navigationObject.navigator = navRef;
};

export const navigationDispatcher = (action: CommonActions.Action) => {
  const {navigator} = navigationObject;
  navigator?.current?.dispatch(action);
};

/**
 * External Navigation Reference for the screens based on
 * Official React Navigation V5 docs
 * https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
 */
const navigationServiceV2 = (name: string, params: object = {}) => {
  const {navigator} = navigationObject;
  navigator?.current?.navigate(name?.trim(), params);
};

export default navigationServiceV2;
