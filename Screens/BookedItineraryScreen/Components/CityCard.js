import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  Platform,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";

const CityCard = ({
  cityImage,
  activityText,
  cityName,
  action,
  containerStyle
}) => {
  if (!containerStyle) containerStyle = {};

  return (
    <ImageBackground
      source={cityImage}
      resizeMode={"cover"}
      style={[styles.cityContainer, containerStyle]}
    >
      <Image
        source={constants.headerBackgroundShape}
        style={styles.headerBackground}
      />
      <View style={styles.activityRow}>
        <Text style={styles.activityText}>{activityText}</Text>
      </View>
      <View style={styles.cityInfoRow}>
        <View style={styles.cityNameView}>
          <Text
            style={styles.cityName}
            numberOfLines={1}
            ellipsizeMode={"tail"}
          >
            {cityName}
          </Text>
        </View>
        <TouchableOpacity onPress={action} style={styles.actionView}>
          <Icon name={constants.locationIcon} size={16} color={"white"} />
          <Text style={styles.actionText}>Explore on Map</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

CityCard.propTypes = {
  cityImage: PropTypes.object.isRequired,
  activityText: PropTypes.string.isRequired,
  cityName: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  containerStyle: PropTypes.object
};

const styles = StyleSheet.create({
  cityContainer: {
    height: 152,
    justifyContent: "space-between"
  },

  headerBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 47.5,
    width: 181.25
  },

  activityRow: {
    height: 16,
    backgroundColor: constants.secondColor,
    alignItems: "center",
    justifyContent: "center"
  },
  activityText: {
    ...constants.fontCustom(constants.primaryLight, 12),
    ...Platform.select({
      android: {
        marginTop: 1
      },
      ios: {
        marginTop: 3
      }
    })
  },

  cityInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 47.5,
    paddingHorizontal: 24
  },
  cityNameView: {
    width: 129.75,
    height: 22,
    alignItems: "center",
    justifyContent: "center"
  },
  cityName: {
    fontFamily: constants.primarySemiBold,
    color: constants.black1,
    fontSize: 20,
    width: 129.75
  },
  actionView: {
    flexDirection: "row",
    height: 28,
    padding: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  actionText: {
    fontFamily: constants.primarySemiBold,
    fontSize: 14,
    color: "white",
    marginLeft: 4,
    marginTop: -3
  }
});

export default CityCard;
