import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from '../../../CommonComponents/Icon/Icon';
import constants from '../../../constants/constants';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import PropTypes from 'prop-types';
import LightBoxButton from '../../../CommonComponents/LightBoxButton/LightBoxButton';
// import PhotoView from "react-native-photo-view-ex";
import ImageView from 'react-native-image-view';
const VoucherAddressSection = ({
  address = '',
  containerStyle = StyleSheet.create({}),
  startingPointImage = '',
}) => {
  if (!containerStyle) {
    containerStyle = {};
  }
  return (
    <View style={[styles.voucherAddressSectionContainer, containerStyle]}>
      {address ? (
        <View style={styles.addressContainer}>
          <View style={styles.addressSection}>
            <Text style={styles.hotelAddress} ellipsizeMode={'tail'}>
              {address}
            </Text>
          </View>
          <View style={styles.addressMarkerSection}>
            <Icon
              size={24}
              color={constants.black1}
              name={constants.locationIcon}
            />
          </View>
        </View>
      ) : null}
      {startingPointImage ? (
        <LightBoxButton
          LightBoxComponent={() => {
            return (
              <ImageView
                images={[
                  {
                    source: {
                      uri: startingPointImage,
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
          containerStyle={{
            width: responsiveWidth(60),
          }}
          textStyle={{
            fontFamily: constants.primaryRegular,
          }}
          text={'STARTING POINT PHOTO'}
          color={'transparent'}
          textColor={constants.firstColor}
        />
      ) : null}
    </View>
  );
};

VoucherAddressSection.propTypes = {
  address: PropTypes.string.isRequired,
  containerStyle: PropTypes.object.isRequired,
  startingPointImage: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  voucherAddressSectionContainer: {},
  addressContainer: {
    flexDirection: 'row',
  },
  addressSection: {
    width: responsiveWidth(80),
  },
  hotelAddress: {
    fontFamily: constants.primaryLight,
    fontSize: 17,
    color: constants.black1,
  },
  addressMarkerSection: {
    flex: 1,
  },
  addressMarker: {
    height: 24,
    width: 24,
  },
});

export default VoucherAddressSection;
