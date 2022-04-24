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
  SCREEN_PRETRIP_CHAT,
  // SCREEN_STAY_SEARCH,
} from './ScreenNames';
import Explore, {
  ExploreScreenSourcesType,
} from '../Screens/ExploreScreen/Explore';
import ExploreBottomBar from '../CommonComponents/ExploreBottomBar/ExploreBottomBar';
import {
  CONSTANT_compassIcon,
  CONSTANT_searchIcon,
  CONSTANT_dealsIcon,
  CONSTANT_hotelIcon,
  CONSTANT_detailIcon,
} from '../constants/imageAssets';
import {observer, inject} from 'mobx-react';
import DeviceLocale from '../mobx/DeviceLocale';
import SearchV2 from '../Screens/SearchV2/Search';
import deepLink from '../Services/deepLink/deepLink';
import {RouteProp} from '@react-navigation/native';
import {AppNavigatorParamsType} from './AppNavigator';
import DealsListing from '../Screens/DealsListingScreen/DealsListing';
// import StayHotelSearchScreen from '../Screens/StayHotelSearchScreen/StayHotelSearchScreen';
import useIsUserLoggedIn from '../Services/isUserLoggedIn/hooks/useIsUserLoggedIn';
import LoyaltyCoins from '../mobx/LoyaltyCoins';
import User from '../mobx/User';

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
  [SCREEN_PRETRIP_CHAT]: undefined;
  [SCREEN_STAY_SEARCH]: undefined;
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
  activeTintColor: '#2B2B3D',
  activeBackgroundColor: '#6FCF97',
  inactiveTintColor: '#3C8F73',
  inactiveBackgroundColor: '#181829',
};

export interface PreTripHomeTabsProp {
  deviceLocaleStore: DeviceLocale;
  navigation: StarterScreenNavigationProp;
  route: PreTripHomeTabRouteType;
  loyaltyCoinsStore: LoyaltyCoins;
  userStore: User;
}

const PreTripHomeTabs = ({
  deviceLocaleStore,
  route,
  loyaltyCoinsStore,
  userStore,
}: PreTripHomeTabsProp) => {
  const isLoggedIn = useIsUserLoggedIn();
  useEffect(() => {
    const {screen, ...meta} = route?.params ?? {};
    if (screen) {
      deepLink({link: screen, screenData: meta});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userStore.userDisplayDetails.userId) {
      if (!Object.keys(loyaltyCoinsStore.loyaltyCoins || {}).length) {
        loyaltyCoinsStore.getLoyaltyCoins(userStore.userDisplayDetails.userId);
      }
    } else {
      userStore.getUserDisplayDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.userDisplayDetails.userId]);

  return (
    // @ts-ignore - type definitions unavailable
    <Tab.Navigator tabBar={props => <ExploreBottomBar {...props} />}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Sales',
          icon: CONSTANT_dealsIcon,
          ...tabBarColorConfig,
        }}
        name={SCREEN_EXPLORE_TAB}
        component={Explore}
      />
      {/* {deviceLocaleStore.deviceLocale === 'in' ? (
        <Tab.Screen
          options={{
            tabBarLabel: 'Leads',
            icon: CONSTANT_dealsIcon,
            ...tabBarColorConfig,
          }}
          name={SCREEN_DEALS_TAB}
          component={DealsListing}
        />
      ) : null} */}

      <Tab.Screen
        options={{
          tabBarLabel: 'Leads',
          icon: CONSTANT_detailIcon,
          ...tabBarColorConfig,
        }}
        name={SCREEN_SEARCH_TAB}
        component={SearchV2}
      />
    </Tab.Navigator>
  );
};

export default inject('deviceLocaleStore')(
  inject('userStore')(inject('loyaltyCoinsStore')(observer(PreTripHomeTabs))),
);
