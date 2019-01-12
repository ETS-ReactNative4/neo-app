import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import PropTypes from "prop-types";
import moment from "moment";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import getLocaleString from "../../../Services/getLocaleString/getLocaleString";
import { recordEvent } from "../../../Services/analytics/analyticsService";

/**
 * TODO: Need minimum payment due
 */
const PaymentInfoCard = ({
  itineraryId,
  itineraryName,
  selectItinerary,
  isLast,
  isPaymentPending,
  nextPendingDate,
  paymentDue,
  totalAmountPaid
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        recordEvent(constants.paymentScreenItineraryCardClick);
        selectItinerary(itineraryId);
      }}
      style={[styles.upcomingCardContainer, isLast ? { marginBottom: 16 } : {}]}
    >
      <View style={styles.imageArea}>
        <ImageBackground
          resizeMode={"cover"}
          source={constants.starterBackground}
          style={styles.imageBackground}
        >
          <Text style={styles.bookingID}>{`PYT${itineraryId
            .substr(itineraryId.length - 7)
            .toUpperCase()}`}</Text>
        </ImageBackground>
      </View>
      <View style={styles.infoArea}>
        <View style={styles.infoTextWrapper}>
          <View style={styles.dateWrapper}>
            {isPaymentPending ? (
              <Text style={styles.paymentDueText}>{`Next Payment due ${moment(
                nextPendingDate
              ).fromNow()}`}</Text>
            ) : (
              <Text
                style={[styles.paymentDueText, styles.paymentCompleteText]}
              >{`Payment Complete!`}</Text>
            )}
          </View>
          <View style={styles.bookingNameWrapper}>
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={styles.bookingName}
            >
              {itineraryName}
            </Text>
          </View>
          <View style={styles.bookingDetailWrapper}>
            <Text style={styles.bookingDetail}>
              {isPaymentPending ? `Minimum Payment due:` : `Total Amount Paid:`}
            </Text>
          </View>
          <View style={styles.bookingDateWrapper}>
            <Text style={styles.bookingDate}>{`${
              isPaymentPending
                ? getLocaleString(paymentDue)
                : getLocaleString(totalAmountPaid)
            }`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

PaymentInfoCard.propTypes = forbidExtraProps({
  itineraryId: PropTypes.string.isRequired,
  itineraryName: PropTypes.string.isRequired,
  selectItinerary: PropTypes.func.isRequired,
  isLast: PropTypes.bool.isRequired,
  isPaymentPending: PropTypes.bool.isRequired,
  nextPendingDate: PropTypes.number.isRequired,
  paymentDue: PropTypes.number.isRequired,
  totalAmountPaid: PropTypes.number.isRequired
});

const styles = StyleSheet.create({
  upcomingCardContainer: {
    height: 208,
    marginHorizontal: 24,
    backgroundColor: "white",
    marginTop: 16,
    borderRadius: 5,
    shadowColor: constants.shade4,
    shadowOffset: {
      height: 5,
      width: 0
    },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    elevation: 5
  },
  imageArea: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flex: 1,
    overflow: "hidden"
  },
  imageBackground: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  bookingID: {
    color: "rgba(254,228,10,1)",
    ...constants.font13(constants.primarySemiBold),
    marginHorizontal: 16,
    marginVertical: 8
  },
  infoArea: {
    flex: 1
    // ...Platform.select({
    //   android: {
    //     borderColor: constants.black2,
    //     borderBottomRightRadius: 5,
    //     borderBottomLeftRadius: 5,
    //     borderBottomWidth: 0.5,
    //     borderLeftWidth: 0.5,
    //     borderRightWidth: 0.5
    //   }
    // })
  },
  infoTextWrapper: {
    height: 72,
    marginHorizontal: 16,
    marginTop: 16
  },
  dateWrapper: {
    height: 16,
    justifyContent: "center"
  },
  paymentDueText: {
    ...constants.fontCustom(constants.primarySemiBold, 14),
    color: "rgba(208,2,27,1)"
  },
  paymentCompleteText: {
    color: constants.firstColor
  },
  date: {
    fontFamily: constants.primarySemiBold,
    color: "rgba(155,155,155,1)",
    fontSize: 14,
    lineHeight: 14
  },
  bookingNameWrapper: {
    height: 24,
    justifyContent: "center"
  },
  bookingName: {
    fontFamily: constants.primarySemiBold,
    color: constants.black1,
    fontSize: 17,
    lineHeight: 17
  },
  bookingDetailWrapper: {
    height: 16,
    justifyContent: "center"
  },
  bookingDetail: {
    fontFamily: constants.primaryLight,
    color: constants.black2,
    fontSize: 13,
    lineHeight: 13
  },
  bookingDateWrapper: {
    height: 16,
    justifyContent: "center"
  },
  bookingDate: {
    fontFamily: constants.primarySemiBold,
    color: constants.firstColor,
    fontSize: 17,
    lineHeight: 17
  }
});

export default PaymentInfoCard;
