import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "../Icon/Icon";
import PropTypes from "prop-types";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../constants/constants";

const StarRating = ({ rating, starSize, containerStyle }) => {
  if (!containerStyle) containerStyle = {};

  let temp = rating;
  const stars = [];
  for (let i = 1; i <= rating; i++) {
    temp--;
    stars.push(temp);
  }

  return (
    <View style={[styles.ratingContainer, containerStyle]}>
      {stars.map((star, starIndex) => {
        return (
          <Icon
            key={starIndex}
            name={constants.starActive}
            color={"rgba(245,166,35,1)"}
            size={starSize}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});

StarRating.propTypes = forbidExtraProps({
  rating: PropTypes.number.isRequired,
  containerStyle: PropTypes.object,
  starSize: PropTypes.number.isRequired
});

export default StarRating;
