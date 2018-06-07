import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const ToPack = ({listItems}) => {
  return (
    <ScrollView>
      {
        listItems.map((item, index) => {
          return (
            <TouchableHighlight
              style={styles.touchableContainer} key={index}>
              <View style={styles.container}>
                <View style={styles.checkbox}/>
                <Text>{item.item}</Text>
              </View>
            </TouchableHighlight>
          )
        })
      }
    </ScrollView>
  )
};

ToPack.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    item: PropTypes.string.isRequired,
    isComplete: PropTypes.bool.isRequired,
  })).isRequired,
};

const styles = StyleSheet.create({
  touchableContainer: {
    minHeight: 24,
    paddingHorizontal: 24,
    marginVertical: 16,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  checkbox: {
    height: 16,
    width: 16,
    backgroundColor: 'rgba(121,5,114,0.1)'
  },
});

export default ToPack;
