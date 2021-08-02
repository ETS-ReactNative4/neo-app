import React from 'react';
import {View} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import constants from '../../../../../constants/constants';
import {recordEvent} from '../../../../../Services/analytics/analyticsService';
import getTitleCase from '../../../../../Services/getTitleCase/getTitleCase';
import BookingSectionComponent from '../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent';
import resolveLinks from '../../../../../Services/resolveLinks/resolveLinks';
import {IHotelCosting} from '../../../../../TypeInterfaces/IItinerary';
import {NavigationStackProp} from 'react-navigation-stack';

export interface HotelSectionProps {
  section: {items: IHotelCosting[]};
  navigation: NavigationStackProp;
  spinValue: object;
  openDate?: boolean;
}

export interface IHotelSectionProps {
  hotel: IHotelCosting;
  isLast: boolean;
  navigation: NavigationStackProp;
  spinValue: object;
  openDate?: boolean;
}

const HotelSection = ({
  section,
  navigation,
  spinValue,
  openDate,
}: HotelSectionProps) => {
  return (
    <View>
      {section.items.map((hotel, index) => {
        let isLast = index === section.items.length - 1;

        return (
          <Hotel
            key={index}
            hotel={hotel}
            isLast={isLast}
            navigation={navigation}
            spinValue={spinValue}
            openDate={openDate}
          />
        );
      })}
    </View>
  );
};

const Hotel = ({hotel, isLast, spinValue, openDate}: IHotelSectionProps) => {
  let customStyle = {};
  if (isLast) {
    customStyle = {
      // borderBottomWidth: StyleSheet.hairlineWidth,
      paddingBottom: 16,
    };
  }

  const openVoucher = () => {
    recordEvent(constants.Bookings.event, {
      click: constants.Bookings.click.accordionVoucher,
      type: constants.Bookings.type.hotels,
    });
    // @ts-ignore
    resolveLinks(false, false, {
      voucherType: constants.hotelVoucherType,
      costingIdentifier: hotel.configKey,
    });
  };

  return (
    <BookingSectionComponent
      spinValue={spinValue}
      containerStyle={customStyle}
      isProcessing={!hotel.voucher.booked}
      onClick={openVoucher}
      content={getTitleCase(hotel.name)}
      title={
        hotel.voucher.checkInDate
          ? moment(hotel.voucher.checkInDate, 'YYYY-MM-DD').format(
              constants.commonDateFormat,
            )
          : moment(hotel.checkInDate, 'DD/MMM/YYYY').format(
              constants.commonDateFormat,
            )
      }
      isImageContain={false}
      defaultSource={constants.hotelThumbPlaceholderIllus}
      sectionImage={{uri: hotel.imageURL}}
      isDataSkipped={_.get(hotel, 'voucher.skipVoucher')}
      voucherTitle={_.get(hotel, 'voucher.title')}
      hideTitle={openDate}
    />
  );
};

export default HotelSection;
