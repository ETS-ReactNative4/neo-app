import {Space, Text} from '@pyt/micros';
import React from 'react';
import PropTypes from 'prop-types';
import {styled} from '@pyt/core/native';
import dayjs from 'dayjs';
import {startCase} from 'lodash';
import {FlatList, SafeAreaView, StyleSheet, StatusBar} from 'react-native';

const View = styled('View');

const getField = column => {
  if (column.startsWith('The ')) {
    column = column.split('The ')[1];
  }

  let field = column;

  switch (field) {
    case 'flying_from':
      field = 'Departure City';
      break;
    case 'departure':
      field = 'Departure Date';
      break;
    case 'adult':
    case 'child':
      field = `${startCase(field)} Passengers`;
      break;
    case 'SO':
    case 'owner_id':
      field = 'Sales Owner';
  }

  return startCase(field.split('_').join(' '));
};

const TrailLog = ({trail}) => {
  const {logs} = trail;

  return (
    <FlatList
      style={styles.container}
      data={logs}
      keyExtractor={log => log.id}
      renderItem={({item: log}) => {
        const {field: column, description, user, created_at} = log;
        const field = getField(column);
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
              <Text style={styles.item}>{field}</Text>
              <Space.Item alignItems="flex-end">
                <Text style={styles.usr}>{user?.username || 'Admin'}</Text>
                <Text style={styles.txt}>
                  {dayjs(created_at).format('DD-MMM-YY, HH:mm')}
                </Text>
              </Space.Item>
            </Space.Item>
            <Space.Item>
              <Text style={styles.desc}>{description}</Text>
            </Space.Item>
          </Space>
        );
      }}
    />
  );
};

TrailLog.propTypes = {
  trail: PropTypes.object,
  reload: PropTypes.func,
};
const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#2B2B3D',
    paddingBottom: 10,
  },
  container: {
    height: '85%',
    marginTop: 5,
    padding: 20,
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
});

export default TrailLog;
