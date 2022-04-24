import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import {CONSTANT_hamburgerIcon} from '../../constants/imageAssets';
import Icon from '../../CommonComponents/Icon/Icon';
import {Pressable, Space, Input, Text} from '@pyt/micros';
import apiCall from '../../Services/networkRequests/apiCall';
import constants from '../../constants/constants';
import {ScrollView} from 'react-native-gesture-handler';

const Search = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuItem, setMenuItem] = useState('assigned_in_30_minute');
  const [leadsData, setLeadsData] = useState({});
  const [loading, setLoading] = useState(false);

  const toggle = () => {
    setMenuOpen(!menuOpen);
  };
  const handleMenuItem = item => {
    setMenuItem(item);
    setMenuOpen(false);
    getTrailData(item);
  };
  const updateMenuState = menuOpen => {
    setMenuOpen(menuOpen);
  };

  const getTrailData = item => {
    setLoading(true);
    let menu = 'api/v3/sales/neo/leads/' + item;
    console.log(menu);
    debugger;
    apiCall(
      menu,
      {
        user_id: '30_team',
      },
      'POST',
    )
      .then(response => {
        setLoading(false);
        setLeadsData(response);
      })
      .catch(res => {
        console.log(res);
      });
  };

  const LeadCard = ({trail_id}) => (
    <Space direction={'column'}>
      <Space style={styles.pipeblock}>
        <Text color={'#9DA4B2'}>{trail_id} </Text>
      </Space>
    </Space>
  );
  debugger;
  const renderItem = ({item}) => <LeadCard trail_id={item.trail_id} />;

  const menu = <Menu onItemSelected={handleMenuItem} />;
  return (
    <SideMenu
      menu={menu}
      isOpen={menuOpen}
      onChange={menuOpen => updateMenuState(menuOpen)}>
      <View style={styles.container}>
        <View style={styles.headerContainerStyle}>
          <Text style={styles.titleLogo}>NEO</Text>
        </View>

        <Space style={styles.pipeline} direction={'column'}>
          {loading ? (
            <Text alignSelf="center" marginVertical="auto" color={'#9DA4B2'}>
              Loading...
            </Text>
          ) : (
            <ScrollView>
              <Text color={'#9DA4B2'} fontSize={16} fontWeight={'bold'}>
                {menuItem.replace(/-/g, ' ').toLocaleUpperCase()}
              </Text>
              <FlatList data={leadsData.data} renderItem={renderItem} />
            </ScrollView>
          )}
        </Space>

        <TouchableOpacity style={styles.button} onPress={toggle}>
          <Icon name={CONSTANT_hamburgerIcon} style={styles.menu} />
        </TouchableOpacity>
      </View>
    </SideMenu>
  );
};

const styles = StyleSheet.create({
  button: {
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
});
export default Search;
