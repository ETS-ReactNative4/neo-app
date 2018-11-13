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
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import { responsiveWidth } from "react-native-responsive-dimensions";

const PlaceDetails = ({
  name,
  rating,
  ratingCount,
  type,
  isClosed,
  opensAt,
  distance,
  containerStyle,
  action,
  formattedAddress,
  isDetailed
}) => {
  if (!containerStyle) containerStyle = {};
  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.8}
      style={[styles.placeDetailsContainer, containerStyle]}
    >
      <View
        style={[
          styles.titleContainer,
          isDetailed ? { marginTop: 24, marginBottom: 0 } : null
        ]}
      >
        <Text
          style={[styles.titleText, isDetailed ? styles.detailedTitle : null]}
        >
          {name}
        </Text>
        {!isDetailed && distance ? (
          <Text style={styles.distanceText}>{distance}</Text>
        ) : null}
      </View>
      <View
        style={[styles.ratingContainer, isDetailed ? { height: 20 } : null]}
      >
        <StarRating
          containerStyle={{ height: isDetailed ? 18 : 16 }}
          starSize={isDetailed ? 18 : 16}
          rating={4}
        />
        <Text
          style={[styles.ratingText, isDetailed ? styles.detailedText : null]}
        >{`${ratingCount ? `(${ratingCount}) ` : ""}${type}`}</Text>
      </View>
      {isDetailed ? (
        <View style={styles.addressTextWrapper}>
          <Text style={styles.addressText}>{formattedAddress}</Text>
        </View>
      ) : null}
      {isDetailed && distance ? (
        <View style={styles.distanceTextWrapper}>
          <Text
            style={styles.detailedDistanceText}
          >{`${distance} from your current location`}</Text>
        </View>
      ) : null}
      <View style={styles.statusContainer}>
        <Text
          style={[styles.statusText, isDetailed ? styles.detailedText : null]}
        >
          <Text style={styles.closedText}>
            {isClosed ? `Closed Now. ` : ""}
          </Text>
          <Text style={styles.openText}>{!isClosed ? `Open Now. ` : ""}</Text>
          {opensAt}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

PlaceDetails.propTypes = forbidExtraProps({
  name: PropTypes.string,
  rating: PropTypes.number,
  ratingCount: PropTypes.number,
  type: PropTypes.string,
  isClosed: PropTypes.bool,
  opensAt: PropTypes.string,
  distance: PropTypes.string,
  containerStyle: PropTypes,
  action: PropTypes.func,
  formattedAddress: PropTypes.string,
  isDetailed: PropTypes.bool
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
  detailedTitle: {
    fontSize: 20,
    lineHeight: 20
  },
  distanceText: {
    ...constants.fontCustom(constants.primarySemiBold, 13),
    color: "rgba(74,144,226,1)"
  },
  detailedText: {
    fontSize: 15,
    lineHeight: 15
  },
  ratingContainer: {
    height: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 8
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
  addressTextWrapper: {
    marginBottom: 8
  },
  addressText: {
    ...constants.fontCustom(constants.primaryLight, 15),
    color: constants.black1
  },
  distanceTextWrapper: {
    height: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 4
  },
  detailedDistanceText: {
    ...constants.fontCustom(constants.primaryLight, 15),
    color: "rgba(74,144,226,1)"
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
  },
  openText: {
    color: constants.firstColor
  }
});

export default PlaceDetails;
