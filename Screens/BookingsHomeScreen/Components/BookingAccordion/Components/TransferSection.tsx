import React from "react";
import { View } from "react-native";
import moment from "moment";
import constants from "../../../../../constants/constants";
import _ from "lodash";
import getTransferImage from "../../../../../Services/getImageService/getTransferImage";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import resolveLinks from "../../../../../Services/resolveLinks/resolveLinks";
import { ITransferCosting } from "../../../../../TypeInterfaces/IItinerary";
import { NavigationStackProp } from "react-navigation-stack";

export interface TransferSectionProps {
  section: { items: ITransferCosting[] };
  navigation: NavigationStackProp;
  spinValue: object;
}

export interface ITransferSectionProps {
  transfer: ITransferCosting;
  isLast: boolean;
  navigation: NavigationStackProp;
  spinValue: object;
}

const TransferSection = ({
  section,
  navigation,
  spinValue
}: TransferSectionProps) => {
  return (
    <View>
      {section.items.map((transfer, index) => {
        let isLast = index === section.items.length - 1;

        return (
          <Transfer
            key={index}
            navigation={navigation}
            transfer={transfer}
            isLast={isLast}
            spinValue={spinValue}
          />
        );
      })}
    </View>
  );
};

const Transfer = ({ transfer, isLast, spinValue }: ITransferSectionProps) => {
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
      type: constants.Bookings.type.transfers
    });
    // @ts-ignore
    resolveLinks(false, false, {
      voucherType: constants.transferVoucherType,
      costingIdentifier: transfer.configKey
    });
  };

  const { pickupTime } = transfer.voucher;
  const { dateMillis } = transfer;

  const vehicle = _.toUpper(transfer.vehicle);
  const transferType = _.toUpper(transfer.type);

  return (
    <BookingSectionComponent
      spinValue={spinValue}
      containerStyle={customStyle}
      sectionImage={{ uri: getTransferImage(vehicle, transferType) }}
      defaultSource={{ uri: getTransferImage(vehicle, transferType) }}
      isProcessing={!transfer.voucher.booked}
      onClick={openVoucher}
      content={transfer.text}
      title={`${moment(
        pickupTime && pickupTime > 1 ? pickupTime : dateMillis
      ).format(constants.commonDateFormat)}`}
      isImageContain={
        vehicle === "CAR" || vehicle === "BUS" || vehicle === "SHUTTLE"
          ? true
          : false
      }
      isDataSkipped={_.get(transfer, "voucher.skipVoucher")}
      voucherTitle={_.get(transfer, "voucher.title")}
    />
  );
};

export default TransferSection;
