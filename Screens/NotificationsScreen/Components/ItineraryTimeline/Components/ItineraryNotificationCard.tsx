import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  CONSTANT_black1,
  CONSTANT_shade2
} from "../../../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryRegular
} from "../../../../../constants/fonts";
import Icon from "../../../../../CommonComponents/Icon/Icon";

/**
 * PT TODO: Need the type as enum for setting icons
 */
export interface ItineraryNotificationCardProps {
  isNegative: boolean;
  type: string;
  time: string;
  text: string;
}

const ItineraryNotificationCard = ({
  isNegative,
  type,
  time,
  text
}: ItineraryNotificationCardProps) => {
  return (
    <View style={styles.itineraryTimelineList}>
      <View
        style={[
          styles.timelineIconWrapper,
          isNegative ? styles.timelineMissedCallStatus : null
        ]}
      >
        <Icon name={type} size={12} color={CONSTANT_black1} />
      </View>
      <View>
        <Text style={styles.timelineTitleTextStyle}>{time}</Text>
        <Text style={styles.timelineTextStyle}>{text}</Text>
        {/* <Text style={styles.linkTextStyle} onPress={() => {}}>
          SEE MESSAGES
        </Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itineraryTimelineList: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16
  },
  timelineIconWrapper: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(212, 248, 236)",
    borderRadius: 25,
    marginRight: 16
  },
  timelineMissedCallStatus: {
    backgroundColor: "rgb(255, 232, 232)"
  },
  timelineTitleTextStyle: {
    color: CONSTANT_shade2,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12),
    marginBottom: 4
  },
  timelineTextStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14),
    marginBottom: 8
  },
  linkTextStyle: {
    color: "rgb(0, 198, 132)",
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 13),
    textTransform: "uppercase",
    textDecorationLine: "underline"
  }
});

export default ItineraryNotificationCard;
