import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";

const HotelSection = ({ section, navigation }) => {
  return (
    <View>
      {section.items.map((hotel, index) => {
        let isLast = index === section.items.length - 1;

        return (
          <Hotel
            key={index}
            hotel={hotel}
            isLast={isLast}
            navigation={navigation}
          />
        );
      })}
    </View>
  );
};

HotelSection.propTypes = {
  section: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

const Hotel = ({ hotel, isLast, navigation }) => {
  let customStyle = {};
  if (isLast) {
    customStyle = {
      borderBottomWidth: 1,
      paddingBottom: 16
    };
  }

  const openVoucher = () =>
    navigation.navigate("HotelVoucher", {
      identifier: hotel.costingKey,
      type: constants.hotelVoucher
    });

  return (
    <TouchableOpacity
      onPress={openVoucher}
      style={[styles.contentContainer, customStyle]}
    >
      <View style={styles.iconWrapper}>
        <Image
          defaultSource={constants.splashBackground}
          resizeMode={"cover"}
          style={styles.contentIcon}
          source={{ uri: hotel.imageURL }}
        />
      </View>
      <View style={styles.contentTextContainer}>
        <View style={styles.contentHeaderWrapper}>
          <Text style={styles.contentHeader}>{`${moment(
            hotel.checkInDate,
            "DD/MMM/YYYY"
          ).format("MMM DD")} - ${moment(
            hotel.checkOutDate,
            "DD/MMM/YYYY"
          ).format("MMM DD")}, ${hotel.cityName}`}</Text>
        </View>
        <View style={styles.contentTextWrapper}>
          <Text style={styles.contentText} numberOfLines={1}>
            {hotel.name}
          </Text>
        </View>
      </View>
      <View style={styles.rightPlaceholder}>
        <Text style={styles.rightPlaceholderText}>Stayed</Text>
      </View>
    </TouchableOpacity>
  );
};

Hotel.propTypes = {
  hotel: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 16,
    borderBottomColor: constants.shade4,
    flexDirection: "row",
    alignItems: "center"
  },
  iconWrapper: {
    overflow: "hidden",
    height: 40,
    width: 40,
    borderRadius: 20
  },
  contentIcon: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  contentTextContainer: {
    height: 40,
    marginLeft: 16
  },
  contentHeaderWrapper: {
    height: 16,
    justifyContent: "center"
  },
  contentHeader: {
    fontFamily: constants.primaryLight,
    fontSize: 14,
    lineHeight: 14,
    color: constants.shade2
  },
  contentTextWrapper: {
    height: 24,
    maxWidth: responsiveWidth(60),
    justifyContent: "center"
  },
  contentText: {
    fontFamily: constants.primaryLight,
    fontSize: 17,
    maxWidth: responsiveWidth(60)
  },
  rightPlaceholder: {
    flex: 1,
    alignItems: "flex-end"
  },
  rightPlaceholderText: {
    fontFamily: constants.primaryLight,
    fontSize: 10,
    color: constants.black2
  }
});

export default HotelSection;
