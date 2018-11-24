import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import SimpleActivity from "./Components/SimpleActivity";
import constants from "../../../../constants/constants";
import { inject, observer } from "mobx-react/custom";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import getSlotImage from "../../../../Services/getImageService/getSlotImage";
import CityCard from "../CityCard";
import moment from "moment";
import SectionHeader from "../../../../CommonComponents/SectionHeader/SectionHeader";
import _ from "lodash";
import { recordEvent } from "../../../../Services/analytics/analyticsService";

let internationalFlightKey;
const SlotActivity = inject("infoStore")(
  inject("itineraries")(
    observer(
      ({
        activity,
        navigation,
        itineraries,
        activityIndex,
        day,
        infoStore
      }) => {
        const {
          getActivityById,
          getCityById,
          cities,
          getFlightById,
          getTransferById
        } = itineraries;
        const { setInfo } = infoStore;
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
              cityName: activity.arrivalSlotDetail.airportCity,
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
              internationalFlightKey =
                activity.arrivalSlotDetail.flightCostingKey;
              imageObject = getSlotImage(internationalFlightKey, "FLIGHT");
              const flight = getFlightById(internationalFlightKey);
              onClick = () => {
                recordEvent(constants.bookedItineraryFlightVoucherClick);
                if (flight.voucher && flight.voucher.booked) {
                  navigation.navigate("FlightVoucher", { flight });
                } else {
                  setInfo(
                    constants.bookingProcessText.title,
                    constants.bookingProcessText.message,
                    constants.bookingProcessingIcon,
                    constants.bookingProcessText.actionText
                  );
                }
              };
              return (
                <SimpleActivity
                  containerStyle={containerStyle}
                  activity={activity}
                  title={activity.name}
                  text={activity.arrivalSlotDetail.slotText}
                  image={{ uri: imageObject.image }}
                  icon={imageObject.icon}
                  isImageContain={true}
                  onClick={onClick}
                  defaultImageUri={constants.airLineLogoPlaceHolder}
                />
              );

            case "LEISURE":
              return (
                <SimpleActivity
                  containerStyle={containerStyle}
                  activity={activity}
                  title={activity.name}
                  text={activity.leisureSlotDetail.text}
                  image={constants.leisureIcon}
                  onClick={onClick}
                  defaultImageUri={constants.activity3SmallPlaceHolder}
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
                  setInfo(
                    constants.bookingProcessText.title,
                    constants.bookingProcessText.message,
                    constants.bookingProcessingIcon,
                    constants.bookingProcessText.actionText
                  );
                }
              };
              return (
                <SimpleActivity
                  containerStyle={containerStyle}
                  activity={activity}
                  title={activity.name}
                  text={activityCosting.title}
                  image={{ uri: activityCosting.mainPhoto }}
                  onClick={onClick}
                  defaultImageUri={_.sample([
                    constants.activitySmallPlaceHolder,
                    constants.activity2SmallPlaceHolder,
                    constants.activity3SmallPlaceHolder
                  ])}
                />
              );

            case "INTERCITY_TRANSFER":
              const {
                transferCostingIdenfier,
                transferMode,
                slotText
              } = activity.intercityTransferSlotDetailVO.directTransferDetail;
              imageObject = getSlotImage(transferCostingIdenfier, transferMode);
              const transfer = getTransferById(transferCostingIdenfier);
              onClick = () => {
                recordEvent(constants.bookedItineraryTransferVoucherClick);
                if (transfer.voucher && transfer.voucher.booked) {
                  navigation.navigate("TransferVoucher", { transfer });
                } else {
                  setInfo(
                    constants.bookingProcessText.title,
                    constants.bookingProcessText.message,
                    constants.bookingProcessingIcon,
                    constants.bookingProcessText.actionText
                  );
                }
              };
              return (
                <SimpleActivity
                  containerStyle={containerStyle}
                  activity={activity}
                  title={activity.name}
                  text={slotText}
                  isImageContain={transferMode === "FLIGHT"}
                  image={{ uri: imageObject.image }}
                  icon={imageObject.icon}
                  onClick={onClick}
                  defaultImageUri={constants.transferPlaceHolder}
                />
              );

            case "INTERNATIONAL_DEPART":
              const departureFlight = getFlightById(internationalFlightKey);
              onClick = () => {
                recordEvent(constants.bookedItineraryFlightVoucherClick);
                if (departureFlight.voucher && departureFlight.voucher.booked) {
                  navigation.navigate("FlightVoucher", {
                    flight: departureFlight
                  });
                } else {
                  setInfo(
                    constants.bookingProcessText.title,
                    constants.bookingProcessText.message,
                    constants.bookingProcessingIcon,
                    constants.bookingProcessText.actionText
                  );
                }
              };
              imageObject = getSlotImage(internationalFlightKey, "FLIGHT");
              return (
                <SimpleActivity
                  containerStyle={containerStyle}
                  activity={activity}
                  title={activity.name}
                  text={activity.departureSlotDetail.slotText}
                  image={{ uri: imageObject.image }}
                  icon={constants.aeroplaneIcon}
                  isImageContain={true}
                  onClick={onClick}
                  defaultImageUri={constants.airLineLogoPlaceHolder}
                />
              );

            case "ACTIVITY_WITH_TRANSFER":
              const activityTransferInfo = getActivityById(
                activity.activitySlotDetail.activityCostingIdentifier
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
                  setInfo(
                    constants.bookingProcessText.title,
                    constants.bookingProcessText.message,
                    constants.bookingProcessingIcon,
                    constants.bookingProcessText.actionText
                  );
                }
              };
              return (
                <SimpleActivity
                  containerStyle={containerStyle}
                  activity={activity}
                  title={activity.name}
                  text={
                    activity.intercityTransferSlotDetailVO.directTransferDetail
                      .transferIndicatorText
                  }
                  image={{ uri: mainPhoto }}
                  icon={constants.trainIcon}
                  onClick={onClick}
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
                      .format("MMM DD, dddd")
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
      }
    )
  )
);

SlotActivity.propTypes = forbidExtraProps({
  activity: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  day: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired
});

export default SlotActivity;
