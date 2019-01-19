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

/**
 * TODO:
 * missing from & to dates of the trip
 */
/**
 * TODO:
 * missing from & to dates of the trip
 */
const UpcomingCard = ({
  itineraryId,
  itineraryName,
  adults,
  departureCity,
  bookedOnDateMillis,
  selectItinerary,
  isLast
}) => {
  return (
    <TouchableOpacity
      onPress={() => selectItinerary(itineraryId)}
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
          {/**
           * TODO: make join button conditional
           */}
          {/*<SimpleButton*/}
          {/*text={"Join"}*/}
          {/*action={() => selectItinerary(itineraryId)}*/}
          {/*textColor={"white"}*/}
          {/*underlayColor={constants.firstColorAlpha(0.8)}*/}
          {/*containerStyle={{*/}
          {/*height: 24,*/}
          {/*width: 48,*/}
          {/*marginHorizontal: 16,*/}
          {/*marginVertical: 8*/}
          {/*}}*/}
          {/*textStyle={{*/}
          {/*...constants.font11(constants.primarySemiBold),*/}
          {/*marginLeft: 2,*/}
          {/*marginTop: -2*/}
          {/*}}*/}
          {/*/>*/}
        </ImageBackground>
      </View>
      <View style={styles.infoArea}>
        <View style={styles.infoTextWrapper}>
          <View style={styles.dateWrapper}>
            <Text style={styles.date}>{`Apr 03 - Apr 12`}</Text>
          </View>
          <View style={styles.bookingNameWrapper}>
            <Text style={styles.bookingName}>{itineraryName}</Text>
          </View>
          <View style={styles.bookingDetailWrapper}>
            <Text
              style={styles.bookingDetail}
            >{`${adults} adults, departing ${departureCity}.`}</Text>
          </View>
          <View style={styles.bookingDateWrapper}>
            <Text style={styles.bookingDate}>{`Booked by you on ${moment(
              bookedOnDateMillis
            ).format("DD/MM/YY")}`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

UpcomingCard.propTypes = {
  itineraryId: PropTypes.string.isRequired,
  itineraryName: PropTypes.string.isRequired,
  adults: PropTypes.number.isRequired,
  departureCity: PropTypes.string.isRequired,
  bookedOnDateMillis: PropTypes.number.isRequired,
  selectItinerary: PropTypes.func.isRequired,
  isLast: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  upcomingCardContainer: {
    minHeight: 208,
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
    height: 104,
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
    minHeight: 72,
    marginHorizontal: 16,
    marginTop: 16
  },
  dateWrapper: {
    minHeight: 16,
    justifyContent: "center"
  },
  date: {
    fontFamily: constants.primarySemiBold,
    color: "rgba(155,155,155,1)",
    fontSize: 14,
    lineHeight: 14
  },
  bookingNameWrapper: {
    minHeight: 24,
    justifyContent: "center",
    marginBottom: 4
  },
  bookingName: {
    fontFamily: constants.primarySemiBold,
    color: constants.black1,
    fontSize: 17,
    lineHeight: 20
  },
  bookingDetailWrapper: {
    minHeight: 16,
    justifyContent: "center"
  },
  bookingDetail: {
    fontFamily: constants.primaryLight,
    color: constants.black2,
    fontSize: 13,
    lineHeight: 13
  },
  bookingDateWrapper: {
    minHeight: 16,
    justifyContent: "center",
    marginBottom: 4
  },
  bookingDate: {
    fontFamily: constants.primaryLight,
    color: constants.black2,
    fontSize: 13,
    lineHeight: 13
  }
});

export default UpcomingCard;
