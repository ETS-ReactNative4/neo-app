import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import SimpleActivity from "./Components/SimpleActivity";
import constants from "../../../../constants/constants";

const Activity = ({ activity }) => {
  switch (activity.type) {
    case "INTERNATIONAL_ARRIVE":
      return (
        <SimpleActivity
          activity={activity}
          title={activity.name}
          text={activity.arrivalSlotDetail.slotText}
          image={constants.aeroplaneIcon}
          icon={constants.aeroplaneIcon}
        />
      );

    case "LEISURE":
      return (
        <SimpleActivity
          activity={activity}
          title={activity.name}
          text={activity.leisureSlotDetail.text}
          image={constants.aeroplaneIcon}
        />
      );

    case "ACTIVITY":
      return (
        <SimpleActivity
          activity={activity}
          title={activity.name}
          text={activity.activitySlotDetail.title}
          image={{ uri: activity.activitySlotDetail.mainPhoto }}
        />
      );

    case "INTERCITY_TRANSFER":
      return (
        <SimpleActivity
          activity={activity}
          title={activity.name}
          text={
            activity.intercityTransferSlotDetailVO.directTransferDetail.slotText
          }
          image={constants.aeroplaneIcon}
          icon={constants.aeroplaneIcon}
        />
      );

    case "INTERNATIONAL_DEPART":
      return (
        <SimpleActivity
          activity={activity}
          title={activity.name}
          text={activity.departureSlotDetail.slotText}
          image={constants.aeroplaneIcon}
          icon={constants.aeroplaneIcon}
        />
      );

    default:
      return (
        <View style={{ height: 40, backgroundColor: "black" }}>
          <Text>{"section missing"}</Text>
        </View>
      );
  }
};

Activity.propTypes = {
  activity: PropTypes.object.isRequired
};

export default Activity;
