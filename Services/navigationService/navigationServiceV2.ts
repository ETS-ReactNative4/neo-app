import { NavigationContainerRef } from "@react-navigation/native";

/**
 * External Navigation Reference for the screens based on
 * Official React Navigation V5 docs
 * https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
 */

export interface INavigationObject {
  navigator?: React.MutableRefObject<NavigationContainerRef>;
}

const navigationObject: INavigationObject = {};

export const updateNavigationService = (
  navRef: React.MutableRefObject<NavigationContainerRef>
) => {
  navigationObject.navigator = navRef;
};

const navigationServiceV2 = (name: string, params: object) => {
  const { navigator } = navigationObject;
  navigator?.current?.navigate(name, params);
};

export default navigationServiceV2;
