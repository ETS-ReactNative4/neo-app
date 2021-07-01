import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
} from '../../../constants/fonts';
import {CONSTANT_hotelIcon} from '../../../constants/imageAssets';
import BetterImage from '../../../CommonComponents/BetterImage/BetterImage';
import Icon from '../../../CommonComponents/Icon/Icon';
import getImgIXUrl from '../../../Services/getImgIXUrl/getImgIXUrl';

type ThemeCardProps = {
  action?: () => unknown;
  boxContainerStyle?: object;
  containerStyle?: object;
  title?: string;
  image?: string;
  icon?: string;
};
export const ThemeCard = ({
  action = () => null,
  boxContainerStyle = {},
  containerStyle = {},
  title,
  image,
  icon,
}: ThemeCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action}
      style={[styles.container, containerStyle]}>
      <View style={[styles.boxContainer, boxContainerStyle]}>
        {image ? (
          <BetterImage
            source={{
              uri: getImgIXUrl({
                src: image,
                imgFactor: `h=${boxContainerStyle.height ||
                  100}&w=${boxContainerStyle.width || 100}&crop=fit`,
                q: 100,
              }),
            }}
            resizeMode="cover"
            thumbnailSource={{
              uri: image,
            }}
            containerStyle={styles.image}
          />
        ) : icon ? (
          <Icon name={icon} size={16} color={'#00774F'} />
        ) : null}
      </View>
      {title ? (
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 12,
  },
  boxContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#E5F9F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  title: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14, 18),
    color: '#333333',
    marginTop: 8,
  },
});
