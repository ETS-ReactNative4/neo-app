import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import SimpleActivity from "./Components/SimpleActivity";
import constants from "../../../../constants/constants";
import { inject, observer } from "mobx-react/custom";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";

const Activity = inject("itineraries")(
  observer(({ activity, itineraries }) => {
    const { getActivityById } = itineraries;

    switch (activity.type) {
      case "INTERNATIONAL_ARRIVE":
        return (
          <SimpleActivity
            activity={activity}
            title={activity.name}
            text={activity.arrivalSlotDetail.slotText}
            image={constants.notificationIcon}
            icon={constants.aeroplaneIcon}
          />
        );

      case "LEISURE":
        return (
          <SimpleActivity
            activity={activity}
            title={activity.name}
            text={activity.leisureSlotDetail.text}
            image={constants.notificationIcon}
          />
        );

      case "ACTIVITY":
        const activityCosting = getActivityById(
          activity.activitySlotDetail.activityCostingIdentifier
        );
        return (
          <SimpleActivity
            activity={activity}
            title={activity.name}
            text={activityCosting.title}
            image={{ uri: activityCosting.mainPhoto }}
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
          />
        );

      case "ACTIVITY_WITH_TRANSFER":
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
  activity: PropTypes.object.isRequired
});

export default Activity;
