import React from "react";
import { View } from "react-native";
import _ from "lodash";
import moment from "moment";
import constants from "../../../../../constants/constants";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import resolveLinks from "../../../../../Services/resolveLinks/resolveLinks";
import { NavigationTabProp } from "react-navigation-tabs";

export interface TrainDataProps {
  voucher: {
    pickupTime: number;
    booked: boolean;
    from: string;
    to: string;
  };
  dateMillis: number;
  key: string;
  text: string;
  day: string;
  mon: string;
}

export interface TrainsSectionProps {
  section: {
    items: TrainDataProps[];
  };
  navigation: NavigationTabProp;
  spinValue: {} | number;
}

const TrainsSection = ({
  section,
  navigation,
  spinValue
}: TrainsSectionProps) => {
  return (
    <View>
      {section.items.map((train: TrainDataProps, index: number) => {
        let isLast = index === section.items.length - 1;

        return (
          <Train
            key={index}
            navigation={navigation}
            train={train}
            isLast={isLast}
            spinValue={spinValue}
          />
        );
      })}
    </View>
  );
};

export interface TrainProps {
  train: TrainDataProps;
  isLast: boolean;
  navigation?: NavigationTabProp;
  spinValue: {} | number;
}

const Train = ({ train, isLast, spinValue }: TrainProps) => {
  let customStyle = {};
  if (isLast) {
    customStyle = {
      // borderBottomWidth: StyleSheet.hairlineWidth,
      paddingBottom: 16
    };
  }

  const openVoucher = () => {
    recordEvent(constants.Bookings.event, {
      click: constants.Bookings.click.accordionVoucher,
      type: constants.Bookings.type.trains
    });
    resolveLinks("", false, {
      voucherType: constants.trainVoucherType,
      costingIdentifier: train.key
    });
  };

  const { pickupTime, from = "", to = "" } = train.voucher;
  const { dateMillis } = train;

  const title: string = from && to ? `${from} to ${to}` : train.text;

  return (
    <BookingSectionComponent
      spinValue={spinValue}
      containerStyle={customStyle}
      sectionImage={{ uri: constants.miscImageBaseUrl + "transfers-train.jpg" }}
      defaultSource={{
        uri: constants.miscImageBaseUrl + "transfers-train.jpg"
      }}
      isProcessing={!train.voucher.booked}
      onClick={openVoucher}
      content={title}
      title={`${
        pickupTime && pickupTime > 1
          ? moment(pickupTime).format(constants.commonDateFormat)
          : dateMillis
          ? moment(dateMillis).format(constants.commonDateFormat)
          : moment(
              `${train.day}/${train.mon}/${constants.currentYear}`,
              "DD/MMM/YYYY"
            ).format(constants.commonDateFormat)
      }`}
      isImageContain={false}
      isDataSkipped={_.get(train, "voucher.skipVoucher")}
      voucherTitle={_.get(train, "voucher.title")}
    />
  );
};

export default TrainsSection;
