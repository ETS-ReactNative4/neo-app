import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import VoucherHeader from '../Components/VoucherHeader';
import constants from '../../../constants/constants';
import SectionHeader from '../../../CommonComponents/SectionHeader/SectionHeader';
import CircleThumbnail from '../../../CommonComponents/CircleThumbnail/CircleThumbnail';
import VoucherStickyHeader from '../Components/VoucherStickyHeader';
import VoucherName from '../Components/VoucherName';
import PassengerName from './Components/PassengerName';
import VoucherAccordion from '../Components/VoucherAccordion';
import IosCloseButton from '../Components/IosCloseButton';
import VoucherSplitSection from '../Components/VoucherSplitSection';
import moment from 'moment';
import VoucherContactActionBar from '../Components/VoucherContactActionBar';
import ErrorBoundary from '../../../CommonComponents/ErrorBoundary/ErrorBoundary';
import ViewVoucherButton from '../Components/ViewVoucherButton';
import ConditionsApplyText from '../Components/ConditionsApplyText';
import CheckInCheckOut from '../Components/CheckInCheckOut';
import _ from 'lodash';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../../assets/fontMap/hotel-amenities.json';
import VoucherAlertBox from '../Components/VoucherAlertBox/VoucherAlertBox';
import VoucherAddressSectionV2 from '../Components/VoucherAddressSectionV2/VoucherAddressSectionV2';
import {
  IAmenityDisplayList,
  IHotelCosting,
} from '../../../TypeInterfaces/IItinerary';
import {
  IPassengerDetail,
  IVoucherSplitSectionData,
} from '../types/voucherScreenTypes';
import IconComponent from '../../../CommonComponents/Icon/Icon';

const xHeight = isIphoneX()
  ? constants.xNotchHeight
  : Platform.OS === 'ios'
  ? 20
  : 0;

export interface HotelVoucherProps {
  navigation: any;
  route: {
    params: {
      hotel: IHotelCosting | {};
    };
  };
}

export interface HotelVoucherState {
  isCloseVisible: boolean;
}

@ErrorBoundary()
class HotelVoucher extends Component<HotelVoucherProps, HotelVoucherState> {
  public static navigationOptions = {
    header: null,
    gestureResponseDistance: {
      vertical: 214 + xHeight,
    },
  };

  state = {
    isCloseVisible: true,
  };

  headerToggle = (status: boolean) => {
    this.setState({
      isCloseVisible: status,
    });
  };

  close = () => {
    this.props.navigation.goBack();
  };

  render() {
    // @ts-ignore
    const hotel: IHotelCosting = this.props.route.params
      ? this.props.route.params.hotel
      : {};
    const Icon = createIconSetFromIcoMoon(icoMoonConfig);

    const {
      checkInDate,
      checkOutDate,
      name,
      roomsInHotel,
      amenityDisplayList,
      imageURL,
      mobile,
      lat,
      lon,
    } = hotel;

    const {
      rooms = [],
      hotelAddress1,
      hotelAddress2,
      checkInDate: checkInDateVoucher,
      checkInTime: checkInTimeVoucher,
      checkOutDate: checkOutDateVoucher,
      checkOutTime: checkOutTimeVoucher,
      voucherUrl,
    } = hotel.voucher || {};
    const amenitiesSection: IVoucherSplitSectionData[] = [
      {
        name: 'Hotel Amenities',
        component: amenityDisplayList ? (
          <Fragment>
            {amenityDisplayList.map(
              (amenity: IAmenityDisplayList, amenityIndex: number) => {
                const customStyle = {};
                return (
                  <View
                    key={amenityIndex}
                    style={[
                      styles.amenitiesTextWrapper,
                      amenityIndex === amenityDisplayList.length - 1
                        ? customStyle
                        : {},
                    ]}>
                    <Icon
                      name={amenity.iconUrl}
                      size={18}
                      color={constants.black2}
                    />
                    <Text style={styles.amenitiesText} key={amenityIndex}>
                      {amenity.amenityName}
                    </Text>
                  </View>
                );
              },
            )}
            <VoucherAlertBox
              alertText={constants.voucherText.hotelAmenitiesDisclaimer}
              mode={'alert'}
              containerStyle={styles.alertContainer}
            />
          </Fragment>
        ) : null,
      },
    ];

    const bookingDetailSection: IVoucherSplitSectionData[] = [
      // Removed Temporarily since data is not accurate
      // {
      //   name: "Booked on",
      //   value: bookedTime ? moment(bookedTime).format("DD MMM, YY") : "NA"
      // },
      // {
      //   name: "Booking source",
      //   value: "Pickyourtrail"
      // }
    ];

    const bookingPNR = rooms
      ? rooms.reduce(
          (pnrString: string, room: {bookingReferenceId: string}) => {
            if (pnrString) {
              pnrString += `${'\n'}, ${room.bookingReferenceId}`;
            } else {
              pnrString = room.bookingReferenceId;
            }
            return pnrString;
          },
          '',
        )
      : '';

    const stickyHeader = () => (
      <VoucherStickyHeader
        action={this.close}
        text={bookingPNR ? `Booking ID - ${bookingPNR}` : ''}
      />
    );

    const foreground = () => (
      <VoucherHeader
        infoText={'BOOKING ID'}
        title={bookingPNR}
        onClickClose={this.close}
        image={{uri: imageURL}}
        voucherUrl={voucherUrl}
      />
    );

    return (
      <Fragment>
        <ParallaxScrollView
          bounces={false}
          backgroundColor="white"
          contentBackgroundColor="white"
          parallaxHeaderHeight={214 + xHeight}
          stickyHeaderHeight={this.state.isCloseVisible ? 0 : 48 + xHeight}
          renderStickyHeader={stickyHeader}
          fadeOutForeground={Platform.OS !== 'android'}
          onChangeHeaderVisibility={this.headerToggle}
          renderForeground={foreground}>
          <CheckInCheckOut
            checkInDate={
              checkInDateVoucher
                ? moment(
                    checkInDateVoucher,
                    constants.voucherDateFormat,
                  ).format(constants.commonDateFormat)
                : moment(checkInDate, constants.costingDateFormat).format(
                    constants.commonDateFormat,
                  )
            }
            checkInTime={`${checkInTimeVoucher ||
              constants.hotelDefaultCheckInTime}*`}
            checkOutDate={
              checkOutDateVoucher
                ? moment(
                    checkOutDateVoucher,
                    constants.voucherDateFormat,
                  ).format(constants.commonDateFormatReverse)
                : moment(checkOutDate, constants.costingDateFormat).format(
                    constants.commonDateFormatReverse,
                  )
            }
            checkOutTime={`${checkOutTimeVoucher ||
              constants.hotelDefaultCheckOutTime}*`}
          />

          <VoucherName name={name} textStyle={styles.voucherNameWrapper} />

          <View style={styles.bookingDetailsRow}>
            <SectionHeader
              sectionName={'BOOKING DETAILS'}
              containerStyle={styles.bookingDetailsHeader}
            />
            {roomsInHotel &&
              roomsInHotel.map((room, roomIndex: number) => {
                let {
                  name: roomName,
                  roomImages,
                  freeBreakfast,
                  freeWireless,
                  roomConfiguration,
                  roomTypeId,
                  mealOptions = [],
                  mealType,
                  extraInclusions = [],
                } = room;
                const {adultCount, childAges} = roomConfiguration;
                const inclusionList = (extraInclusions || []).reduce(
                  (inclusion, data) => {
                    inclusion.push(...data.text);
                    return inclusion;
                  },
                  [],
                );
                const inclusionSection = [
                  {
                    name: 'Special Inclusion',
                    component: inclusionList.map((text, index) => (
                      <View style={styles.inclusionWrapper}>
                        <IconComponent
                          name={constants.checkIcon}
                          size={18}
                          color={constants.black2}
                        />
                        <Text
                          style={[
                            styles.inclusionText,
                            index === inclusionList.length - 1
                              ? styles.lastInclusionText
                              : {},
                          ]}>
                          {text}
                        </Text>
                      </View>
                    )),
                  },
                ];
                const roomVoucherDetails = rooms
                  ? rooms.find(
                      (roomDetail: {roomTypeId: string}) =>
                        roomDetail.roomTypeId === roomTypeId,
                    ) || {}
                  : {};
                let {
                  leadPassenger = {},
                  otherPassengers = [],
                  bookingReferenceId,
                } = roomVoucherDetails;

                /**
                 * Find the user's meal option if mealoptions are available.
                 * This will replace breakfast if present.
                 *
                 * - User "might" have selected a mealoption in a list of meal options.
                 */
                const mealOption = mealOptions.length
                  ? (mealOptions.find(option => option.selected) || {})
                      .mealCodeDisplayText
                  : mealType || '';

                const roomImage = roomImages
                  ? roomImages.length
                    ? {uri: roomImages[0]}
                    : {uri: constants.hotelSmallPlaceHolder}
                  : {uri: constants.hotelSmallPlaceHolder};

                const {checkIn, checkOut} = roomVoucherDetails;
                if (checkIn > 1 && checkOut > 1) {
                  freeWireless =
                    typeof roomVoucherDetails.freeWireless === 'boolean'
                      ? roomVoucherDetails.freeWireless
                      : freeWireless;
                  freeBreakfast =
                    typeof roomVoucherDetails.freeBreakFast === 'boolean'
                      ? roomVoucherDetails.freeBreakFast
                      : freeBreakfast;
                }

                const hotelAmenitySummary: IVoucherSplitSectionData[] = [
                  {
                    name: 'Booking Reference ID',
                    value: bookingReferenceId || '',
                  },
                  mealOption
                    ? {
                        name: 'Meal Option',
                        value: mealOption,
                      }
                    : {
                        name: 'Breakfast',
                        value:
                          typeof freeBreakfast === 'undefined'
                            ? ''
                            : freeBreakfast
                            ? 'Included'
                            : 'Not Included',
                      },
                  {
                    name: 'Free Wifi',
                    value:
                      typeof freeWireless === 'undefined'
                        ? ''
                        : freeWireless
                        ? 'Included'
                        : 'Not Included',
                  },
                ];

                const hasMealBeenPaid = mealOption || freeBreakfast;

                return (
                  <View key={roomIndex} style={styles.bookedSuit}>
                    <View style={styles.bookedSuitInfo}>
                      <CircleThumbnail
                        defaultImageUri={constants.hotelSmallPlaceHolder}
                        image={roomImage}
                      />

                      <View style={styles.bookedSuitDetails}>
                        <Text style={styles.bookedSuitType}>{roomName}</Text>
                        <Text
                          style={
                            styles.suitBookingDetails
                          }>{`Booked for ${adultCount} adult${
                          adultCount > 1 ? 's' : ''
                        } ${
                          childAges.length
                            ? `${childAges.length} child${
                                childAges.length > 1 ? 'ren' : ''
                              }`
                            : ''
                        }`}</Text>
                      </View>
                    </View>

                    {!_.isEmpty(leadPassenger) ? (
                      <PassengerName
                        name={`${leadPassenger.salutation}. ${leadPassenger.firstName} ${leadPassenger.lastName}`}
                      />
                    ) : null}
                    {otherPassengers &&
                      otherPassengers.map(
                        (
                          passenger: IPassengerDetail,
                          passengerIndex: number,
                        ) => {
                          return (
                            <PassengerName
                              key={passengerIndex}
                              name={`${passenger.salutation}. ${passenger.firstName} ${passenger.lastName}`}
                            />
                          );
                        },
                      )}

                    <View style={styles.hotelDetailsSection}>
                      <VoucherSplitSection sections={hotelAmenitySummary} />
                    </View>

                    {hasMealBeenPaid ? (
                      <VoucherAlertBox
                        alertText={constants.voucherText.freeBreakfastInfoText}
                        mode={'info'}
                      />
                    ) : null}
                    {inclusionList.length ? (
                      <VoucherAccordion
                        sections={inclusionSection}
                        amenitySectionStyle={styles.amenitySection}
                        amenityTextStyle={styles.amenityText}
                      />
                    ) : null}
                  </View>
                );
              })}

            {hotelAddress1 || hotelAddress2 ? (
              <VoucherAddressSectionV2
                containerStyle={styles.voucherAddressSectionWrapper}
                address={hotelAddress1 || hotelAddress2}
              />
            ) : null}

            <VoucherContactActionBar contact={mobile} location={{lat, lon}} />

            <VoucherAlertBox
              alertText={`${
                lat && lon
                  ? constants.voucherText.directionsDisclaimerText + '\n\n'
                  : ''
              }${constants.voucherText.securityDepositText}`}
              mode={'alert'}
              containerStyle={styles.alertContainer}
            />

            <VoucherAccordion sections={amenitiesSection} />

            <View style={styles.bookingSection}>
              <VoucherSplitSection sections={bookingDetailSection} />
            </View>

            <ViewVoucherButton voucherUrl={voucherUrl} />

            <ConditionsApplyText
              text={constants.voucherText.hotelTimingConditionText}
            />
          </View>
        </ParallaxScrollView>
        {Platform.OS === 'ios' && this.state.isCloseVisible ? (
          <IosCloseButton clickAction={this.close} />
        ) : null}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  bookingDetailsRow: {
    paddingHorizontal: 24,
  },
  bookedSuit: {
    marginTop: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade4,
  },
  bookedSuitInfo: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookedSuitDetails: {
    marginLeft: 8,
  },
  bookedSuitType: {
    ...constants.font17(constants.primarySemiBold),
    color: constants.black1,
  },
  suitBookingDetails: {
    ...constants.font13(constants.primaryLight),
    color: constants.black2,
  },

  hotelDetailsSection: {
    marginTop: 24,
    paddingBottom: 8,
    borderBottomWidth: 0,
    borderBottomColor: constants.shade4,
  },
  textRowWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 4,
  },
  sectionName: {
    ...constants.font17(constants.primaryLight),
    color: constants.shade2,
  },
  sectionValue: {
    ...constants.font17(constants.primaryLight),
    color: constants.black1,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade4,
  },

  alertContainer: {
    marginVertical: 8,
    borderRadius: 4,
  },

  amenitiesTextWrapper: {
    marginTop: 8,
    marginBottom: 4,
    flexDirection: 'row',
  },
  amenitiesText: {
    ...constants.fontCustom(constants.primaryLight, 18, 20),
    color: constants.black2,
    marginLeft: 8,
  },

  bookingSection: {
    marginVertical: 32,
  },
  voucherNameWrapper: {
    marginHorizontal: 24,
  },
  bookingDetailsHeader: {
    marginBottom: 0,
  },
  voucherAddressSectionWrapper: {
    marginTop: 16,
    padding: 0,
  },
  inclusionWrapper: {
    marginBottom: 4,
    flexDirection: 'row',
  },
  inclusionText: {
    ...constants.fontCustom(constants.primaryLight, 17, 20),
    color: constants.black2,
    marginLeft: 4,
  },
  lastInclusionText: {
    paddingBottom: 24,
  },
  amenitySection: {
    paddingVertical: 16,
    marginTop: 8,
  },
  amenityText: {
    ...constants.fontCustom(constants.primarySemiBold, 17, 20),
  },
});

export default HotelVoucher;
