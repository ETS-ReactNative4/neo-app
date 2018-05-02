import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import PropTypes from "prop-types";

const UpcomingCard = ({
  itineraryId,
  itineraryName,
  adults,
  departureCity,
  bookedOnDate
}) => {
  return (
    <View style={styles.upcomingCardContainer}>
      <View style={styles.imageArea}>
        <ImageBackground
          resizeMode={"cover"}
          source={constants.starterBackground}
          style={styles.imageBackground}
        >
          <Text style={styles.bookingID}>{itineraryId}</Text>
          <SimpleButton
            text={"Join"}
            action={() => {}}
            textColor={"white"}
            underlayColor={constants.firstColorAlpha(0.8)}
            containerStyle={{
              height: 24,
              width: 48,
              marginHorizontal: 16,
              marginVertical: 8
            }}
            textStyle={{ ...constants.font11(constants.primarySemiBold) }}
          />
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
            <Text
              style={styles.bookingDate}
            >{`Booked by you on ${bookedOnDate}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

UpcomingCard.propTypes = {
  itineraryId: PropTypes.string.isRequired,
  itineraryName: PropTypes.string.isRequired,
  adults: PropTypes.number.isRequired,
  departureCity: PropTypes.string.isRequired,
  bookedOnDate: PropTypes.string.isRequired
};

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
    fontFamily: constants.primaryLight,
    color: constants.black2,
    fontSize: 13,
    lineHeight: 13
  }
});

export default UpcomingCard;
