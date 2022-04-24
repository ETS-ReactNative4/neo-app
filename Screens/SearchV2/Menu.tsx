import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Space} from '@pyt/micros';
import constants from '../../constants/constants';
import apiCall from '../../Services/networkRequests/apiCall';
import {over} from 'lodash';

const window = Dimensions.get('window');

export default function Menu({onItemSelected}) {
  const [overview, setOverview] = useState({});

  const getCount = () => {
    debugger;
    apiCall(`${constants.counts}?user_id=30_team`, {}, 'POST')
      .then(response => {
        console.log('userDetails Check', response);
        setOverview(response.counts);
      })
      .catch(res => {
        console.log(res);
      });
  };

  useEffect(() => {
    getCount();
  }, []);
  console.log('state', overview);
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <Space direction={'column'}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onItemSelected('assigned-in-30-minutes')}
          activeOpacity={0.4}>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>30mins </Text>
            <Text style={styles.menuCount}>
              {overview.assigned_in_30_minutes}
            </Text>
          </Space>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onItemSelected('best-new')}>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>Best leads </Text>
            <Text style={styles.menuCount}>{overview.best_new}</Text>
          </Space>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onItemSelected('follow-ups')}>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>Follow up </Text>
            <Text style={styles.menuCount}>{overview.follow_ups}</Text>
          </Space>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onItemSelected('defaults')}>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>Defaults </Text>
            <Text style={styles.menuCount}>{overview.defaults}</Text>
          </Space>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onItemSelected('new')}>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>MQL </Text>
            <Text style={styles.menuCount}>{overview.new}</Text>
          </Space>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onItemSelected('in-talks')}>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>SQL </Text>
            <Text style={styles.menuCount}>{overview.in_talks}</Text>
          </Space>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onItemSelected('good-lead')}>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>Good Lead </Text>
            <Text style={styles.menuCount}>{overview.good_lead}</Text>
          </Space>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onItemSelected('convert-next-week')}>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>CNW </Text>
            <Text style={styles.menuCount}>{overview.convert_next_week}</Text>
          </Space>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onItemSelected('convert-this-week')}>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>CTW </Text>
            <Text style={styles.menuCount}>{overview.convert_this_week}</Text>
          </Space>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onItemSelected('boomerang')}>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>Boomerang </Text>
            <Text style={styles.menuCount}>{overview.boomerang}</Text>
          </Space>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onItemSelected('')}>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>All</Text>
            <Text style={styles.menuCount}>{overview.all_leads}</Text>
          </Space>
        </TouchableOpacity>
      </Space>
      <Text onPress={() => onItemSelected('About')} style={styles.item}>
        About
      </Text>

      <Text onPress={() => onItemSelected('Contacts')} style={styles.item}>
        Contacts
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: '100%',
    backgroundColor: '#222232',
    padding: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#2B2B3D',
    borderRadius: 5,
    width: 200,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
  menuItem: {
    color: '#9DA4B2',
  },
  menuCount: {
    backgroundColor: '#6FCF97',
    width: 30,
    height: 20,
    borderRadius: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
  },
});
Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
