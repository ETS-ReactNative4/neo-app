import React, {
  Component,
} from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import constants from "../../constants/constants";
import SectionHeader from "../../CommonComponents/SectionHeader/SectionHeader";

class Tools extends Component {
  render() {
    return(
      <View style={styles.container}>

        <SectionHeader sectionName={'CITY GUIDES'}/>

        <SectionHeader sectionName={'ESSENTIALS'} containerStyle={{marginTop: 43}}/>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.appBackgroundColor,
    paddingHorizontal: 24,
  },
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

export default Tools;
