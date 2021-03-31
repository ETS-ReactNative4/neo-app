import React, {useEffect} from 'react';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  SCREEN_EXPLORE_TAB,
  SCREEN_SEARCH_TAB,
  SCREEN_NOTIFICATION_TAB,
  SCREEN_DEALS_TAB,
  SCREEN_SEARCH_LISTING_CARDS_PAGE,
  SCREEN_PRETRIP_HOME_TABS,
} from './ScreenNames';
import Explore, {
  ExploreScreenSourcesType,
} from '../Screens/ExploreScreen/Explore';
import ExploreBottomBar from '../CommonComponents/ExploreBottomBar/ExploreBottomBar';
import {
  CONSTANT_compassIcon,
  CONSTANT_searchIcon,
  CONSTANT_notificationBellIcon,
  CONSTANT_dealsIcon,
} from '../constants/imageAssets';
import Notifications from '../Screens/NotificationsScreen/Notifications';
import DealsListing from '../Screens/DealsListingScreen/DealsListing';
import {observer, inject} from 'mobx-react';
import DeviceLocale from '../mobx/DeviceLocale';
import SearchV2 from '../Screens/SearchV2/Search';
import deepLink from '../Services/deepLink/deepLink';
import {RouteProp} from '@react-navigation/native';
import {AppNavigatorParamsType} from './AppNavigator';

export interface IExplorePageScreenData {
  source?: ExploreScreenSourcesType;
}
interface SearchListingCards {
  searchString: string;
}
export type PreTripHomeTabsType = {
  [SCREEN_EXPLORE_TAB]: IExplorePageScreenData;
  [SCREEN_SEARCH_TAB]: undefined;
  [SCREEN_NOTIFICATION_TAB]: undefined;
  [SCREEN_DEALS_TAB]: undefined;
  [SCREEN_SEARCH_LISTING_CARDS_PAGE]: SearchListingCards;
};

type PreTripHomeTabRouteType = RouteProp<
  AppNavigatorParamsType,
  typeof SCREEN_PRETRIP_HOME_TABS
>;

export type StarterScreenNavigationProp = BottomTabNavigationProp<
  PreTripHomeTabsType
>;

const Tab = createBottomTabNavigator<PreTripHomeTabsType>();

const tabBarColorConfig = {
  activeTintColor: '#00C684',
  activeBackgroundColor: '#0B6D4D',
  inactiveTintColor: '#3C8F73',
  inactiveBackgroundColor: '#28795E',
};

export interface PreTripHomeTabsProp {
  deviceLocaleStore: DeviceLocale;
  navigation: StarterScreenNavigationProp;
  route: PreTripHomeTabRouteType;
}

const PreTripHomeTabs = ({deviceLocaleStore, route}: PreTripHomeTabsProp) => {
  useEffect(() => {
    const {screen, ...meta} = route?.params ?? {};
    if (screen) {
      deepLink({link: screen, screenData: meta});
    }
  }, [route]);

  return (
    // @ts-ignore - type definitions unavailable
    <Tab.Navigator tabBar={props => <ExploreBottomBar {...props} />}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Explore',
          icon: CONSTANT_compassIcon,
          ...tabBarColorConfig,
        }}
        name={SCREEN_EXPLORE_TAB}
        component={Explore}
      />
      {deviceLocaleStore.deviceLocale === 'in' ? (
        <Tab.Screen
          options={{
            tabBarLabel: 'Deals',
            icon: CONSTANT_dealsIcon,
            ...tabBarColorConfig,
          }}
          name={SCREEN_DEALS_TAB}
          component={DealsListing}
        />
      ) : null}
      <Tab.Screen
        options={{
          tabBarLabel: 'Search',
          icon: CONSTANT_searchIcon,
          ...tabBarColorConfig,
        }}
        name={SCREEN_SEARCH_TAB}
        component={SearchV2}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Notifications',
          icon: CONSTANT_notificationBellIcon,
          ...tabBarColorConfig,
        }}
        name={SCREEN_NOTIFICATION_TAB}
        component={Notifications}
      />
    </Tab.Navigator>
  );
};

export default inject('deviceLocaleStore')(observer(PreTripHomeTabs));
