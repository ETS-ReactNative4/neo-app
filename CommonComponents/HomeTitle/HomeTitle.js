import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {CONSTANT_pytLogo} from '../../constants/imageAssets';

const HomeTitle = () => {
  return (
    <Image
      style={styles.image}
      resizeMode={'contain'}
      source={CONSTANT_pytLogo}
    />
  );
};

const styles = StyleSheet.create({
  image: {height: 22, width: 177},
});

export default HomeTitle;
