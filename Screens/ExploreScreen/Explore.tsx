import React, {useState, Fragment, useRef, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamsType} from '../../NavigatorsV2/AppNavigator';
import {Pressable, Space, Text, Input} from '@pyt/micros';
import {Tabs, Tooltip} from '@pyt/macros';
import {LeadCard} from '@pyt/widgets';
import apiCall from '../../Services/networkRequests/apiCall';
import {CONSTANT_productUrl} from '../../constants/serverUrls';
import constants from '../../constants/constants';
import {
  SCREEN_PRETRIP_HOME_TABS,
  SCREEN_EXPLORE_TAB,
  SCREEN_ULTIMATE_MENU,
  SCREEN_NOTIFICATION_TAB,
} from '../../NavigatorsV2/ScreenNames';
import {PreTripHomeTabsType} from '../../NavigatorsV2/PreTripHomeTabs';
import HeroBannerRow from './Components/HeroBannerRow';
import {
  CONSTANT_white,
  CONSTANT_shade5,
  CONSTANT_black1,
} from '../../constants/colorPallete';
import ExploreSectionTitle from './Components/ExploreSectionTitle';
import BlankSpacer from '../../CommonComponents/BlankSpacer/BlankSpacer';
import BookedItineraryCardsRow from './Components/BookedItineraryCardsRow';
import ErrorBoundary from '../../CommonComponents/ErrorBoundary/ErrorBoundary';
import PackageItineraryCardsRow from './Components/PackageItineraryCardsRow';
import PromotedCardsRow from './Components/PromotedCardsRow';
import BlogCardsRow from './Components/BlogCardsRow';
import CountryCardsRow from './Components/CountryCardsRow';
import PrimaryHeader from '../../NavigatorsV2/Components/PrimaryHeader';
import {
  CONSTANT_preTripHamburger,
  CONSTANT_notificationBellIcon,
  CONSTANT_searchIcon,
  CONSTANT_careersIcon,
} from '../../constants/imageAssets';

import TestimonialsCardsRow from './Components/TestimonialsCardsRow';
import TrustIcons from '../../CommonComponents/TrustIcons/TrustIcons';
import {ExploreFeedType} from './ExploreFeedType';
import useExploreDataRequest from './hooks/useExploreDataRequest';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {inject, observer} from 'mobx-react';
import YourBookings from '../../mobx/YourBookings';
import User from '../../mobx/User';
import DealsCardsRow from './Components/DealsCardsRow';
import {getWidgets} from './services/getWidgets';
import {
  getActorId,
  getRestoreId,
  identifyChatUser,
  initializeChat,
  setChatUserDetails,
} from '../../Services/freshchatService/freshchatService';
import Icon from '../../CommonComponents/Icon/Icon';
import storeService from '../../Services/storeService/storeService';
import ChatDetails from '../../mobx/ChatDetails';
import {locale} from 'moment';

export type ExploreScreenNavigationType = CompositeNavigationProp<
  StackNavigationProp<AppNavigatorParamsType, typeof SCREEN_PRETRIP_HOME_TABS>,
  BottomTabNavigationProp<PreTripHomeTabsType, typeof SCREEN_EXPLORE_TAB>
>;

export type ExploreScreenRouteProp = RouteProp<
  PreTripHomeTabsType,
  typeof SCREEN_EXPLORE_TAB
>;

export interface ExploreScreenProps {
  navigation: ExploreScreenNavigationType;
  route: ExploreScreenRouteProp;
  yourBookingsStore: YourBookings;
  userStore: User;
  chatDetailsStore: ChatDetails;
}

export type ExploreScreenSourcesType = 'TravelProfileFlow';

const fetchUser = () => {
  apiCall(`${constants.fetchUser}`, {}, 'POST')
    .then(response => {
      console.log('userDetails Check', response);
    })
    .catch(res => {
      console.log(res);
    });
};

const Explore = ({
  navigation,
  yourBookingsStore,
  userStore,
  chatDetailsStore,
}: ExploreScreenProps) => {
  let [exploreData, setExploreData] = useState<ExploreFeedType>([]);
  const [exploreDataApi, loadExploreData] = useExploreDataRequest();

  const [salesMetrics, setSalesMetrics] = useState({});
  const [loading, setLoading] = useState(false);

  const openUltimateMenu = () => {
    navigation.navigate(SCREEN_ULTIMATE_MENU);
  };

  const rightAction = () => {
    navigation.navigate(SCREEN_NOTIFICATION_TAB);
  };

  const header = useRef(
    PrimaryHeader({
      leftAction: openUltimateMenu,
      leftIcon: CONSTANT_preTripHamburger,
      rightElement: (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.notificationIconStyle}
          onPress={rightAction}>
          <Icon name={CONSTANT_notificationBellIcon} size={18} />
        </TouchableOpacity>
      ),
    }),
  ).current;

  useEffect(() => {
    setLoading(true);
    fetchMetrics();
    // fetchUser();
  }, []);

  const {successResponseData} = exploreDataApi;

  const {userDisplayDetails} = userStore;

  const {name} = userDisplayDetails;

  const fetchMetrics = () => {
    apiCall(`${constants.salesMetrics}?user_id=30_team`, {}, 'POST')
      .then(response => {
        setSalesMetrics(response);
      })
      .catch(res => {
        console.log(res);
      })
      .finally(() => setLoading(false));
  };
  const Item = ({count, name, percentage}) => (
    <Space direction={'column'}>
      <Space style={styles.pipeblock}>
        <Text color={'#9DA4B2'}>{name} </Text>
        <Text color={'#9DA4B2'}>
          {count} ({percentage} %)
        </Text>
      </Space>
    </Space>
  );

  const renderItem = ({item}) => (
    <Item
      count={item.count}
      name={item.trail_status.name}
      percentage={item.percentage}
    />
  );
  return (
    <View style={styles.container}>
      {header}
      <ScrollView>
        <Space paddingHorizontal={22} direction={'column'} marginTop={20}>
          <Text color={'#9DA4B2'} fontSize={16} fontWeight={'bold'}>
            Overview
          </Text>
          <Space style={styles.search}>
            <Space style={styles.semiblock}>
              <Icon
                name={CONSTANT_searchIcon}
                key={1}
                size={16}
                color={'#9DA4B2'}
              />

              <TextInput
                placeholder="Search"
                placeholderTextColor="#9DA4B2"></TextInput>
            </Space>
            <Space style={styles.semiblock}>
              <Icon
                name={CONSTANT_careersIcon}
                key={1}
                size={16}
                color={'#9DA4B2'}
              />
              <TextInput
                placeholder="Sales Roster"
                placeholderTextColor="#9DA4B2"></TextInput>
            </Space>
          </Space>
          {loading ? (
            <Text alignSelf="center" marginVertical="auto" color={'#9DA4B2'}>
              Loading...
            </Text>
          ) : (
            <Space>
              <Space style={styles.cardblock} direction={'column'}>
                <Text color={'#9DA4B2'}>Revenue</Text>
                <Text color={'#9DA4B2'}>{salesMetrics.target_achieved}</Text>
              </Space>

              <Space style={styles.cardblock} direction={'column'}>
                <Text color={'#9DA4B2'}>Converts</Text>
                <Space>
                  <Text color={'#fff'} fontSize={18}>
                    {salesMetrics.converts_achieved} /{' '}
                  </Text>
                  <Text color={'#9DA4B2'}>{salesMetrics.converts}</Text>
                </Space>
              </Space>
            </Space>
          )}
          <Space style={styles.pipeline} direction={'column'}>
            <Text color={'#9DA4B2'} fontSize={16} fontWeight={'bold'}>
              Sales Pipeline
            </Text>
            {loading ? (
              <Text alignSelf="center" marginVertical="auto" color={'#9DA4B2'}>
                Loading...
              </Text>
            ) : (
              <FlatList data={salesMetrics.leads} renderItem={renderItem} />
            )}
          </Space>
        </Space>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181829',
  },
  search: {
    justifyContent: 'space-between',
  },
  semiblock: {
    width: 180,
    paddingLeft: 10,
    backgroundColor: '#2B2B3D',
    borderRadius: 5,
  },
  pipeline: {
    backgroundColor: '#2B2B3D',
    flex: 1,
    height: 350,
    borderRadius: 5,
    justifyContent: 'flex-start',
    padding: 20,
  },
  pipeblock: {
    backgroundColor: '#353546',
    justifyContent: 'space-around',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },

  countblock: {
    flex: 1,
    justifyContent: 'flex-start',
    color: '#9DA4B2',
  },
  cardblock: {
    width: 180,
    padding: 20,
    backgroundColor: '#2B2B3D',
    borderRadius: 5,
  },

  spacerBackgroundStyle: {
    backgroundColor: CONSTANT_shade5,
  },
});

export default ErrorBoundary({isRoot: true})(
  inject('chatDetailsStore')(
    inject('userStore')(inject('yourBookingsStore')(observer(Explore))),
  ),
);
