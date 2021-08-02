import {Text, StyleSheet} from 'react-native';
import React from 'react';
import constants from '../../../constants/constants';
import PropTypes from 'prop-types';
import moment from 'moment';
import forbidExtraProps from '../../../Services/PropTypeValidation/forbidExtraProps';

const TitleDate = ({date}) => {
  return (
    <Text style={styles.dateText}>
      {moment.utc(date).format(constants.commonDateFormat)}
    </Text>
  );
};

TitleDate.propTypes = forbidExtraProps({
  date: PropTypes.number.isRequired,
});

const styles = StyleSheet.create({
  dateText: {
    marginBottom: 8,
    ...constants.fontCustom(constants.primarySemiBold, 15),
    color: constants.thirdColor,
  },
});

export default TitleDate;
