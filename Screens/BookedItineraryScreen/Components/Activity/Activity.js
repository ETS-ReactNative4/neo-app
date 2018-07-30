import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import SimpleActivity from "./Components/SimpleActivity";
import constants from "../../../../constants/constants";
import { inject, observer } from "mobx-react/custom";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";

const Activity = inject("itineraries")(
  observer(({ activity, navigation, itineraries }) => {
    const { getActivityById } = itineraries;
    let onClick = () => null;

    switch (activity.type) {
      case "INTERNATIONAL_ARRIVE":
        onClick = () =>
          navigation.navigate("FlightVoucher", {
            identifier: activity.arrivalSlotDetail.flightCostingKey
          });
        return (
          <SimpleActivity
            activity={activity}
            title={activity.name}
            text={activity.arrivalSlotDetail.slotText}
            image={constants.notificationIcon}
            icon={constants.aeroplaneIcon}
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
        return (
          <SimpleActivity
            activity={activity}
            title={activity.name}
            text={
              activity.intercityTransferSlotDetailVO.directTransferDetail
                .slotText
            }
            image={constants.notificationIcon}
            icon={constants.aeroplaneIcon}
            onClick={onClick}
          />
        );

      case "INTERNATIONAL_DEPART":
        return (
          <SimpleActivity
            activity={activity}
            title={activity.name}
            text={activity.departureSlotDetail.slotText}
            image={constants.notificationIcon}
            icon={constants.aeroplaneIcon}
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
  })
);

Activity.propTypes = forbidExtraProps({
  activity: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
});

export default Activity;
