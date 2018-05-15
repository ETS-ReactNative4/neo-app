import React from "react";
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
          icon={constants.aeroplaneIcon}
        />
      );

    case "ACTIVITY":
      return (
        <SimpleActivity
          activity={activity}
          title={activity.name}
          text={activity.activitySlotDetail.activityId}
          image={constants.aeroplaneIcon}
          icon={constants.aeroplaneIcon}
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
      return null;
  }
};

Activity.propTypes = {
  activity: PropTypes.object.isRequired
};

export default Activity;
