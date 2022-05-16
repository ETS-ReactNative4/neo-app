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

export default function Menu({onItemSelected, countOverview}) {
  useEffect(() => {}, []);

  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <Space direction={'column'}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            onItemSelected(
              'assigned-in-30-minutes',
              countOverview.assigned_in_30_minutes,
            )
          }
          activeOpacity={0.4}>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>30mins </Text>
            <Text style={styles.menuCount}>
              {countOverview.assigned_in_30_minutes}
            </Text>
          </Space>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onItemSelected('best-new', countOverview.best_new)}>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>Best leads </Text>
            <Text style={styles.menuCount}>{countOverview.best_new}</Text>
          </Space>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            onItemSelected('follow-ups', countOverview.follow_ups)
          }>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>Follow up </Text>
            <Text style={styles.menuCount}>{countOverview.follow_ups}</Text>
          </Space>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onItemSelected('defaults', countOverview.defaults)}>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>Defaults </Text>
            <Text style={styles.menuCount}>{countOverview.defaults}</Text>
          </Space>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onItemSelected('new')}>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>MQL </Text>
            <Text style={styles.menuCount}>{countOverview.new}</Text>
          </Space>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onItemSelected('in-talks', countOverview.in_talks)}>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>SQL </Text>
            <Text style={styles.menuCount}>{countOverview.in_talks}</Text>
          </Space>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onItemSelected('good-lead', countOverview.good_lead)}>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>Good Lead </Text>
            <Text style={styles.menuCount}>{countOverview.good_lead}</Text>
          </Space>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            onItemSelected('convert-next-week', countOverview.convert_next_week)
          }>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>CNW </Text>
            <Text style={styles.menuCount}>
              {countOverview.convert_next_week}
            </Text>
          </Space>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            onItemSelected('convert-this-week', countOverview.convert_next_week)
          }>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>CTW </Text>
            <Text style={styles.menuCount}>
              {countOverview.convert_this_week}
            </Text>
          </Space>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onItemSelected('boomerang', countOverview.boomerang)}>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>Boomerang </Text>
            <Text style={styles.menuCount}>{countOverview.boomerang}</Text>
          </Space>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onItemSelected('', countOverview.all_leads)}>
          <Space justifyContent={'space-between'}>
            <Text style={styles.menuItem}>All</Text>
            <Text style={styles.menuCount}>{countOverview.all_leads}</Text>
          </Space>
        </TouchableOpacity>
      </Space>
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
