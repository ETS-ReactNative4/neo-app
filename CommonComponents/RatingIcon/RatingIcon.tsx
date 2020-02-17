import React from "react";
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity
} from "react-native";
import Icon from "../Icon/Icon";
import { CONSTANT_starActive } from "../../constants/imageAssets";
import {
  CONSTANT_secondColor,
  CONSTANT_shade4
} from "../../constants/colorPallete";

interface RatingIconProps {
  numOfStars: number;
  rating: number;
  starSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
  activeColor?: string;
  clickAction?: (rating: number) => any;
}

const RatingIcon = ({
  rating = 1,
  numOfStars = 5,
  starSize = 32,
  containerStyle,
  activeColor = CONSTANT_secondColor,
  clickAction = () => null
}: RatingIconProps) => {
  let temp: number = 1;
  const stars: number[] = [];
  for (let i = 1; i <= numOfStars; i++) {
    stars.push(temp);
    temp++;
  }

  return (
    <View style={[styles.ratingIconContainer, containerStyle]}>
      {stars.map((star, starIndex) => {
        const onStarClicked = () => {
          clickAction(star);
        };
        const isActive = star <= rating;
        return (
          <TouchableOpacity key={starIndex} onPress={onStarClicked}>
            <View style={styles.ratingIcon}>
              <Icon
                name={CONSTANT_starActive}
                size={starSize}
                color={isActive ? activeColor : CONSTANT_shade4}
              />
            </View>
          </TouchableOpacity>
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
  }
});

export default RatingIcon;
