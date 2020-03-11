import React from "react";

import { StyleSheet, View, Text } from "react-native";
import Icon from "../../Icon/Icon";

import {
  CONSTANT_shade1,
  CONSTANT_firstColor
} from "../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";
import { CONSTANT_checkIcon } from "../../../constants/imageAssets";

interface ActivityListProps {
  activities: string[];
}

const ActivityList = ({ activities = [] }: ActivityListProps) => {
  const activitiesSlice = activities.slice(0, 3);
  return (
    <View style={styles.listWrapper}>
      {activitiesSlice.map((activitiesData, activityIndex) => {
        return (
          <View style={styles.listInner} key={activityIndex}>
            <View style={styles.checkIconStyle}>
              <Icon
                name={CONSTANT_checkIcon}
                size={14}
                color={CONSTANT_firstColor}
              />
            </View>
            <Text style={styles.listText}>{activitiesData}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  listWrapper: {
    marginBottom: 8
  },
  listInner: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8
  },
  checkIconStyle: {
    marginTop: 2
  },
  listText: {
    flex: 1,
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14, 18),
    marginLeft: 8
  },
  bottomWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16
  }
});

export default ActivityList;
