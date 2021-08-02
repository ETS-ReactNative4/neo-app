import React from 'react';
import {View} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import constants from '../../../../../constants/constants';
import getTransferImage from '../../../../../Services/getImageService/getTransferImage';
import {recordEvent} from '../../../../../Services/analytics/analyticsService';
import BookingSectionComponent from '../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent';
import resolveLinks from '../../../../../Services/resolveLinks/resolveLinks';
import {IFerryCosting} from '../../../../../TypeInterfaces/IItinerary';
import {NavigationStackProp} from 'react-navigation-stack';

export interface FerriesSectionProps {
  section: {items: IFerryCosting[]};
  navigation: NavigationStackProp;
  spinValue: object;
  openDate?: boolean;
}

export interface IFerrySectionProps {
  ferry: IFerryCosting;
  isLast: boolean;
  navigation: NavigationStackProp;
  spinValue: object;
  openDate?: boolean;
}

const FerriesSection = ({
  section,
  navigation,
  spinValue,
  openDate,
}: FerriesSectionProps) => {
  return (
    <View>
      {section.items.map((ferry, index) => {
        let isLast = index === section.items.length - 1;

        return (
          <Ferry
            key={index}
            navigation={navigation}
            ferry={ferry}
            isLast={isLast}
            spinValue={spinValue}
            openDate={openDate}
          />
        );
      })}
    </View>
  );
};

const Ferry = ({ferry, isLast, spinValue, openDate}: IFerrySectionProps) => {
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
      type: constants.Bookings.type.ferries,
    });
    // @ts-ignore
    resolveLinks(false, false, {
      voucherType: constants.ferryVoucherType,
      costingIdentifier: ferry.configKey,
    });
  };

  const {pickupTime} = ferry.voucher;
  const {dateMillis} = ferry;

  return (
    <BookingSectionComponent
      spinValue={spinValue}
      sectionImage={{uri: getTransferImage('FERRY')}}
      defaultSource={{uri: getTransferImage('FERRY')}}
      containerStyle={customStyle}
      isProcessing={!ferry.voucher.booked}
      onClick={openVoucher}
      content={ferry.text}
      title={`${
        pickupTime && pickupTime > 1
          ? moment(pickupTime).format(constants.commonDateFormat)
          : dateMillis
          ? moment.utc(dateMillis).format(constants.commonDateFormat)
          : moment
              .utc(
                `${ferry.day}/${ferry.mon}/${constants.currentYear}`,
                'DD/MMM/YYYY',
              )
              .format(constants.commonDateFormat)
      }`}
      isImageContain={false}
      isDataSkipped={_.get(ferry, 'voucher.skipVoucher')}
      voucherTitle={_.get(ferry, 'voucher.title')}
      hideTitle={openDate}
    />
  );
};

export default FerriesSection;
