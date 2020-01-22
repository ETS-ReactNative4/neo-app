import React from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";

import Icon from "../Icon/Icon";

import { CONSTANT_starActive } from "../../constants/imageAssets";
import {
  CONSTANT_secondColor,
  CONSTANT_black1
} from "../../constants/colorPallete";

interface RatingIconProps {
  rating: number;
  starSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
  isActive?: boolean;
  customStarColor?: string;
}

const RatingIcon = ({
  rating = 1,
  starSize = 24,
  isActive = false,
  containerStyle,
  customStarColor = ""
}: RatingIconProps) => {
  let temp = rating;
  const stars = [];
  for (let i = 1; i <= rating; i++) {
    temp--;
    stars.push(temp);
  }

  return (
    <View style={[styles.ratingIconContainer, containerStyle]}>
      {stars.map((star, starIndex) => {
        return (
          <View
            style={[
              styles.ratingIcon,
              isActive ? styles.activeOpacity : styles.defaultOpacity
            ]}
            key={starIndex}
          >
            <Icon
              name={CONSTANT_starActive}
              size={starSize}
              color={
                customStarColor
                  ? customStarColor
                  : isActive
                  ? CONSTANT_secondColor
                  : CONSTANT_black1
              }
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  ratingIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },

  ratingIcon: {
    marginHorizontal: 10
  },

  activeOpacity: {
    opacity: 1
  },
  defaultOpacity: {
    opacity: 0.1
  }
});

export default RatingIcon;
