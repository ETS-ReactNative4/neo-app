import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import constants from "../../constants/constants";
import PropTypes from 'prop-types';

const SectionHeader = ({sectionName, containerStyle}) => {

  if(!containerStyle) containerStyle = {};

  return(
    <View style={[styles.sectionContainer, containerStyle]}>
      <View style={styles.textContainer}>
        <Text style={styles.sectionName}>{sectionName}</Text>
      </View>
    </View>
  );
};

SectionHeader.propTypes = {
  sectionName: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 21,
    marginBottom: 14,
    height: 33,
    borderBottomWidth: 1,
    borderBottomColor: constants.shade4,
    justifyContent: 'flex-end',
  },
  textContainer: {
    paddingBottom: 13,
    alignSelf: 'flex-start',
    borderBottomWidth: 2,
    borderBottomColor: constants.black2,
  },
  sectionName: {
    fontFamily: constants.primaryFont,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "600",
    color: constants.black2,
  },
});

export default SectionHeader;
