import {Space, Text} from '@pyt/micros';
import React from 'react';
import PropTypes from 'prop-types';
import {styled} from '@pyt/core/native';
import dayjs from 'dayjs';
import {startCase} from 'lodash';
import {FlatList, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {CONSTANT_callStartIcon} from '../../../constants/imageAssets';
import Icon from '../../../CommonComponents/Icon/Icon';

//   let field = column

//   switch (field) {
//     case 'flying_from':
//       field = 'Departure City'
//       break
//     case 'departure':
//       field = 'Departure Date'
//       break
//     case 'adult':
//     case 'child':
//       field = `${startCase(field)} Passengers`
//       break
//     case 'SO':
//     case 'owner_id':
//       field = 'Sales Owner'
//   }

//   return startCase(field.split('_').join(' '))
// }

const CallLogs = ({call}) => {
  const {calls} = call;

  const Call = ({call}) => {
    const {
      call_response: {name: callResponse, id: callResponseId},
      user: {username},
      call_date_time,
      cal_desc,
      follow_on,
      pre_sales_note,
      is_itinerary_shared,
    } = call;
    console.log('inside the call', callResponseId);
    return (
      <Space
        marginBottom={24}
        width="100%"
        direction="column"
        gutter={[8, 8, 24]}
        style={styles.itemContainer}>
        <Space.Item
          flexDirection="row"
          justifyContent="space-between"
          width="100%">
          <Text style={styles.item}>
            {callResponseId === 5 && is_itinerary_shared === 1
              ? 'Itinerary Shared'
              : callResponse}
          </Text>
          <Space.Item alignItems="flex-end">
            <Text style={styles.usr}>{username}</Text>
            <Text style={styles.txt}>
              {dayjs(call_date_time).format('DD-MMM-YY, HH:mm')}
            </Text>
          </Space.Item>
        </Space.Item>
        <Space.Item>
          <Text style={styles.desc}>{cal_desc}</Text>
          <Text style={styles.follow}>
            {' '}
            <Icon style={styles.call} name={CONSTANT_callStartIcon} />
            {follow_on
              ? dayjs(follow_on).format('DD-MMM-YY, HH:mm')
              : 'No FU set'}
          </Text>
        </Space.Item>
      </Space>
    );
  };
  const renderItem = ({item}) => <Call call={item} key={item.call_id} />;
  return (
    <FlatList
      style={styles.container}
      data={calls}
      keyExtractor={call => call.call_id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#2B2B3D',
    paddingBottom: 10,
  },
  container: {
    height: '80%',
    marginTop: 5,
    padding: 20,
    paddingBottom: 10,
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#2B2B3D',
    padding: 10,
    borderRadius: 4,
    color: '#B3B3B3',
  },
  usr: {
    color: '#B3B3B3',
    fontWeight: 'bold',
  },
  txt: {
    color: '#B3B3B3',
  },
  desc: {
    color: '#B3B3B3',
    fontSize: 12,
  },
  follow: {
    color: '#817e7e',
  },
  call: {
    fontSize: 18,
    padding: 5,
  },
});

export default CallLogs;
