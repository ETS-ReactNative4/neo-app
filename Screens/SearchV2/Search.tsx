import React, {
  useEffect,
  useState,
  createContext,
  useReducer,
  useContext,
} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
  Alert,
  TextInput,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import {
  CONSTANT_hamburgerIcon,
  CONSTANT_callStartIcon,
  CONSTANT_searchIcon,
  CONSTANT_dropDownArrowDarkIcon,
  CONSTANT_flagIcon,
  CONSTANT_toolIcon,
  CONSTANT_profileIcon,
} from '../../constants/imageAssets';
import Icon from '../../CommonComponents/Icon/Icon';
import {Space, Text} from '@pyt/micros';
import apiCall from '../../Services/networkRequests/apiCall';
import constants from '../../constants/constants';
import {ScrollView} from 'react-native-gesture-handler';
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime');
var updateLocale = require('dayjs/plugin/updateLocale');
var isToday = require('dayjs/plugin/isToday');
var isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(isToday);
dayjs.extend(isBetween);
import CallNotes from './components/CallNotes';
import {userContext} from '../../App';
import {useRoute} from '@react-navigation/native';
import {SCREEN_ULTIMATE_MENU} from '../../NavigatorsV2/ScreenNames';
const initialState = {
  callResponse: {},
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        master: action.payload,
      };
    case 'FETCH_ERROR':
      return {
        master: {},
      };
    default:
      return state;
  }
};
export const responseContext = createContext();
const Search = ({navigation, route}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuItem, setMenuItem] = useState('');
  const [leadsData, setLeadsData] = useState({});
  const [loading, setLoading] = useState(false);
  const [followUp, setFollowUp] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [callData, setCallData] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [pageData, setPageData] = useState({
    nextPage: null,
    prevPage: null,
    from: 0,
    to: 0,
  });
  const [overview, setOverview] = useState({});
  const [tabName, setTabName] = useState('Calls');
  const [counts, setCounts] = useState();
  const {users} = useContext(userContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(()=>{
  //   console.log('menu in state',menuItem);
  //   route.params.name ==''?setMenuItem('assigned_in_30_minutes'):setMenuItem('MQL')
  //   getTrailData(route.params.name, '', '');
  // },[])
  const openUltimateMenu = () => {
    navigation.navigate(SCREEN_ULTIMATE_MENU);
  };

  const toggle = () => {
    setMenuOpen(!menuOpen);
  };
  const handleMenuItem = (item, count) => {
    console.log('menu in handle', menuItem);
    setMenuItem(item);
    setMenuOpen(false);
    setCounts(count);
    console.log('inside the menutab');
    getTrailData(item, '', '');
  };

  const handleTab = item => {
    console.log('handletab', item);
    setTabName(item);
  };
  const updateMenuState = menuOpen => {
    setMenuOpen(menuOpen);
  };

  const handleTime = trail => {
    setFollowUp(trail.follow_on);
  };

  const getCount = () => {
    apiCall(
      `${constants.counts}?user_id=${users.userData.user_id}_team`,
      {},
      'POST',
      false,
      null,
      {
        Authorization: 'Bearer ' + users.tokens.access_token,
      },
    )
      .then(response => {
        console.log('userDetails Check', response);
        setOverview(response.counts);
        setCounts(response.counts.assigned_in_30_minutes);
      })
      .catch(res => {
        console.log(res);
      });
  };
  const getTrailData = (item, searchItem, pageUrl) => {
    var menu;
    var where = [];
    if (searchItem !== '') {
      where.push(`trail_id`, `like`, `%${searchItem}%`);
      menu = 'api/v3/sales/neo/search';
    } else if (pageUrl !== '') {
      where = [];
      menu = 'api/v3/' + pageUrl;
    } else {
      where = [];
      menu = 'api/v3/sales/neo/leads/' + item;
    }
    const requestObj = {
      filters: {},
      orderBy: {},
      user_id: `30_team`,
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
        setPageData({
          nextPage: response.next_page_url,
          prevPage: response.prev_page_url,
          from: response.from,
          to: response.to,
        });
      })
      .catch(res => {
        console.log(res);
      });
  };
  const linkToCallNotes = item => {
    setModalVisible(true);
    setCallData(item);
  };

  const displayFollowTime = trail => {
    const value = trail.last_call;
    if (value?.follow_on) {
      const diff = dayjs(value.follow_on).diff(dayjs(), 'minutes');
      const followOn = value.follow_on;

      if (
        trail.last_log &&
        trail.last_log.reason === 'Defaulter' &&
        dayjs(value.follow_on).isBefore(dayjs(trail.last_log.created_at))
      ) {
        return 'Defaulted';
      }

      if (diff <= 0) {
        return dayjs(followOn).format('HH:mm');
      }

      if (dayjs(followOn).isToday()) {
        return dayjs(followOn).format('HH:mm');
      }

      return dayjs(followOn).format('DD/MM/YYYY');
    }
    return null;
  };

  const LeadCard = ({trail}) => {
    return (
      <Space direction={'column'}>
        <Space style={styles.pipeblock} direction={'column'}>
          <Space padding={15} direction={'column'}>
            <Space style={styles.trailblock}>
              <Text color={'#fff'} fontSize={18}>
                {trail.customer.name}{' '}
              </Text>
              <Text color={'#9DA4B2'}>{trail.trail_id} </Text>
            </Space>
            <Space direction={'column'}>
              <Text color={'#9DA4B2'}>{displayFollowTime(trail)} </Text>
              <Text color={'#9DA4B2'}>
                {trail.no_nights}n{' '}
                {trail.trail_to ? ' to ' + trail.trail_to : ''}
              </Text>
              <Text color={'#9DA4B2'}>{trail.customer.email}</Text>
              <Text color={'#9DA4B2'}>{trail.customer.mobile}</Text>
            </Space>
          </Space>
          <Space style={styles.footer}>
            <TouchableOpacity style={styles.callnotes}>
              <Icon
                name={CONSTANT_callStartIcon}
                style={styles.menu}
                onPress={() => linkToCallNotes(trail)}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.callnotes}>
              <Icon name={CONSTANT_flagIcon} style={styles.menu} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.callnotes}>
              <Icon name={CONSTANT_toolIcon} style={styles.menu} />
            </TouchableOpacity>
          </Space>
        </Space>
      </Space>
    );
  };

  const renderItem = ({item}) => <LeadCard trail={item} key={item.trail_id} />;

  const handleSearch = () => {
    getTrailData(menuItem, searchItem, '');
  };

  const menu = (
    <Menu onItemSelected={handleMenuItem} countOverview={overview} />
  );
  useEffect(() => {
    getCount();
    console.log('menu in state', route.params);
    debugger;
    if (
      route.params.name != undefined &&
      route.params.name != null &&
      route.params.name != ''
    ) {
      setMenuItem(route.params.name);
      getTrailData(route.params.name, '', '');
    } else {
      setMenuItem('assigned-in-30-minutes');
      getTrailData('assigned-in-30-minutes', '', '');
    }

    let apis = {
      trailStatuses: `${constants.trailStatuses}`,
      callResponses: `${constants.callResponses}`,
      reasons: `${constants.reasons}`,
      cities: `${constants.cities}`,
      allUsers: `${constants.allUsers}`,
      roles: `${constants.roles}`,
      region: `${constants.regions}`,
    };
    Promise.all(Object.values(apis).map(key => apiCall(key, {}, 'GET')))
      .then(res => {
        dispatch({type: 'FETCH_SUCCESS', payload: res});
      })
      .catch(() => {});
  }, []);

  const displayHeadCount = menu => {
    let menuName = menuItem.replace(/-/g, ' ').toLocaleUpperCase();
    let countValue;
    if (menuItem == 'assigned-in-30-minutes') {
      return menuName + ' - ' + overview.assigned_in_30_minutes;
    } else if (menuItem == 'new') {
      return 'MQL - ' + overview.new;
    } else if (menuItem == 'in-talks') {
      return 'SQL - ' + overview.in_talks;
    }

    // menuItem =='assigned_in_30_minute'? (overview.assigned_in_30_minutes):(counts)
  };

  return (
    <SideMenu
      menu={menu}
      isOpen={menuOpen}
      onChange={menuOpen => updateMenuState(menuOpen)}>
      <View style={styles.container}>
        <responseContext.Provider
          value={{resState: state, resDispatch: dispatch}}>
          <View style={styles.headerContainerStyle}>
            <Text style={styles.titleLogo}>NEO</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.notificationIconStyle}
              onPress={openUltimateMenu}>
              <Icon name={CONSTANT_profileIcon} size={20} color={'#6FCF97'} />
            </TouchableOpacity>
          </View>
          <Space>
            <Space style={styles.semiblock}>
              <TouchableOpacity onPress={() => handleSearch()}>
                <Icon
                  name={CONSTANT_searchIcon}
                  key={1}
                  size={16}
                  color={'#9DA4B2'}
                />
              </TouchableOpacity>

              <TextInput
                style={styles.inp}
                placeholder="Search"
                placeholderTextColor="#9DA4B2"
                value={searchItem}
                onChangeText={text => setSearchItem(text)}></TextInput>
            </Space>

            <Space justifyContent={'flex-end'}>
              <Space>
                <TouchableOpacity
                  onPress={() => {
                    let pageUrl = pageData.prevPage.split('/v3/', 2)[1];
                    getTrailData('', '', pageUrl);
                  }}>
                  <Icon
                    style={styles.pagleft}
                    name={CONSTANT_dropDownArrowDarkIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.total}>
                  {pageData.from}-{pageData.to}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    let pageUrl = pageData.nextPage.split('/v3/', 2)[1];
                    getTrailData('', '', pageUrl);
                  }}>
                  <Icon
                    style={styles.pageRight}
                    name={CONSTANT_dropDownArrowDarkIcon}
                  />
                </TouchableOpacity>
              </Space>
            </Space>
          </Space>
          <Space style={styles.pipeline} direction={'column'}>
            <Text
              color={'#9DA4B2'}
              fontSize={16}
              fontWeight={'bold'}
              marginBottom={10}>
              {displayHeadCount(menuItem)}
            </Text>

            {loading ? (
              <Text alignSelf="center" marginVertical="auto" color={'#9DA4B2'}>
                Loading...
              </Text>
            ) : (
              <ScrollView>
                <FlatList data={leadsData} renderItem={renderItem} />
                {modalVisible ? (
                  <View style={styles.centeredView}>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      presentationStyle={'pageSheet'}
                      onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                      }}>
                      <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text
                          style={styles.textStyle}
                          onPress={() => setModalVisible(!modalVisible)}>
                          x
                        </Text>
                      </TouchableOpacity>
                      <CallNotes
                        modalStatus={modalVisible}
                        trailDetails={callData}
                        tabSelected={handleTab}
                        tabSel={tabName}
                      />
                    </Modal>
                  </View>
                ) : (
                  <Space justifyContent={'center'}>
                    <Text style={styles.nodata}></Text>
                  </Space>
                )}
              </ScrollView>
            )}
          </Space>
          <TouchableOpacity style={styles.buttonmenu} onPress={toggle}>
            <Icon name={CONSTANT_hamburgerIcon} style={styles.menu} />
          </TouchableOpacity>
        </responseContext.Provider>
      </View>
    </SideMenu>
  );
};

const styles = StyleSheet.create({
  semiblock: {
    width: 180,
    paddingLeft: 10,
    backgroundColor: '#2B2B3D',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
  },
  buttonmenu: {
    position: 'absolute',
    top: 10,
    padding: 10,
    left: 0,
  },
  titleLogo: {
    textAlignVertical: 'center',
    color: '#4FB58E',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 15,
  },
  callnotes: {
    backgroundColor: '#2B2B3D',
  },
  footer: {
    borderRadius: 5,
    backgroundColor: '#2B2B3D',
    padding: 10,
    margin: 3,
    width: 300,
    justifyContent: 'space-evenly',
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#181829',
  },
  text: {
    margin: 10,
    color: '#9DA4B2',
  },
  menu: {
    color: '#6FCF97',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerContainerStyle: {
    backgroundColor: '#2B2B3D',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  pipeline: {
    backgroundColor: '#181829',
    flex: 1,
    height: 350,
    borderRadius: 5,
    padding: 20,
  },
  pipeblock: {
    backgroundColor: '#2B2B3D',
    // padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: 320,
    height: 230,
  },
  trailblock: {
    justifyContent: 'space-between',
    width: 250,
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 50,
    padding: 10,
    position: 'absolute',
    top: 10,
    right: 10,
    elevation: 9,
    width: 30,
    height: 30,
    textAlign: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#353546',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    position: 'absolute',
    top: 4,
    right: 11,
  },
  inp: {
    color: '#bbb',
  },
  pagleft: {
    color: '#B3B3B3',
    fontSize: 24,
    transform: [{rotate: '90deg'}],
  },
  pageRight: {
    color: '#B3B3B3',
    fontSize: 24,
    transform: [{rotate: '270deg'}],
  },
  total: {
    color: '#B3B3B3',
    fontSize: 18,
  },
  nodata: {
    color: '#B3B3B3',
    fontSize: 22,
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
export default Search;
