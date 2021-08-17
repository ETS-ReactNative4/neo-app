import React from 'react';
import constants from '../../../../constants/constants';
import {inject, observer} from 'mobx-react';
import getSlotImage from '../../../../Services/getImageService/getSlotImage';
import CityCard from '../CityCard';
import moment from 'moment';
import SectionHeader from '../../../../CommonComponents/SectionHeader/SectionHeader';
import _ from 'lodash';
import {recordEvent} from '../../../../Services/analytics/analyticsService';
import BookingSectionComponent from '../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent';
import resolveLinks from '../../../../Services/resolveLinks/resolveLinks';
import getTransferImage from '../../../../Services/getImageService/getTransferImage';
import {StyleSheet, ViewStyle} from 'react-native';
import {
  ICity,
  IFlightCosting,
  IIterSlotByKey,
  IRentalCarCosting,
  ITransferCosting,
} from '../../../../TypeInterfaces/IItinerary';
import {NavigationStackProp} from 'react-navigation-stack';
import Itineraries, {
  IActivityCombinedInfo,
  IItineraryCityDetail,
} from '../../../../mobx/Itineraries';
import {SCREEN_PLACES} from '../../../../NavigatorsV2/ScreenNames';

export interface SlotActivityProps {
  activity: IIterSlotByKey;
  navigation: NavigationStackProp;
  day: Date;
  activityIndex: number;
  spinValue: object;
  itineraries: Itineraries;
  openDate?: boolean;
}

export interface ICityCardData {
  cityImage: {uri: string};
  action: () => any;
  cityName: string;
  activityText: string;
}

let internationalFlightKey: string, city: IItineraryCityDetail;
const SlotActivity = ({
  activity,
  navigation,
  itineraries,
  activityIndex,
  day,
  spinValue,
  openDate,
}: SlotActivityProps) => {
  const {
    getActivityById,
    getCityById,
    cities,
    getFlightById,
    getTransferFromAllById,
    getCityOrderById,
    getRentalCarByCityOrder,
  } = itineraries;
  let onClick: (city?: IItineraryCityDetail) => any = () => null;
  let imageObject;
  let currentCity: IItineraryCityDetail | ICity,
    cityCardData: ICityCardData,
    cityId: number;
  switch (activity.type) {
    case 'INTERNATIONAL_ARRIVE':
      currentCity = itineraries.cities[0];
      cityId = currentCity.cityObject ? currentCity.cityObject.cityId : 0;
      cityCardData = {
        cityImage: {uri: currentCity.cityObject.image},
        action: () =>
          navigation.navigate(SCREEN_PLACES, {
            city: cityId,
          }),
        cityName: currentCity.city,
        activityText: activity.arrivalSlotDetail.transferIndicatorText,
      };
      break;

    case 'INTERCITY_TRANSFER':
      currentCity = getCityById(activity.intercityTransferSlotDetailVO.toCity);
      city = _.find(cities, {
        city: currentCity.cityName,
      }) as IItineraryCityDetail;
      cityId = city.cityObject ? city.cityObject.cityId : 0;
      cityCardData = {
        cityImage: {
          uri: currentCity.image,
        },
        action: () =>
          navigation.navigate(SCREEN_PLACES, {
            city: cityId,
          }),
        cityName: currentCity.cityName,
        activityText:
          activity.intercityTransferSlotDetailVO.directTransferDetail
            .transferIndicatorText,
      };
      break;

    case 'ACTIVITY_WITH_TRANSFER':
      currentCity = getCityById(activity.intercityTransferSlotDetailVO.toCity);
      city = _.find(cities, {
        city: currentCity.cityName,
      }) as IItineraryCityDetail;
      cityId = city.cityObject ? city.cityObject.cityId : 0;
      let transferIndicatorText = '';
      const {intercityTransferSlotDetailVO: interCityTransferDetail} = activity;
      if (_.toUpper(interCityTransferDetail.transferType) === 'DIRECT') {
        transferIndicatorText =
          interCityTransferDetail.directTransferDetail.transferIndicatorText;
      } else if (
        _.toUpper(interCityTransferDetail.transferType) === 'TRANSIT'
      ) {
        transferIndicatorText =
          interCityTransferDetail.transitTransferDetail.transferIndicatorText;
      }
      cityCardData = {
        cityImage: {
          uri: currentCity.image,
        },
        action: () =>
          navigation.navigate(SCREEN_PLACES, {
            city: cityId,
          }),
        cityName: currentCity.cityName,
        activityText: transferIndicatorText,
      };
      break;

    default:
      break;
  }

  const SlotRow = ({containerStyle}: {containerStyle: ViewStyle}) => {
    switch (activity.type) {
      case 'INTERNATIONAL_ARRIVE':
        internationalFlightKey = activity.arrivalSlotDetail.flightCostingKey;
        imageObject = getSlotImage(internationalFlightKey, 'FLIGHT');
        const flight: IFlightCosting = internationalFlightKey
          ? (getFlightById(internationalFlightKey) as IFlightCosting)
          : ({} as IFlightCosting);
        if (!internationalFlightKey) {
          return null;
        }
        onClick = () => {
          if (flight.status !== constants.voucherSuccessStatus) {
            return null;
          }
          recordEvent(constants.BookedItinerary.event, {
            click: constants.BookedItinerary.click.voucher,
            type: constants.BookedItinerary.type.flight,
          });
          // @ts-ignore
          resolveLinks(false, false, {
            voucherType: constants.flightVoucherType,
            costingIdentifier: flight.configKey,
          });
        };
        return (
          <BookingSectionComponent
            containerStyle={[containerStyle, styles.horizontalMarginSpacing]}
            title={activity.name}
            content={activity.arrivalSlotDetail.slotText}
            sectionImage={{uri: imageObject.image}}
            isImageContain={true}
            onClick={onClick}
            contentNumberOfLines={3}
            defaultSource={constants.flightLogoPlaceholderIllus}
            isProcessing={
              flight.status === constants.voucherSuccessStatus &&
              !(flight.voucher && flight.voucher.booked)
            }
            spinValue={spinValue}
            isDataSkipped={_.get(flight, 'voucher.skipVoucher')}
            voucherTitle={_.get(flight, 'voucher.title')}
          />
        );

      case 'LEISURE':
        onClick = (cityDetail?: IItineraryCityDetail) => {
          navigation.navigate('LeisureScreen', {
            city: cityDetail,
          });
        };
        return (
          <BookingSectionComponent
            containerStyle={[containerStyle, styles.horizontalMarginSpacing]}
            title={activity.name}
            content={activity.leisureSlotDetail.text}
            sectionImage={constants.leisureIcon}
            isProcessing={false}
            onClick={() => onClick(city)}
            defaultSource={constants.activityThumbPlaceholderIllus}
            contentNumberOfLines={3}
            isImageContain={true}
            spinValue={spinValue}
          />
        );

      case 'ACTIVITY':
        const activityCosting = getActivityById(
          activity.activitySlotDetail.activityCostingIdentifier,
        ) as IActivityCombinedInfo;
        const activityInfo = getActivityById(
          activity.activitySlotDetail.activityCostingIdentifier,
        ) as IActivityCombinedInfo;
        onClick = () => {
          recordEvent(constants.BookedItinerary.event, {
            click: constants.BookedItinerary.click.voucher,
            type: constants.BookedItinerary.type.activity,
          });
          // @ts-ignore
          resolveLinks(false, false, {
            voucherType: constants.activityVoucherType,
            costingIdentifier: activityInfo.costing.configKey,
          });
        };
        return (
          <BookingSectionComponent
            containerStyle={[containerStyle, styles.horizontalMarginSpacing]}
            title={activity.name}
            content={activityCosting.title}
            sectionImage={{uri: activityCosting.mainPhoto}}
            onClick={onClick}
            contentNumberOfLines={3}
            defaultSource={constants.activityThumbPlaceholderIllus}
            isImageContain={false}
            isProcessing={
              !(
                activityInfo.voucher &&
                (activityInfo.voucher.booked || activityInfo.free)
              )
            }
            spinValue={spinValue}
            isDataSkipped={_.get(activityInfo, 'voucher.skipVoucher')}
            voucherTitle={_.get(activityInfo, 'voucher.title')}
          />
        );

      case 'INTERCITY_TRANSFER':
        const {
          transferCostingIdenfier,
          transferMode,
          slotText,
        } = activity.intercityTransferSlotDetailVO.directTransferDetail;
        const {fromCity, toCity} = activity.intercityTransferSlotDetailVO;
        imageObject = getSlotImage(transferCostingIdenfier, transferMode);
        let transfer = (transferCostingIdenfier
          ? getTransferFromAllById(transferCostingIdenfier)
          : {}) as ITransferCosting | IRentalCarCosting;
        if (!transferCostingIdenfier) {
          if (transferMode === constants.rentalCarTransferMode) {
            const fromCityOrder = getCityOrderById(fromCity);
            const toCityOrder = getCityOrderById(toCity);
            transfer = getRentalCarByCityOrder({
              fromCityOrder,
              toCityOrder,
            }) as IRentalCarCosting;
          }
        }
        onClick = () => {
          recordEvent(constants.BookedItinerary.event, {
            click: constants.BookedItinerary.click.voucher,
            type: constants.BookedItinerary.type.transfer,
          });
          if (transferMode === constants.flightTransferMode) {
            // @ts-ignore
            resolveLinks(false, false, {
              voucherType: constants.flightVoucherType,
              costingIdentifier: transfer.configKey,
            });
          } else {
            switch (transferMode) {
              case constants.trainTransferMode:
                // @ts-ignore
                resolveLinks(false, false, {
                  voucherType: constants.trainVoucherType,
                  costingIdentifier: transfer.configKey,
                });
                break;
              case constants.ferryTransferMode:
                // @ts-ignore
                resolveLinks(false, false, {
                  voucherType: constants.ferryVoucherType,
                  costingIdentifier: transfer.configKey,
                });
                break;
              case constants.rentalCarTransferMode:
                // @ts-ignore
                resolveLinks(false, false, {
                  voucherType: constants.rentalCarVoucherType,
                  costingIdentifier: transfer.configKey,
                });
                break;
              default:
                // @ts-ignore
                resolveLinks(false, false, {
                  voucherType: constants.transferVoucherType,
                  costingIdentifier: transfer.configKey,
                });
            }
          }
        };
        return (
          <BookingSectionComponent
            containerStyle={[containerStyle, styles.horizontalMarginSpacing]}
            title={activity.name}
            content={slotText}
            isImageContain={transferMode === 'FLIGHT'}
            sectionImage={{uri: imageObject.image}}
            onClick={onClick}
            contentNumberOfLines={3}
            defaultSource={
              transferMode === 'FLIGHT'
                ? constants.flightLogoPlaceholderIllus
                : {uri: getTransferImage(transferMode)}
            }
            isProcessing={!(transfer.voucher && transfer.voucher.booked)}
            spinValue={spinValue}
            isDataSkipped={_.get(transfer, 'voucher.skipVoucher')}
            voucherTitle={_.get(transfer, 'voucher.title')}
          />
        );

      case 'INTERNATIONAL_DEPART':
        const departureFlight = (internationalFlightKey
          ? getFlightById(internationalFlightKey)
          : {}) as IFlightCosting;
        if (!internationalFlightKey) {
          return null;
        }
        onClick = () => {
          if (departureFlight.status !== constants.voucherSuccessStatus) {
            return null;
          }
          recordEvent(constants.BookedItinerary.event, {
            click: constants.BookedItinerary.click.voucher,
            type: constants.BookedItinerary.type.flight,
          });
          // @ts-ignore
          resolveLinks(false, false, {
            voucherType: constants.flightVoucherType,
            costingIdentifier: departureFlight.configKey,
          });
        };
        imageObject = getSlotImage(internationalFlightKey, 'FLIGHT');
        return (
          <BookingSectionComponent
            containerStyle={[containerStyle, styles.horizontalMarginSpacing]}
            title={activity.name}
            content={
              activity.departureSlotDetail
                ? activity.departureSlotDetail.slotText
                : ''
            }
            sectionImage={{uri: imageObject.image}}
            contentNumberOfLines={3}
            isImageContain={true}
            onClick={onClick}
            defaultSource={constants.flightLogoPlaceholderIllus}
            isProcessing={
              departureFlight.status === constants.voucherSuccessStatus &&
              !(departureFlight.voucher && departureFlight.voucher.booked)
            }
            spinValue={spinValue}
            isDataSkipped={_.get(departureFlight, 'voucher.skipVoucher')}
            voucherTitle={_.get(departureFlight, 'voucher.title')}
          />
        );

      case 'ACTIVITY_WITH_TRANSFER':
        const activityTransferInfo = getActivityById(
          activity.activitySlotDetail.activityCostingIdentifier,
        ) as IActivityCombinedInfo;
        let withActivityTransferCostingIdentifier, withActivityTransferMode;
        const {intercityTransferSlotDetailVO} = activity;
        if (
          _.toUpper(intercityTransferSlotDetailVO.transferType) === 'DIRECT'
        ) {
          const {
            transferCostingIdenfier: directTransferCostingIdenfier,
            transferMode: directTransferMode,
          } = intercityTransferSlotDetailVO.directTransferDetail;
          withActivityTransferCostingIdentifier = directTransferCostingIdenfier;
          withActivityTransferMode = directTransferMode;
        } else if (
          _.toUpper(intercityTransferSlotDetailVO.transferType) === 'TRANSIT'
        ) {
          const {
            transitMode: directTransferMode,
            transferCostingIdenfier: directTransferCostingIdenfier,
          } = intercityTransferSlotDetailVO.transitTransferDetail.arriveTransit;
          withActivityTransferCostingIdentifier = directTransferCostingIdenfier;
          withActivityTransferMode = directTransferMode;
        }
        imageObject = getSlotImage(
          withActivityTransferCostingIdentifier,
          withActivityTransferMode,
        );
        const {mainPhoto} = activityTransferInfo;
        onClick = () => {
          recordEvent(constants.BookedItinerary.event, {
            click: constants.BookedItinerary.click.voucher,
            type: constants.BookedItinerary.type.activityWithTransfer,
          });
          // @ts-ignore
          resolveLinks(false, false, {
            voucherType: constants.activityVoucherType,
            costingIdentifier: activityTransferInfo.costing.configKey,
          });
        };
        return (
          <BookingSectionComponent
            containerStyle={[containerStyle, styles.horizontalMarginSpacing]}
            title={activity.name}
            content={activityTransferInfo.title}
            sectionImage={{uri: mainPhoto}}
            isProcessing={
              !(
                activityTransferInfo.voucher &&
                (activityTransferInfo.voucher.booked ||
                  activityTransferInfo.free)
              )
            }
            onClick={onClick}
            contentNumberOfLines={3}
            isImageContain={false}
            defaultSource={constants.activityThumbPlaceholderIllus}
            spinValue={spinValue}
            isDataSkipped={_.get(activityTransferInfo, 'voucher.skipVoucher')}
            voucherTitle={_.get(activityTransferInfo, 'voucher.title')}
          />
        );

      default:
        return null;
    }
  };

  return [
    // @ts-ignore
    cityCardData
      ? [
          <CityCard
            key={0}
            {...cityCardData}
            containerStyle={styles.cityCardContainer}
          />,
          activityIndex === 0 ? (
            <SectionHeader
              key={1}
              sectionName={
                openDate
                  ? 'Day 1'
                  : moment(day)
                      .format(constants.commonDateFormat)
                      .toUpperCase()
              }
              containerStyle={styles.horizontalMarginSpacing}
            />
          ) : null,
        ]
      : null,
    <SlotRow
      key={2}
      containerStyle={
        // @ts-ignore
        cityCardData && activityIndex !== 0 ? styles.slotRowContainer : {}
      }
    />,
  ];
};

const styles = StyleSheet.create({
  horizontalMarginSpacing: {
    marginHorizontal: 24,
  },
  cityCardContainer: {marginTop: 24, marginBottom: 24},
  slotRowContainer: {marginTop: 16},
});

// @ts-ignore
export default inject('itineraries')(observer(SlotActivity));
