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

const SlotActivity = inject("itineraries")(
  observer(({ activity, navigation, itineraries, activityIndex, day }) => {
    const { getActivityById, getCityById } = itineraries;
    let onClick = () => null;
    let imageObject;
    let cityCardData;
    switch (activity.type) {
      /**
       * TODO: Get City ID in international Arrive
       */
      case "INTERNATIONAL_ARRIVE":
        cityCardData = {
          cityImage: constants.splashBackground,
          action: () => null,
          cityName: activity.arrivalSlotDetail.airportCity,
          activityText: activity.arrivalSlotDetail.transferIndicatorText
        };
        break;

      case "INTERCITY_TRANSFER":
        cityCardData = {
          cityImage: {
            uri:
              constants.cityImageBaseUrl +
              getCityById(activity.intercityTransferSlotDetailVO.toCity).image
          },
          action: () => null,
          cityName: getCityById(activity.intercityTransferSlotDetailVO.toCity)
            .cityName,
          activityText:
            activity.intercityTransferSlotDetailVO.directTransferDetail
              .transferIndicatorText
        };
        break;

      case "ACTIVITY_WITH_TRANSFER":
        cityCardData = {
          cityImage: {
            uri:
              constants.cityImageBaseUrl +
              getCityById(activity.intercityTransferSlotDetailVO.toCity).image
          },
          action: () => null,
          cityName: getCityById(activity.intercityTransferSlotDetailVO.toCity)
            .cityName,
          activityText:
            activity.intercityTransferSlotDetailVO.directTransferDetail
              .transferIndicatorText
        };
        break;

      default:
        break;
    }

    const SlotRow = () => {
      switch (activity.type) {
        case "INTERNATIONAL_ARRIVE":
          const internationalFlightCostingKey =
            activity.arrivalSlotDetail.flightCostingKey;
          imageObject = getSlotImage(internationalFlightCostingKey, "FLIGHT");
          onClick = () =>
            navigation.navigate("FlightVoucher", {
              identifier: internationalFlightCostingKey
            });
          return (
            <SimpleActivity
              activity={activity}
              title={activity.name}
              text={activity.arrivalSlotDetail.slotText}
              image={{ uri: imageObject.image }}
              icon={imageObject.icon}
              isImageContain={true}
              onClick={onClick}
            />
          );

        case "LEISURE":
          return (
            <SimpleActivity
              activity={activity}
              title={activity.name}
              text={activity.leisureSlotDetail.text}
              image={constants.notificationIcon}
              onClick={onClick}
            />
          );

        case "ACTIVITY":
          const activityCosting = getActivityById(
            activity.activitySlotDetail.activityCostingIdentifier
          );
          onClick = () =>
            navigation.navigate("ActivityVoucher", {
              identifier: activity.activitySlotDetail.activityCostingIdentifier
            });
          return (
            <SimpleActivity
              activity={activity}
              title={activity.name}
              text={activityCosting.title}
              image={{ uri: activityCosting.mainPhoto }}
              onClick={onClick}
            />
          );

        case "INTERCITY_TRANSFER":
          const {
            transferCostingIdenfier,
            transferMode,
            slotText
          } = activity.intercityTransferSlotDetailVO.directTransferDetail;
          imageObject = getSlotImage(transferCostingIdenfier, transferMode);
          return (
            <SimpleActivity
              activity={activity}
              title={activity.name}
              text={slotText}
              isImageContain={transferMode === "FLIGHT"}
              image={{ uri: imageObject.image }}
              icon={imageObject.icon}
              onClick={onClick}
            />
          );

        case "INTERNATIONAL_DEPART":
          /**
           * TODO: Need flight costing id
           */
          const { tripKey } = activity.departureSlotDetail;
          imageObject = {} || getSlotImage(tripKey, "FLIGHT");
          return (
            <SimpleActivity
              activity={activity}
              title={activity.name}
              text={activity.departureSlotDetail.slotText}
              image={constants.notificationIcon}
              icon={constants.aeroplaneIcon}
              isImageContain={true}
              onClick={onClick}
            />
          );

        case "ACTIVITY_WITH_TRANSFER":
          onClick = () =>
            navigation.navigate("ActivityVoucher", {
              identifier: activity.activitySlotDetail.activityCostingIdentifier
            });
          return (
            <SimpleActivity
              activity={activity}
              title={activity.name}
              text={
                activity.intercityTransferSlotDetailVO.directTransferDetail
                  .transferIndicatorText
              }
              image={constants.notificationIcon}
              icon={constants.trainIcon}
              onClick={onClick}
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
      <SlotRow key={2} />
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
