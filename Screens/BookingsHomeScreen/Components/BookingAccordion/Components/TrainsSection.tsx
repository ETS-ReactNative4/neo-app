import React from 'react';
import {View} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import constants from '../../../../../constants/constants';
import {recordEvent} from '../../../../../Services/analytics/analyticsService';
import BookingSectionComponent from '../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent';
import resolveLinks from '../../../../../Services/resolveLinks/resolveLinks';
import {ITrainCosting} from '../../../../../TypeInterfaces/IItinerary';
import {NavigationStackProp} from 'react-navigation-stack';

export interface TrainsSectionProps {
  section: {items: ITrainCosting[]};
  navigation: NavigationStackProp;
  spinValue: object;
  openDate?: boolean;
}

export interface ITrainsSectionProps {
  train: ITrainCosting;
  isLast: boolean;
  navigation: NavigationStackProp;
  spinValue: object;
  openDate?: boolean;
}

const TrainsSection = ({
  section,
  navigation,
  spinValue,
  openDate,
}: TrainsSectionProps) => {
  return (
    <View>
      {section.items.map((train, index: number) => {
        let isLast = index === section.items.length - 1;
        return (
          <Train
            key={index}
            navigation={navigation}
            train={train}
            isLast={isLast}
            spinValue={spinValue}
            openDate={openDate}
          />
        );
      })}
    </View>
  );
};

const Train = ({train, isLast, spinValue, openDate}: ITrainsSectionProps) => {
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
      type: constants.Bookings.type.trains,
    });
    resolveLinks('', false, {
      voucherType: constants.trainVoucherType,
      costingIdentifier: train.configKey,
    });
  };

  const {pickupTime, from = '', to = ''} = train.voucher;
  const {dateMillis} = train;

  const title: string = from && to ? `${from} to ${to}` : train.text;

  return (
    <BookingSectionComponent
      spinValue={spinValue}
      containerStyle={customStyle}
      sectionImage={{uri: constants.miscImageBaseUrl + 'transfers-train.jpg'}}
      defaultSource={{
        uri: constants.miscImageBaseUrl + 'transfers-train.jpg',
      }}
      isProcessing={!train.voucher.booked}
      onClick={openVoucher}
      content={title}
      title={`${
        pickupTime && pickupTime > 1
          ? moment.utc(pickupTime).format(constants.commonDateFormat)
          : dateMillis
          ? moment.utc(dateMillis).format(constants.commonDateFormat)
          : moment
              .utc(
                `${train.day}/${train.mon}/${constants.currentYear}`,
                'DD/MMM/YYYY',
              )
              .format(constants.commonDateFormat)
      }`}
      isImageContain={false}
      isDataSkipped={_.get(train, 'voucher.skipVoucher')}
      voucherTitle={_.get(train, 'voucher.title')}
      hideTitle={openDate}
    />
  );
};

export default TrainsSection;
