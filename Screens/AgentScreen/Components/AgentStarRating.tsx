import React from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

import RatingIcon from "../../../CommonComponents/RatingIcon/RatingIcon";

interface AgentStarRatingProps {
  count: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const AgentStarRating = ({ count, containerStyle }: AgentStarRatingProps) => {
  return (
    <View style={[styles.agentStarRatingContainer, containerStyle]}>
      <RatingIcon rating={count} />
    </View>
  );
};

const styles = StyleSheet.create({
  agentStarRatingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
    width: responsiveWidth(100)
  }
});

export default AgentStarRating;
