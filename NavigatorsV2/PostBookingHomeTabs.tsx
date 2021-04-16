import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  SCREEN_TRIP_FEED_TAB,
  SCREEN_BOOKING_TAB,
  SCREEN_SUPPORT_TAB,
  SCREEN_TOOLS_TAB,
  SCREEN_JOURNAL_TAB,
} from './ScreenNames';
import TripFeed from '../Screens/TripFeedScreen/TripFeed';
import BookingsHome from '../Screens/BookingsHomeScreen/BookingsHome';
import ChatScreen from '../Screens/ChatScreen/ChatScreen';
import Tools from '../Screens/ToolsScreen/Tools';
import Journal from '../Screens/JournalScreen/Journal';
import PostBookingBottomBar from './Components/PostBookingBottomBar';
import {
  CONSTANT_firstColor,
  CONSTANT_white,
  CONSTANT_shade1dot5,
} from '../constants/colorPallete';
import {
  CONSTANT_tripFeedIcon,
  CONSTANT_tripFeedSelectedIcon,
  CONSTANT_bookingIcon,
  CONSTANT_bookingSelectedIcon,
  CONSTANT_supportIconLight,
  CONSTANT_supportSelectedIcon,
  CONSTANT_toolIcon,
  CONSTANT_toolSelectedIcon,
  CONSTANT_journalIcon,
  CONSTANT_journalSelectedIcon,
} from '../constants/imageAssets';
import {inject, observer} from 'mobx-react';

export type PostBookingHomeTabsType = {
  [SCREEN_TRIP_FEED_TAB]: undefined;
  [SCREEN_BOOKING_TAB]: undefined;
  [SCREEN_SUPPORT_TAB]: undefined;
  [SCREEN_TOOLS_TAB]: undefined;
  [SCREEN_JOURNAL_TAB]: undefined;
};

const tabBarColorConfig = {
  activeTintColor: CONSTANT_firstColor,
  activeBackgroundColor: CONSTANT_white,
  inactiveTintColor: CONSTANT_shade1dot5,
  inactiveBackgroundColor: CONSTANT_white,
};

const Tab = createBottomTabNavigator<PostBookingHomeTabsType>();

const PostBookingHomeTabs = ({chatDetailsStore}) => {
  return (
    // @ts-ignore - type definitions unavailable
    <Tab.Navigator
      tabBar={props => (
        <PostBookingBottomBar
          {...props}
          chatDetailsStore={chatDetailsStore._isActiveChat}
        />
      )}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Trip Feed',
          icon: CONSTANT_tripFeedIcon,
          selectedIcon: CONSTANT_tripFeedSelectedIcon,
          ...tabBarColorConfig,
        }}
        component={TripFeed}
        name={SCREEN_TRIP_FEED_TAB}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Bookings',
          icon: CONSTANT_bookingIcon,
          selectedIcon: CONSTANT_bookingSelectedIcon,
          ...tabBarColorConfig,
        }}
        component={BookingsHome}
        name={SCREEN_BOOKING_TAB}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Support',
          icon: CONSTANT_supportIconLight,
          selectedIcon: CONSTANT_supportSelectedIcon,
          ...tabBarColorConfig,
        }}
        component={ChatScreen}
        name={SCREEN_SUPPORT_TAB}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Tools',
          icon: CONSTANT_toolIcon,
          selectedIcon: CONSTANT_toolSelectedIcon,
          ...tabBarColorConfig,
        }}
        component={Tools}
        name={SCREEN_TOOLS_TAB}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Journal',
          icon: CONSTANT_journalIcon,
          selectedIcon: CONSTANT_journalSelectedIcon,
          ...tabBarColorConfig,
        }}
        component={Journal}
        name={SCREEN_JOURNAL_TAB}
      />
    </Tab.Navigator>
  );
};

export default inject('chatDetailsStore')(observer(PostBookingHomeTabs));
