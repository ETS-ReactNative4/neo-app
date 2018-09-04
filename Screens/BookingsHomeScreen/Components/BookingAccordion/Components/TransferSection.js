import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import _ from "lodash";

const TransferSection = ({ section, navigation }) => {
  return (
    <View>
      {section.items.map((transfer, index) => {
        let isLast = index === section.items.length - 1;

        return (
          <Transfer
            key={index}
            navigation={navigation}
            transfer={transfer}
            isLast={isLast}
          />
        );
      })}
    </View>
  );
};

TransferSection.propTypes = {
  section: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

const getTransferImage = (vehicle, type) => {
  let upperCaseVehicle = _.toUpper(vehicle);
  switch (upperCaseVehicle) {
    case "BOAT":
      return "http://d3lf10b5gahyby.cloudfront.net/misc/venice_speed_boat.jpg";
    case "FERRY":
      return "https://dig82prjykzgf.cloudfront.net/ferry.jpg";
    case "TRAIN":
      return "https://d3lf10b5gahyby.cloudfront.net/misc/transfers-train.jpg";
    case "BUS":
      return "https://d3lf10b5gahyby.cloudfront.net/misc/transfers-bus.jpg";
    case "SHUTTLE":
      return "https://d3lf10b5gahyby.cloudfront.net/misc/transfers-shuttle.jpg";
    case "CAR":
      if (type === "PRIVATE") {
        return "https://media.zigcdn.com/media/model/2016/Feb/honda_accord2016_600x300.jpg";
      } else {
        return "https://d3lf10b5gahyby.cloudfront.net/misc/transfers-shuttle.jpg";
      }
    default:
      return "https://media.zigcdn.com/media/model/2016/Feb/honda_accord2016_600x300.jpg";
  }
};

const Transfer = ({ transfer, isLast, navigation }) => {
  let customStyle = {};
  if (isLast) {
    customStyle = {
      borderBottomWidth: 1,
      paddingBottom: 16
    };
  }

  const openVoucher = () => navigation.navigate("TransferVoucher");

  return (
    <TouchableOpacity
      onPress={openVoucher}
      style={[styles.contentContainer, customStyle]}
    >
      <View style={styles.iconWrapper}>
        <Image
          resizeMode={"cover"}
          style={styles.contentIcon}
          source={{ uri: getTransferImage(transfer.vehicle, transfer.type) }}
        />
      </View>
      <View style={styles.contentTextContainer}>
        <View style={styles.contentHeaderWrapper}>
          <Text style={styles.contentHeader}>{`${moment(
            `${transfer.day}/${transfer.mon}/${constants.currentYear}`,
            "DD/MMM/YYYY"
          ).format("MMM DD")} (${transfer.duration})`}</Text>
        </View>
        <View style={styles.contentTextWrapper}>
          <Text style={styles.contentText} numberOfLines={2}>
            {transfer.text}
          </Text>
        </View>
      </View>
      {/*<View style={styles.rightPlaceholder}>*/}
      {/*<Text style={styles.rightPlaceholderText}>Stayed</Text>*/}
      {/*</View>*/}
    </TouchableOpacity>
  );
};

Transfer.propTypes = {
  transfer: PropTypes.object.isRequired,
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
    minHeight: 40,
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
    minHeight: 24,
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

export default TransferSection;
