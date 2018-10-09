import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";
import StarRating from "../../../CommonComponents/StarRating/StarRating";

const PlaceDetails = ({
  name,
  rating,
  ratingCount,
  type,
  isClosed,
  closesAt,
  opensAt,
  distance,
  containerStyle
}) => {
  if (!containerStyle) containerStyle = {};
  return (
    <TouchableOpacity
      onPress={() => null}
      activeOpacity={0.8}
      style={[styles.placeDetailsContainer, containerStyle]}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{name}</Text>
        <Text style={styles.distanceText}>{distance}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <StarRating containerStyle={{ height: 16 }} starSize={16} rating={4} />
        <Text style={styles.ratingText}>{`(${ratingCount}). ${type}`}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          <Text style={styles.closedText}>
            {isClosed ? `Closed Now. ` : ""}
          </Text>
          {`${isClosed ? `${opensAt}` : `${closesAt}`}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

PlaceDetails.propTypes = forbidExtraProps({
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  ratingCount: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  isClosed: PropTypes.bool.isRequired,
  closesAt: PropTypes.string.isRequired,
  opensAt: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
  containerStyle: PropTypes.object
});

const styles = StyleSheet.create({
  placeDetailsContainer: {
    marginHorizontal: 24
  },
  titleContainer: {
    height: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4
  },
  titleText: {
    ...constants.fontCustom(constants.primarySemiBold, 17),
    color: constants.black1
  },
  distanceText: {
    ...constants.fontCustom(constants.primarySemiBold, 13),
    color: "rgba(74,144,226,1)"
  },
  ratingContainer: {
    height: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 4
  },
  ratingText: {
    ...constants.fontCustom(constants.primaryLight, 13),
    color: constants.shade1,
    marginLeft: 4,
    ...Platform.select({
      ios: {
        marginTop: 3
      },
      android: {
        marginTop: 2
      }
    })
  },
  statusContainer: {
    height: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  statusText: {
    ...constants.fontCustom(constants.primaryLight, 13),
    color: constants.shade2
  },
  closedText: {
    color: "rgba(255,87,109,1)"
  }
});

export default PlaceDetails;
