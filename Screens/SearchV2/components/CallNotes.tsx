import React, {useEffect, useState, useMemo, useContext} from 'react';
import {Pressable, Space, Input, Text} from '@pyt/micros';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import {Tabs} from '@pyt/macros';
import CallResponse from './CallResponse';
import EditTrail from './EditTrail';
import TrailLog from './TrailLog';
import constants from '../../../constants/constants';
import apiCall from '../../../Services/networkRequests/apiCall';
import CallLogs from './CallLogs';
import {userContext} from '../../../App';

const CallNotes = ({modalStatus, trailDetails, tabSel, tabSelected}) => {
  const [tabItem, setTabItem] = useState(tabSel);
  const [trail, setTrail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalVisibile, setModalVisible] = useState(modalStatus);
  const {dispatch, users} = useContext(userContext);

  const tabs = useMemo(() => {
    return [
      {
        name: 'Calls',
        route: 'call-notes',
      },
      {
        name: 'Call Logs',
        route: 'call-logs',
      },
      {
        name: 'Edit',
        route: 'edit-trail',
      },
      {
        name: 'Edit Logs',
        route: 'trail-log',
      },
    ];
  }, []);

  const handleTab = (tab, from) => {
    console.log('clicked', tab);
    tabSel = tab;
    from === 'log'
      ? setTabItem(tab)
      : from === 'editlog'
      ? setTabItem(tab)
      : setTabItem(tab.name);
  };

  const get = (quietly = false) => {
    // tabSelected(tabItem);
    setLoading(quietly ? 'quietly' : true);

    const requestObj = {
      id: trailDetails.trail_id,
      with: [
        'customer',
        'customer.loyaltyTier',
        'logs',
        'logs.user',
        'calls',
        'calls.user',
        'calls.preSalesNote',
        'calls.callResponse',
        'salesOwner',
        'trailStatus',
        'passengers',
        'leadSource',
      ],
      withCount: ['spokeCalls'],
    };
    apiCall(`${constants.trail}`, requestObj, 'POST', false, null, {
      Authorization: 'Bearer ' + users.tokens.access_token,
    })
      .then(response => {
        setTrail(response);
      })
      .catch(res => {
        console.log(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    get();
  }, []);
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Tabs
          items={tabs.map(tab => ({
            ...tab,
            onPress: () => handleTab(tab, 'notes'),
          }))}
          borderBottomWidth={0}
          itemProps={{
            spaceBetweenItems: 16,
            color: '#bbb',
          }}
          activeProps={{color: '#6FCF97'}}
          active={tabs.map(({name}) => name).indexOf(tabItem)}
        />
        {saving ? (
          <Text style={styles.saveTxt}>Saving...</Text>
        ) : loading === 'quietly' ? (
          <Text style={styles.saveTxt}>Refreshing... </Text>
        ) : null}
        {console.log('print', tabItem)}
        {trail ? (
          <Space>
            {tabItem === 'Calls' ? (
              <CallResponse
                trail={trail}
                reload={get}
                saving={setSaving}
                handleTab={handleTab}
              />
            ) : null}
            {tabItem === 'Call Logs' ? <CallLogs call={trail} /> : null}
            {tabItem === 'Edit' ? (
              <EditTrail
                trail={trail}
                reload={get}
                reloading={loading}
                saving={saving}
                setSaving={setSaving}
                handleTab={handleTab}
              />
            ) : null}
            {tabItem === 'Edit Logs' ? <TrailLog trail={trail} /> : null}
          </Space>
        ) : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 3,
  },
  modalView: {
    height: '110%',
    margin: 20,
    backgroundColor: '#353546',
    borderRadius: 20,
    paddingLeft: 15,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  saveTxt: {
    alignSelf: 'flex-start',
    marginTop: 8,
    marginLeft: 'auto',
    marginRight: 16,
    color: '#4FB58E',
  },

  modalText: {
    marginBottom: 15,
  },
});

export default CallNotes;
