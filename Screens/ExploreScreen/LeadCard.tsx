import React, {useState, useContext} from 'react';
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
import {WebView} from 'react-native-webview';
import {Space, Text} from '@pyt/micros';
var relativeTime = require('dayjs/plugin/relativeTime');
var updateLocale = require('dayjs/plugin/updateLocale');
var isToday = require('dayjs/plugin/isToday');
var isBetween = require('dayjs/plugin/isBetween');
import dayjs from 'dayjs';
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(isToday);
dayjs.extend(isBetween);
import Icon from '../../CommonComponents/Icon/Icon';
import {
  CONSTANT_hamburgerIcon,
  CONSTANT_callStartIcon,
  CONSTANT_searchIcon,
  CONSTANT_dropDownArrowDarkIcon,
  CONSTANT_flagIcon,
  CONSTANT_toolIcon,
  CONSTANT_profileIcon,
} from '../../constants/imageAssets';
import constants from '../../constants/constants';
import {ScrollView} from 'react-native-gesture-handler';
import CallNotes from './LeadComp/CallNotes';
import {navigationDispatcher} from '../../Services/navigationService/navigationServiceV2';

const LeadCard = ({trail, isSearch}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [callData, setCallData] = useState(false);
  const [tabName, setTabName] = useState('Calls');

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

  const linkToCallNotes = item => {
    setModalVisible(true);
    setCallData(item);
  };
  const handleTab = item => {
    console.log('handletab', item);
    setTabName(item);
  };
  const linkToProd = () => {
    Alert.alert('clicked');
    return <WebView source={{uri: 'https://www.google.com'}} />;
  };
  return (
    <ScrollView>
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
              <Space justifyContent={'space-between'}>
                <Text color={'#9ABBFE'}> {displayFollowTime(trail)} </Text>
                {isSearch ? (
                  <Text color={'#6FCF97'}>{trail.trail_status.name} </Text>
                ) : null}
              </Space>
              <Text color={'#9DA4B2'}>
                {trail.no_nights}n{' '}
                {trail.trail_to ? ' to ' + trail.trail_to : ''}
              </Text>
              <Text color={'#9DA4B2'}>{trail.customer.email}</Text>
              <Space justifyContent={'space-between'}>
                <Text color={'#9DA4B2'}>{trail.customer.mobile}</Text>
                {isSearch ? (
                  <Text color={'#9DA4B2'}>{trail.sales_owner.username} </Text>
                ) : null}
              </Space>
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
              <Icon
                name={CONSTANT_flagIcon}
                style={styles.menu}
                onPress={linkToProd}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.callnotes}>
              <Icon name={CONSTANT_toolIcon} style={styles.menu} />
            </TouchableOpacity>
          </Space>
        </Space>
      </Space>
    </ScrollView>
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
  clockIcon: {
    margin: 10,
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
export default LeadCard;
