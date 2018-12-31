import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../../constants/constants";
import { inject, observer } from "mobx-react/custom";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import getSlotImage from "../../../../Services/getImageService/getSlotImage";
import CityCard from "../CityCard";
import moment from "moment";
import SectionHeader from "../../../../CommonComponents/SectionHeader/SectionHeader";
import _ from "lodash";
import { recordEvent } from "../../../../Services/analytics/analyticsService";
import BookingSectionComponent from "../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import { toastBottom } from "../../../../Services/toast/toast";

let internationalFlightKey;
const SlotActivity = inject("itineraries")(
  observer(({ activity, navigation, itineraries, activityIndex, day }) => {
    const {
      getActivityById,
      getCityById,
      cities,
      getFlightById,
      getTransferFromAllById,
      getCityOrderById,
      getRentalCarByCityOrder
    } = itineraries;
    let onClick = () => null;
    let imageObject;
    let cityCardData;
    let city, currentCity;
    switch (activity.type) {
      case "INTERNATIONAL_ARRIVE":
        currentCity = itineraries.cities[0];
        cityCardData = {
          cityImage: { uri: currentCity.cityObject.image },
          action: () =>
            navigation.navigate("BookedPlaces", {
              city: currentCity,
              target: "BookedNearBy"
            }),
          cityName: currentCity.city,
          activityText: activity.arrivalSlotDetail.transferIndicatorText
        };
        break;

      case "INTERCITY_TRANSFER":
        currentCity = getCityById(
          activity.intercityTransferSlotDetailVO.toCity
        );
        city = _.find(cities, { city: currentCity.cityName });
        cityCardData = {
          cityImage: {
            uri: currentCity.image
          },
          action: () =>
            navigation.navigate("BookedPlaces", {
              city,
              target: "BookedNearBy"
            }),
          cityName: currentCity.cityName,
          activityText:
            activity.intercityTransferSlotDetailVO.directTransferDetail
              .transferIndicatorText
        };
        break;

      case "ACTIVITY_WITH_TRANSFER":
        currentCity = getCityById(
          activity.intercityTransferSlotDetailVO.toCity
        );
        city = _.find(cities, { city: currentCity.cityName });
        cityCardData = {
          cityImage: {
            uri: currentCity.image
          },
          action: () =>
            navigation.navigate("BookedPlaces", {
              city,
              target: "BookedNearBy"
            }),
          cityName: currentCity.cityName,
          activityText:
            activity.intercityTransferSlotDetailVO.directTransferDetail
              .transferIndicatorText
        };
        break;

      default:
        break;
    }

    const SlotRow = ({ containerStyle }) => {
      switch (activity.type) {
        case "INTERNATIONAL_ARRIVE":
          internationalFlightKey = activity.arrivalSlotDetail.flightCostingKey;
          imageObject = getSlotImage(internationalFlightKey, "FLIGHT");
          const flight = internationalFlightKey
            ? getFlightById(internationalFlightKey)
            : {};
          if (!internationalFlightKey) {
            return null;
          }
          onClick = () => {
            recordEvent(constants.bookedItineraryFlightVoucherClick);
            if (flight.voucher && flight.voucher.booked) {
              navigation.navigate("FlightVoucher", { flight });
            } else {
              toastBottom(constants.bookingProcessText.message);
            }
          };
          return (
            <BookingSectionComponent
              containerStyle={[containerStyle, { marginHorizontal: 24 }]}
              title={activity.name}
              content={activity.arrivalSlotDetail.slotText}
              sectionImage={{ uri: imageObject.image }}
              isImageContain={true}
              onClick={onClick}
              contentNumberOfLines={3}
              defaultImageUri={constants.airLineLogoPlaceHolder}
              isProcessing={false}
            />
          );

        case "LEISURE":
          return (
            <BookingSectionComponent
              containerStyle={[containerStyle, { marginHorizontal: 24 }]}
              title={activity.name}
              content={activity.leisureSlotDetail.text}
              sectionImage={constants.leisureIcon}
              isProcessing={false}
              onClick={onClick}
              defaultImageUri={constants.activity3SmallPlaceHolder}
              contentNumberOfLines={3}
              isImageContain={true}
            />
          );

        case "ACTIVITY":
          const activityCosting = getActivityById(
            activity.activitySlotDetail.activityCostingIdentifier
          );
          const activityInfo = getActivityById(
            activity.activitySlotDetail.activityCostingIdentifier
          );
          onClick = () => {
            recordEvent(constants.bookedItineraryActivityVoucherClick);
            if (
              activityInfo.voucher &&
              (activityInfo.voucher.booked || activityInfo.voucher.self)
            ) {
              navigation.navigate("ActivityVoucher", {
                activity: activityInfo
              });
            } else {
              toastBottom(constants.bookingProcessText.message);
            }
          };
          return (
            <BookingSectionComponent
              containerStyle={[containerStyle, { marginHorizontal: 24 }]}
              title={activity.name}
              content={activityCosting.title}
              sectionImage={{ uri: activityCosting.mainPhoto }}
              onClick={onClick}
              contentNumberOfLines={3}
              defaultImageUri={_.sample([
                constants.activitySmallPlaceHolder,
                constants.activity2SmallPlaceHolder,
                constants.activity3SmallPlaceHolder
              ])}
              isImageContain={false}
              isProcessing={false}
            />
          );

        case "INTERCITY_TRANSFER":
          const {
            transferCostingIdenfier,
            transferMode,
            slotText
          } = activity.intercityTransferSlotDetailVO.directTransferDetail;
          const { fromCity, toCity } = activity.intercityTransferSlotDetailVO;
          imageObject = getSlotImage(transferCostingIdenfier, transferMode);
          let transfer = transferCostingIdenfier
            ? getTransferFromAllById(transferCostingIdenfier)
            : {};
          if (!transferCostingIdenfier) {
            if (transferMode === "RENTALCAR") {
              const fromCityOrder = getCityOrderById(fromCity);
              const toCityOrder = getCityOrderById(toCity);
              transfer = getRentalCarByCityOrder({
                fromCityOrder,
                toCityOrder
              });
            }
          }
          onClick = () => {
            recordEvent(constants.bookedItineraryTransferVoucherClick);
            if (transfer.voucher && transfer.voucher.booked) {
              if (transferMode === "FLIGHT")
                navigation.navigate("FlightVoucher", { flight: transfer });
              else navigation.navigate("TransferVoucher", { transfer });
            } else {
              toastBottom(constants.bookingProcessText.message);
            }
          };
          return (
            <BookingSectionComponent
              containerStyle={[containerStyle, { marginHorizontal: 24 }]}
              title={activity.name}
              content={slotText}
              isImageContain={transferMode === "FLIGHT"}
              sectionImage={{ uri: imageObject.image }}
              isProcessing={false}
              onClick={onClick}
              contentNumberOfLines={3}
              defaultImageUri={constants.transferPlaceHolder}
            />
          );

        case "INTERNATIONAL_DEPART":
          const departureFlight = internationalFlightKey
            ? getFlightById(internationalFlightKey)
            : null;
          if (!internationalFlightKey) {
            return null;
          }
          onClick = () => {
            recordEvent(constants.bookedItineraryFlightVoucherClick);
            if (departureFlight.voucher && departureFlight.voucher.booked) {
              navigation.navigate("FlightVoucher", {
                flight: departureFlight
              });
            } else {
              toastBottom(constants.bookingProcessText.message);
            }
          };
          imageObject = getSlotImage(internationalFlightKey, "FLIGHT");
          return (
            <BookingSectionComponent
              containerStyle={[containerStyle, { marginHorizontal: 24 }]}
              title={activity.name}
              content={
                activity.departureSlotDetail
                  ? activity.departureSlotDetail.slotText
                  : ""
              }
              sectionImage={{ uri: imageObject.image }}
              isProcessing={false}
              contentNumberOfLines={3}
              isImageContain={true}
              onClick={onClick}
              defaultImageUri={constants.airLineLogoPlaceHolder}
            />
          );

        case "ACTIVITY_WITH_TRANSFER":
          const activityTransferInfo = getActivityById(
            activity.activitySlotDetail.activityCostingIdentifier
          );
          const {
            transferCostingIdenfier: withActivityTransferCostingIdentifier,
            transferMode: withActivityTransferMode
          } = activity.intercityTransferSlotDetailVO.directTransferDetail;
          imageObject = getSlotImage(
            withActivityTransferCostingIdentifier,
            withActivityTransferMode
          );
          const { mainPhoto } = activityTransferInfo;
          onClick = () => {
            if (
              activityTransferInfo.voucher &&
              (activityTransferInfo.voucher.booked ||
                activityTransferInfo.voucher.self)
            ) {
              navigation.navigate("ActivityVoucher", {
                activity: activityTransferInfo
              });
            } else {
              toastBottom(constants.bookingProcessText.message);
            }
          };
          return (
            <BookingSectionComponent
              containerStyle={[containerStyle, { marginHorizontal: 24 }]}
              title={activity.name}
              content={activityTransferInfo.title}
              sectionImage={{ uri: mainPhoto }}
              isProcessing={false}
              onClick={onClick}
              contentNumberOfLines={3}
              isImageContain={false}
              defaultImageUri={constants.transferPlaceHolder}
            />
          );

        default:
          /**
           * TODO: Remove black space before release
           */
          return (
            <View style={{ height: 40, backgroundColor: "black" }}>
              <Text>{"section missing"}</Text>
            </View>
          );
      }
    };

    return [
      cityCardData
        ? [
            <CityCard
              key={0}
              {...cityCardData}
              containerStyle={{ marginTop: 24, marginBottom: 24 }}
            />,
            activityIndex === 0 ? (
              <SectionHeader
                key={1}
                sectionName={moment(day)
                  .format(constants.commonDateFormat)
                  .toUpperCase()}
                containerStyle={{ marginHorizontal: 24 }}
              />
            ) : null
          ]
        : null,
      <SlotRow
        key={2}
        containerStyle={
          cityCardData && activityIndex !== 0 ? { marginTop: 16 } : {}
        }
      />
    ];
  })
);

SlotActivity.propTypes = forbidExtraProps({
  activity: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  day: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired
});

export default SlotActivity;
