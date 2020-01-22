import React from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

import RatingIcon from "../../../CommonComponents/RatingIcon/RatingIcon";

interface AgentStarRatingProps {
  rating: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const AgentStarRating = ({ rating, containerStyle }: AgentStarRatingProps) => {
  return (
    <View style={[styles.agentStarRatingContainer, containerStyle]}>
      <RatingIcon rating={rating} />
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
