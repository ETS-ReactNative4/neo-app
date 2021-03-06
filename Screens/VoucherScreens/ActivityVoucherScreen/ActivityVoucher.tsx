import React, {Component, Fragment} from 'react';
import {View, StyleSheet, Platform, Text} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import VoucherHeader from '../Components/VoucherHeader';
import constants from '../../../constants/constants';
import VoucherStickyHeader from '../Components/VoucherStickyHeader';
import VoucherName from '../Components/VoucherName';
import VoucherSplitSection from '../Components/VoucherSplitSection';
import SectionHeader from '../../../CommonComponents/SectionHeader/SectionHeader';
import {inject, observer} from 'mobx-react';
import IosCloseButton from '../Components/IosCloseButton';
import VoucherAccordion from '../Components/VoucherAccordion';
// @ts-ignore
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import TitleDate from '../Components/TitleDate';
import VoucherAddressSection from '../Components/VoucherAddressSection';
import PickupInfoBox from './Components/PickupInfoBox';
import VoucherContactActionBar from '../Components/VoucherContactActionBar';
import getTitleCase from '../../../Services/getTitleCase/getTitleCase';
import ErrorBoundary from '../../../CommonComponents/ErrorBoundary/ErrorBoundary';
// @ts-ignore
import {responsiveWidth} from 'react-native-responsive-dimensions';
import _ from 'lodash';
import ViewVoucherButton from '../Components/ViewVoucherButton';
import containsHtml from '../../../Services/containsHtml/containsHtml';
import CustomHtmlView from '../../../CommonComponents/CustomHtmlView/CustomHtmlView';
import VoucherAlertBox from '../Components/VoucherAlertBox/VoucherAlertBox';
import {IActivityCombinedInfo} from '../../../mobx/Itineraries';
import PassportDetails from '../../../mobx/PassportDetails';
import {IVoucherSplitSectionData} from '../types/voucherScreenTypes';

const xHeight = isIphoneX()
  ? constants.xNotchHeight
  : Platform.OS === 'ios'
  ? 20
  : 0;

export interface ActivityVoucherProps {
  navigation: any;
  route: {
    params: {
      activity: IActivityCombinedInfo | {};
    };
  };
  passportDetailsStore: PassportDetails;
}

export interface ActivityVoucherState {
  isCloseVisible: boolean;
}

@ErrorBoundary()
@inject('passportDetailsStore')
@observer
class ActivityVoucher extends Component<
  ActivityVoucherProps,
  ActivityVoucherState
> {
  static navigationOptions = {
    header: null,
    gestureResponseDistance: {
      vertical: 1,
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
    const activity: IActivityCombinedInfo = this.props.route.params
      ? this.props.route.params.activity
      : {};
    const {openDate}: {openDate?: boolean} = this.props.route.params ?? {};
    const {
      bookingId,
      duration,
      inclusions,
      exclusions,
      contactNumber,
      activityTime,
      transferType,
      departureTimeStr,
      notes: voucherNotes,
      pickupDetail: pickupDetails, // contains array of pickup details
      activityLocation = {},
      activityAddress,
      voucherUrl,
    } = activity.voucher;
    const {
      latitude: activityLatitude,
      longitude: activityLongitude,
    } = activityLocation;
    const {
      mainPhoto,
      title,
      longDesc,
      latitude: costingLatitude,
      longitude: costingLongitude,
      free,
      selectedTourGrade,
      startingPointDetails = {image: ''},
    } = activity;
    const {image: startingPointImage = ''} = startingPointDetails;
    const {dateMillis} = activity.costing;
    const {
      inclusion: costingInclusions,
      exclusion: costingExclusions,
      departureTime,
    } = selectedTourGrade || {};
    const activityDepartureTime = moment(departureTime, 'HHmm').format(
      constants.shortTimeFormat,
    );

    const transferIncluded = transferType
      ? _.toUpper(transferType) !== constants.noTransferStatus
      : selectedTourGrade
      ? _.toUpper(selectedTourGrade.transferType) !== constants.noTransferStatus
      : false;
    const pickupDetail =
      pickupDetails && pickupDetails.length ? pickupDetails[0] : {};
    const {pickupTime, location = {}, address: pickupAddress} = pickupDetail;

    const {latitude, longitude} = location;

    const {leadPassengerName, passengerCount} = this.props.passportDetailsStore;

    let passengerDetails: IVoucherSplitSectionData[] = [];
    let transferDetails: IVoucherSplitSectionData[] = [];
    let bookingDetails: IVoucherSplitSectionData[] = [];
    let bookingDetailSections: IVoucherSplitSectionData[] = [];

    let voucherTitle = {
      header: '',
      text: '',
    };
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const totalDuration = `${hours ? `${hours} hrs ` : ''}${
      minutes ? `${minutes} mins` : ''
    }`;
    if (free) {
      passengerDetails = [
        {
          name: 'Duration',
          value: totalDuration,
        },
        /**
         * Slot will be hidden for now
         */
        // {
        //   name: "Slot",
        //   value: getTitleCase(availabilitySlot)
        // },
        {
          name: 'Starts at',
          value: departureTimeStr ? departureTimeStr : activityDepartureTime,
        },
        {
          name: 'Type',
          value: 'Self Exploration',
        },
      ];
      bookingDetailSections = [
        {
          name: 'About',
          component: (
            <View style={styles.accordionTextWrapper}>
              <HTMLView
                value={`<div>${longDesc}</div>`}
                stylesheet={constants.htmlStyleSheet}
              />
            </View>
          ),
        },
      ];
    } else {
      voucherTitle = {
        header: bookingId ? 'BOOKING ID' : '',
        text: bookingId ? bookingId : '',
      };
      if (transferIncluded) {
        transferDetails.push({
          name: 'Transfer Type',
          value: transferType
            ? getTitleCase(transferType)
            : selectedTourGrade
            ? getTitleCase(selectedTourGrade.transferType)
            : 'NA',
        });
        transferDetails.push({
          name: 'Pick up time',
          value: pickupTime
            ? pickupTime
            : selectedTourGrade && selectedTourGrade.departureTime
            ? moment(selectedTourGrade.departureTime, 'HHmm').format(
                constants.shortTimeFormat,
              )
            : 'NA',
        });
      }
      passengerDetails = _.compact([
        {
          name: 'Booked by',
          value: leadPassengerName || 'NA',
        },
        {
          name: 'No. of pax',
          value: passengerCount || 'NA',
        },
        !transferIncluded // Display activity start time only when transfer is not included
          ? {
              name: 'Starts at',
              value: departureTimeStr
                ? departureTimeStr
                : activityDepartureTime,
            }
          : null,
        {
          name: 'Duration',
          value: totalDuration,
        },
        /**
         * Slot will be hidden for now
         */
        // {
        //   name: "Slot",
        //   value: getTitleCase(availabilitySlot)
        // }
      ]);
      bookingDetailSections = [
        {
          name: 'Inclusions',
          component: (
            <View style={styles.accordionTextWrapper}>
              <HTMLView
                value={
                  inclusions ? `<div>${inclusions}</div>` : costingInclusions
                }
                stylesheet={constants.htmlStyleSheet}
              />
            </View>
          ),
        },
        {
          name: 'Exclusions',
          component: (
            <View style={styles.accordionTextWrapper}>
              <HTMLView
                value={
                  exclusions ? `<div>${exclusions}</div>` : costingExclusions
                }
                stylesheet={constants.htmlStyleSheet}
              />
            </View>
          ),
        },
        /**
         * Temporarily disabled since notes have all the info
         */
        // notes
        //   ? {
        //       name: "Instructions & notes",
        //       component: (
        //         <View style={styles.accordionTextWrapper}>
        //           <HTMLView
        //             value={`<div>${notes}</div>`}
        //             stylesheet={constants.htmlStyleSheet}
        //           />
        //         </View>
        //       )
        //     }
        //   : null,
        {
          name: 'About',
          component: (
            <View style={styles.accordionTextWrapper}>
              <HTMLView
                value={`<div>${longDesc}</div>`}
                stylesheet={constants.htmlStyleSheet}
              />
            </View>
          ),
        },
      ];
      bookingDetails = [
        // removed temporarily since not enough data in plato
        // {
        //   name: "Booked on",
        //   value: bookedTime ? moment(bookedTime).format("DD MMM, YY") : "NA"
        // },
        // {
        //   name: "Total paid",
        //   value: publishedCost ? getLocaleString(publishedCost) : "NA"
        // },
        // {
        //   name: "Booking source",
        //   value: "Pickyourtrail"
        // }
      ];
    }
    if (voucherNotes) {
      // Add notes section if Activity notes are updated in PLATO
      bookingDetailSections.unshift({
        name: 'Notes',
        component: (
          <View style={styles.accordionTextWrapper}>
            {containsHtml(voucherNotes) ? (
              <CustomHtmlView html={voucherNotes} />
            ) : (
              <Text style={styles.accordionText}>{voucherNotes}</Text>
            )}
          </View>
        ),
      });
    }
    let lat, lon;
    /**
     * Check if pickup lat and long are present for the activity
     */
    if (latitude && longitude) {
      lat = latitude;
      lon = longitude;
    } else if (!transferIncluded) {
      /**
       * If Pickup lat and long are missing, get the activity lat and long
       * However, only if transfer is not included.
       * If transfer is included & pickup lat-long is missing simply hide the button
       */
      if (activityLatitude && activityLongitude) {
        lat = activityLatitude;
        lon = activityLongitude;
      } else if (costingLatitude && costingLongitude) {
        /**
         * If no activity lat-long is provided in PLATO voucher, get default activity lat-long from costing object
         * Again, only if transfer is not included.
         */
        lat = costingLatitude;
        lon = costingLongitude;
      }
    }
    return (
      <Fragment>
        <ParallaxScrollView
          bounces={false}
          backgroundColor="white"
          contentBackgroundColor="white"
          parallaxHeaderHeight={214 + xHeight}
          stickyHeaderHeight={this.state.isCloseVisible ? 0 : 48 + xHeight}
          fadeOutForeground={Platform.OS !== 'android'}
          onChangeHeaderVisibility={this.headerToggle}
          renderStickyHeader={() => (
            <VoucherStickyHeader
              action={this.close}
              text={voucherTitle.text ? voucherTitle.text : ''}
            />
          )}
          renderForeground={() => (
            <VoucherHeader
              infoText={voucherTitle.header}
              title={voucherTitle.text}
              onClickClose={this.close}
              image={{uri: mainPhoto}}
              voucherUrl={voucherUrl}
            />
          )}>
          <View style={styles.titleSection}>
            {!openDate ? (
              <TitleDate date={activityTime > 0 ? activityTime : dateMillis} />
            ) : null}

            <VoucherName name={title} />

            <VoucherSplitSection
              sections={passengerDetails}
              rightFontStyle={styles.passengerDetailsText}
            />
          </View>

          <View style={styles.arrivalSection}>
            <SectionHeader
              sectionName={transferIncluded ? 'TRANSFER INFO' : 'LOCATION INFO'}
              containerStyle={styles.transferSectionHeader}
            />

            <VoucherSplitSection sections={transferDetails} />

            {_.toUpper(transferType) === 'SHARED' ? (
              <VoucherAlertBox
                alertText={constants.voucherText.sharedTransferInfo}
                containerStyle={styles.verticalMarginSpacing}
                mode={'alert'}
              />
            ) : null}

            {free ? (
              <VoucherAlertBox
                alertText={constants.voucherText.freeTransferInfo}
                containerStyle={styles.topMarginSpacing}
                mode={'info'}
              />
            ) : transferIncluded && pickupAddress ? (
              <PickupInfoBox />
            ) : null}
            {/**
             * TODO: The Voucher Address Section V2 cannot handle starting point images
             * Waiting for new designs to migrate this component to new UI
             */}
            <VoucherAddressSection
              containerStyle={styles.topMarginSpacing}
              address={
                pickupAddress
                  ? pickupAddress
                  : !transferIncluded
                  ? activityAddress
                  : null
              }
              startingPointImage={!transferIncluded ? startingPointImage : ''}
            />

            <VoucherContactActionBar
              contact={contactNumber}
              location={{lat, lon}}
            />

            {lat && lon ? (
              <VoucherAlertBox
                alertText={constants.voucherText.directionsDisclaimerText}
                containerStyle={styles.directionsAlertBox}
                mode={'alert'}
              />
            ) : null}
          </View>
          <View style={styles.bookingDetailsSection}>
            <VoucherAccordion
              sections={bookingDetailSections}
              openFirstSection={!!voucherNotes}
            />
            <VoucherSplitSection sections={bookingDetails} />
          </View>
          <ViewVoucherButton
            containerStyle={styles.viewVoucherButton}
            voucherUrl={voucherUrl}
          />
        </ParallaxScrollView>
        {Platform.OS === 'ios' && this.state.isCloseVisible ? (
          <IosCloseButton clickAction={this.close} />
        ) : null}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  titleSection: {
    marginTop: 16,
    paddingHorizontal: 24,
  },
  arrivalSection: {
    marginTop: 16,
    paddingHorizontal: 24,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade4,
  },
  bookingDetailsSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  accordionTextWrapper: {
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade4,
  },
  accordionText: {
    width: responsiveWidth(100) - 48,
    ...constants.fontCustom(constants.primaryLight, 17),
    color: constants.black2,
  },
  viewVoucherButton: {
    alignSelf: 'center',
  },
  directionsAlertBox: {marginVertical: 8},
  topMarginSpacing: {marginTop: 8},
  verticalMarginSpacing: {marginVertical: 8},
  transferSectionHeader: {marginBottom: 0},
  passengerDetailsText: {width: responsiveWidth(50) - 24},
});

export default ActivityVoucher;
