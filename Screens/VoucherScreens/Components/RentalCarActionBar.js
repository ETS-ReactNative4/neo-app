import React from 'react';
import {View, StyleSheet} from 'react-native';
import SimpleButton from '../../../CommonComponents/SimpleButton/SimpleButton';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import constants from '../../../constants/constants';
import dialer from '../../../Services/dialer/dialer';
import PropTypes from 'prop-types';
import forbidExtraProps from '../../../Services/PropTypeValidation/forbidExtraProps';
import LightBoxButton from '../../../CommonComponents/LightBoxButton/LightBoxButton';
// import PhotoView from "react-native-photo-view-ex";
import ImageView from 'react-native-image-view';

const doesContainNumber = contact => /\d/.test(contact);

const RentalCarActionBar = ({contact, imageUrl}) => {
  return (
    <View style={styles.actionRow}>
      {imageUrl ? (
        <LightBoxButton
          LightBoxComponent={() => {
            return (
              <ImageView
                images={[
                  {
                    source: {
                      uri: imageUrl,
                    },
                    title: '',
                    height: responsiveHeight(100),
                    width: responsiveWidth(100),
                  },
                ]}
                imageIndex={0}
                isVisible={true}
              />
            );
          }}
          containerStyle={
            doesContainNumber(contact)
              ? {width: responsiveWidth(40)}
              : {width: responsiveWidth(100) - 48}
          }
          text={'Visual Directions'}
          hasBorder={true}
          color={'transparent'}
          textColor={constants.firstColor}
        />
      ) : null}
      {doesContainNumber(contact) ? (
        <SimpleButton
          text={'Contact'}
          containerStyle={
            imageUrl
              ? {width: responsiveWidth(40)}
              : {width: responsiveWidth(100) - 48}
          }
          action={() => dialer(contact)}
          color={'transparent'}
          textColor={constants.firstColor}
          hasBorder={true}
          icon={constants.callIcon}
          iconSize={16}
        />
      ) : null}
    </View>
  );
};

RentalCarActionBar.propTypes = forbidExtraProps({
  contact: PropTypes.number,
  imageUrl: PropTypes.string,
});

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade4,
  },
});

export default RentalCarActionBar;
