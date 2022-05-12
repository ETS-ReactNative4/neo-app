import React, {
  useState,
  Fragment,
  createContext,
  useReducer,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  FlatList,
  Linking,
  Button,
  Platform,
} from 'react-native';
import {userContext} from '../../App';
import {dataContext} from '../../App';
import {
  getEnvironmentName,
  isProduction,
} from '../../Services/getEnvironmentDetails/getEnvironmentDetails';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamsType} from '../../NavigatorsV2/AppNavigator';
import {Pressable, Space, Text, Input, Avatar, Popper} from '@pyt/micros';
import {Tabs, Tooltip} from '@pyt/macros';
import apiCall from '../../Services/networkRequests/apiCall';
import {CONSTANT_productUrl} from '../../constants/serverUrls';
import constants from '../../constants/constants';
import {
  SCREEN_PRETRIP_HOME_TABS,
  SCREEN_EXPLORE_TAB,
  SCREEN_ULTIMATE_MENU,
  SCREEN_NOTIFICATION_TAB,
  SCREEN_LEADS,
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
  CONSTANT_profileIcon,
  CONSTANT_callStartIcon,
} from '../../constants/imageAssets';
import {SCREEN_SEARCH_TAB} from '../../NavigatorsV2/ScreenNames';

import TestimonialsCardsRow from './Components/TestimonialsCardsRow';
import TrustIcons from '../../CommonComponents/TrustIcons/TrustIcons';
import {ExploreFeedType} from './ExploreFeedType';
import useExploreDataRequest from './hooks/useExploreDataRequest';
// import useDeepCompareEffect from 'use-deep-compare-effect';
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
import LeadCard from './LeadCard';

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

const initialState = {
  callResponse: {},
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
  const [user, setUser] = useState(null);
  const [userBlock, setUserBlock] = useState(false);

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
          onPress={openUltimateMenu}>
          <Icon name={CONSTANT_profileIcon} size={20} color={'#6FCF97'} />
        </TouchableOpacity>
      ),
    }),
  ).current;

  useEffect(() => {
    setLoading(true);
    fetchUser();
  }, []);

  const {successResponseData} = exploreDataApi;
  const {userDisplayDetails} = userStore;
  const {name} = userDisplayDetails;
  const {dispatch, users} = useContext(userContext);
  const {dataApi, dispatchRes} = useContext(dataContext);
  const [searchItem, setSearchItem] = useState('');
  const [leadsData, setLeadsData] = useState({});

  // console.log('api data from app in first page',dataApi)
  console.log('state from exploreee', users);
  const fetchUser = () => {
    apiCall(`${constants.fetchUser}`, {}, 'GET', false, null, {
      Authorization: 'Bearer ' + users.tokens.access_token,
    })
      .then(res => {
        let userDetails = {
          user_id: res.user_id,
          username: res.username,
          lead_pool_status: res.lead_pool_status,
          emp_code: res.emp_code,
          email_id: res.email_id,
        };
        dispatch({type: 'FETCH_USER', payload: {userData: userDetails}});
        fetchMetrics(res.user_id);
        setUser(res.user_id);
      })
      .catch(res => {
        console.log(res);
      })
      .finally(() => {});
  };

  const fetchMetrics = user => {
    apiCall(
      `${constants.salesMetrics}?user_id=${user}_team`,
      {},
      'POST',
      false,
      null,
      {
        Authorization: 'Bearer ' + users.tokens.access_token,
      },
    )
      .then(response => {
        setSalesMetrics(response);
      })
      .catch(res => {
        console.log(res);
      })
      .finally(() => setLoading(false));
  };
  const redirectToLead = name => {
    let menuItem;
    if (name === 'MQL') {
      menuItem = 'new';
    } else if (name === 'SQL') {
      menuItem = 'in-talks';
    } else if (name === 'Good Lead') {
      menuItem = 'good-lead';
    } else if (name === 'CNW') {
      menuItem = 'convert-next-week';
    } else if (name === 'CTW') {
      menuItem = 'convert-this-week';
    }
    navigation.navigate(SCREEN_LEADS, {name: menuItem});
  };
  const Item = ({count, name, percentage}) => (
    <Space direction={'column'}>
      <Space style={styles.pipeblock}>
        {/* navigation.navigate(SCREEN_SEARCH_TAB,{name:name}) */}
        <TouchableOpacity onPress={() => redirectToLead(name)}>
          <Text color={'#9DA4B2'}>{name} </Text>
        </TouchableOpacity>
        <Text color={'#9DA4B2'}>
          {count} ({percentage} %)
        </Text>
      </Space>
    </Space>
  );

  const getTrailData = searchItem => {
    setUserBlock(true);
    var menu;
    var where = [];
    if (searchItem !== '') {
      where.push(`trail_id`, `like`, `%${searchItem}%`);
      menu = 'api/v3/sales/neo/search';
    }
    const requestObj = {
      where: where.length === 0 ? [] : [where],
      with: ['customer', 'lastCall', 'trailStatus', 'salesOwner', 'lastLog'],
    };
    setLoading(true);

    apiCall(menu, requestObj, 'POST', false, null, {
      Authorization: 'Bearer ' + users.tokens.access_token,
    })
      .then(response => {
        setLoading(false);
        setLeadsData(response.data);
      })
      .catch(res => {
        console.log(res);
      });
  };

  const renderItem = ({item}) => (
    <Item
      count={item.count}
      name={item.trail_status.name}
      percentage={item.percentage}
    />
  );

  const renderLeadsItem = ({item}) => (
    <LeadCard trail={item} key={item.trail_id} isSearch={true} />
  );
  const openDialScreen = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = 'telprompt:${}';
    } else {
      number = 'tel:${}';
    }
    Linking.openURL(number);
  };

  return (
    <View style={styles.container}>
      {header}

      <ScrollView>
        <Space paddingHorizontal={22} direction={'column'} marginTop={20}>
          <Space justifyContent={'space-between'}>
            {/* <TouchableOpacity onPress={directions}>
          <Text>Click</Text>
          </TouchableOpacity> */}
            <Text color={'#9DA4B2'} fontSize={22} fontWeight={'bold'}>
              Overview
            </Text>
            {/* <TouchableOpacity
              onPress={() => openDialScreen()}
              style={styles.makeCall}>
              <Space>
                <Icon
                  name={CONSTANT_callStartIcon}
                  key={1}
                  size={16}
                  color="#6FCF97"
                />
                <Text color={'#9DA4B2'}>Make a Call</Text>
              </Space>
            </TouchableOpacity> */}
          </Space>
          <Space style={styles.search}>
            <Space style={styles.semiblock}>
              <TouchableOpacity onPress={() => getTrailData(searchItem)}>
                <Icon
                  name={CONSTANT_searchIcon}
                  key={1}
                  size={16}
                  color={'#9DA4B2'}
                />
              </TouchableOpacity>
              <TextInput
                placeholder="Search"
                placeholderTextColor="#9DA4B2"
                color={'#9DA4B2'}
                value={searchItem}
                onChangeText={text => setSearchItem(text)}></TextInput>
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
          ) : userBlock ? (
            <ScrollView>
              <FlatList data={leadsData} renderItem={renderLeadsItem} />
            </ScrollView>
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
          {userBlock ? null : (
            <Space style={styles.pipeline} direction={'column'}>
              <Text color={'#9DA4B2'} fontSize={16} fontWeight={'bold'}>
                Sales Pipeline
              </Text>
              {loading ? (
                <Text
                  alignSelf="center"
                  marginVertical="auto"
                  color={'#9DA4B2'}>
                  Loading...
                </Text>
              ) : (
                <FlatList data={salesMetrics.leads} renderItem={renderItem} />
              )}
            </Space>
          )}
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
  makeCall: {
    backgroundColor: '#2B2B3D',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: 180,
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
  notificationIconStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
  },
});

export default ErrorBoundary({isRoot: true})(
  inject('chatDetailsStore')(
    inject('userStore')(inject('yourBookingsStore')(observer(Explore))),
  ),
);
