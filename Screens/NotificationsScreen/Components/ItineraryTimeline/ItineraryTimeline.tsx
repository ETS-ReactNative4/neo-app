import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryRegular
} from "../../../../constants/fonts";
import {
  CONSTANT_black1,
  CONSTANT_shade2
} from "../../../../constants/colorPallete";
import Icon from "../../../../CommonComponents/Icon/Icon";
import { CONSTANT_storybookIcon } from "../../../../constants/imageAssets";

const ItineraryTimeline = () => {
  return (
    <View style={styles.itineraryTimelineContainer}>
      <Text style={styles.headingTextStyle}>Notifications</Text>

      {/* Itinerary Timeline List starts */}
      <View style={styles.itineraryTimelineList}>
        <View style={styles.timelineIconWrapper}>
          <Icon
            name={CONSTANT_storybookIcon}
            size={12}
            color={CONSTANT_black1}
          />
        </View>
        <View>
          <Text style={styles.timelineTitleTextStyle}>
            12 JUL 2019 - 2:50 PM
          </Text>
          <Text style={styles.timelineTextStyle}>
            Itinerary created and costed
          </Text>
        </View>
      </View>
      {/* Itinerary Timeline List ends */}

      {/* Itinerary Timeline List starts */}
      <View style={styles.itineraryTimelineList}>
        <View style={styles.timelineIconWrapper}>
          <Icon
            name={CONSTANT_storybookIcon}
            size={12}
            color={CONSTANT_black1}
          />
        </View>
        <View>
          <Text style={styles.timelineTitleTextStyle}>
            13 JUL 2019 - 12:00PM
          </Text>
          <Text style={styles.timelineTextStyle}>
            Call from travel consultant
          </Text>
        </View>
      </View>
      {/* Itinerary Timeline List ends */}

      {/* Itinerary Timeline List starts */}
      <View style={styles.itineraryTimelineList}>
        <View style={styles.timelineIconWrapper}>
          <Icon
            name={CONSTANT_storybookIcon}
            size={12}
            color={CONSTANT_black1}
          />
        </View>
        <View>
          <Text style={styles.timelineTitleTextStyle}>
            20 AUG 2019 - 4:00 PM
          </Text>
          <Text style={styles.timelineTextStyle}>Contacted helpdesk</Text>
          <Text style={styles.linkTextStyle} onPress={() => {}}>
            SEE MESSAGES
          </Text>
        </View>
      </View>
      {/* Itinerary Timeline List ends */}

      {/* Itinerary Timeline List starts */}
      <View style={styles.itineraryTimelineList}>
        <View
          style={[styles.timelineIconWrapper, styles.timelineMissedCallStatus]}
        >
          <Icon
            name={CONSTANT_storybookIcon}
            size={12}
            color={CONSTANT_black1}
          />
        </View>
        <View>
          <Text style={styles.timelineTitleTextStyle}>
            20 AUG 2019 - 8:00 AM
          </Text>
          <Text style={styles.timelineTextStyle}>Missed call from Sanjay</Text>
        </View>
      </View>
      {/* Itinerary Timeline List ends */}

      {/* Itinerary Timeline List starts */}
      <View style={styles.itineraryTimelineList}>
        <View style={styles.timelineIconWrapper}>
          <Icon
            name={CONSTANT_storybookIcon}
            size={12}
            color={CONSTANT_black1}
          />
        </View>
        <View>
          <Text style={styles.timelineTitleTextStyle}>
            22 AUG 2019 - 8:00 AM
          </Text>
          <Text style={styles.timelineTextStyle}>
            Successfully booked the trip
          </Text>
          <Text style={styles.linkTextStyle} onPress={() => {}}>
            MAKE PAYMENT
          </Text>
        </View>
      </View>
      {/* Itinerary Timeline List ends */}
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
  },
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
    // textDecorationColor: "rgb(0, 198, 132)"
  }
});

export default ItineraryTimeline;
