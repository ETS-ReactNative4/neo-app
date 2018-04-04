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
      <View style={styles.placeholder}/>
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
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  textContainer: {
    alignSelf: 'flex-start',
    borderBottomWidth: 2,
    height: 33,
    borderBottomColor: constants.black2,
  },
  placeholder: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: constants.shade4,
  },
  sectionName: {
    fontFamily: constants.primaryFont,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "600",
    alignSelf: 'flex-end',
    color: constants.black2,
    paddingBottom: 13,
  },
});

export default SectionHeader;
