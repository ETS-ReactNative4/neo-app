import React, { useState, Fragment } from "react";
import { Platform, StyleSheet, ViewStyle } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../../constants/constants";
import ErrorBoundary from "../../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { NavigationStackProp } from "react-navigation-stack";
import { IHotelCostingInterface } from "../../../TypeInterfaces/IHotelCostingInterface";
// @ts-ignore
import ParallaxScrollView from "react-native-parallax-scroll-view";
import VoucherStickyHeader from "../Components/VoucherStickyHeader";
import VoucherHeaderV2 from "../Components/VoucherHeaderV2/VoucherHeaderV2";
import VoucherListItem from "../Components/VoucherListItem/VoucherListItem";
import moment from "moment";
import VoucherButton from "../Components/VoucherButton/VoucherButton";
import { recordEvent } from "../../../Services/analytics/analyticsService";
import openCustomTab from "../../../Services/openCustomTab/openCustomTab";

export interface HotelVoucherV2Props {
  containerStyle?: ViewStyle;
  navigation: NavigationStackProp<{ hotel: IHotelCostingInterface }>;
}

const xHeight: number = isIphoneX()
  ? constants.xNotchHeight
  : Platform.OS === "ios"
  ? 20
  : 0;

const HotelVoucherV2 = ({ navigation }: HotelVoucherV2Props) => {
  const hotel: IHotelCostingInterface = navigation.getParam("hotel", {});

  const [isCloseVisible, setCloseVisibility] = useState(true);

  const headerToggle = (status: boolean): void => {
    setCloseVisibility(status);
  };

  const close = (): void => {
    navigation.goBack();
  };

  const { checkInDate, checkOutDate, name, imageURL } = hotel;

  const {
    rooms,
    checkInDate: checkInDateVoucher,
    checkInTime: checkInTimeVoucher,
    checkOutDate: checkOutDateVoucher,
    checkOutTime: checkOutTimeVoucher,
    voucherUrl
  } = hotel.voucher;

  const bookingPNR = rooms
    ? rooms.reduce((pnrString, room) => {
        if (pnrString) {
          pnrString += `${"\n"}, ${room.bookingReferenceId}`;
        } else {
          pnrString = room.bookingReferenceId;
        }
        return pnrString;
      }, "")
    : "";

  const voucherTitle: string = name;

  const hotelOverview = [
    {
      name: "Property",
      value: name
    },
    {
      name: "Booking ID",
      value: bookingPNR
    },
    {
      name: "Check in",
      value: checkInDateVoucher
        ? moment(checkInDateVoucher, constants.voucherDateFormat).format(
            constants.commonDateFormat
          )
        : moment(checkInDate, constants.costingDateFormat).format(
            constants.commonDateFormat
          ) +
          " - " +
          `${checkInTimeVoucher || constants.hotelDefaultCheckInTime}*`
    },
    {
      name: "Check out",
      value: checkOutDateVoucher
        ? moment(checkOutDateVoucher, constants.voucherDateFormat).format(
            constants.commonDateFormatReverse
          )
        : moment(checkOutDate, constants.costingDateFormat).format(
            constants.commonDateFormatReverse
          ) +
          " - " +
          `${checkOutTimeVoucher || constants.hotelDefaultCheckOutTime}*`
    }
  ];

  const viewVoucher = () => {
    recordEvent(constants.voucherHeaderViewVoucherClick);
    openCustomTab(voucherUrl);
    return null;
  };

  return (
    <Fragment>
      <ParallaxScrollView
        bounces={false}
        backgroundColor="white"
        contentBackgroundColor={constants.white1}
        parallaxHeaderHeight={214 + xHeight}
        stickyHeaderHeight={isCloseVisible ? 0 : 48 + xHeight}
        renderStickyHeader={() => (
          <VoucherStickyHeader action={close} text={voucherTitle} />
        )}
        fadeOutForeground={Platform.OS !== "android"}
        onChangeHeaderVisibility={headerToggle}
        renderForeground={() => (
          <VoucherHeaderV2
            title={voucherTitle}
            backAction={close}
            coverImage={{ uri: imageURL }}
          />
        )}
      >
        {hotelOverview.map((item, itemIndex) => {
          return (
            <VoucherListItem
              key={itemIndex}
              containerStyle={styles.listItemContainer}
              name={item.name}
              value={item.value}
            />
          );
        })}
        {voucherUrl ? (
          <VoucherButton
            containerStyle={styles.listItemContainer}
            cta={"View Voucher"}
            action={viewVoucher}
          />
        ) : null}
      </ParallaxScrollView>
    </Fragment>
  );
};

HotelVoucherV2.navigationOptions = {
  header: null,
  gestureResponseDistance: {
    vertical: 214 + xHeight
  }
};

export interface HotelVoucherV2Styles {
  voucherContainer: ViewStyle;
  listItemContainer: ViewStyle;
}

const styles = StyleSheet.create<HotelVoucherV2Styles>({
  voucherContainer: {},
  listItemContainer: { paddingHorizontal: 24, backgroundColor: "white" }
});

// @ts-ignore
export default ErrorBoundary()(HotelVoucherV2);
