import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../../constants/fonts";
import { CONSTANT_black1 } from "../../../../constants/colorPallete";
import { IItineraryNotificationInfo } from "../../../NotificationDetailsScreen/hooks/useNotificationDetailsApi";
import ItineraryNotificationCard from "./Components/ItineraryNotificationCard";

export interface ItineraryTimelineProps {
  notifData: IItineraryNotificationInfo[];
}

const ItineraryTimeline = ({ notifData }: ItineraryTimelineProps) => {
  return (
    <View style={styles.itineraryTimelineContainer}>
      {notifData.length ? (
        <Text style={styles.headingTextStyle}>Notifications</Text>
      ) : null}

      {notifData.map((notification, notificationIndex) => {
        return (
          <ItineraryNotificationCard
            key={notificationIndex}
            isNegative={notification.negative}
            time={notification.creationTime.toString()}
            text={notification.title}
            type={""}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  itineraryTimelineContainer: {
    marginBottom: 24
  },
  headingTextStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16),
    color: CONSTANT_black1,
    marginBottom: 16
  }
});

export default ItineraryTimeline;
