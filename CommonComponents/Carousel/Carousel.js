import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  ImageBackground,
  Text,
} from 'react-native';
import constants from "../../constants/constants";
import PropTypes from "prop-types";

const Box = ({data}) => {
  return(
    <View style={styles.box}>
      <TouchableHighlight
        onPress={data.action}
        underlayColor={'transparent'}
        style={styles.touchable}>
        <ImageBackground style={styles.imageBackground} source={data.image}>
          <Text style={styles.boxTitle}>{data.title}</Text>
        </ImageBackground>
      </TouchableHighlight>
    </View>
  );
};

Box.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]).isRequired,
    action: PropTypes.func.isRequired,
  }).isRequired,
};

const Carousel = ({containerStyle, data}) => {
  return (
    <View style={[styles.scrollContainer, containerStyle]}>
      <ScrollView horizontal={true} style={styles.scrollView} contentContainerStyle={{alignItems: 'center'}}>
        {
          data.map((item, index) => {
            return (
              <Box
                key={index}
                data={item}
              />
            );
          })
        }
      </ScrollView>
    </View>
  );
};

Carousel.propTypes = {
  containerStyle: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([
      PropTypes.object.isRequired,
      PropTypes.number.isRequired,
    ]),
    action: PropTypes.func.isRequired,
  })).isRequired,
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: 160,
  },
  scrollView: {
  },
  box: {
    height: 160,
    width: 160,
    overflow: 'hidden',
    borderRadius: 5,
    marginRight: 8,
  },
  touchable: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent:'flex-end'
  },
  boxTitle: {
    margin: 8,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    lineHeight: 24,
  },
});

export default Carousel;
