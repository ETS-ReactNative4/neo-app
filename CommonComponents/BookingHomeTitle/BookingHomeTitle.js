import React from "react";
import {
  TouchableHighlight,
  View,
  Text,
  Platform,
  StyleSheet,
  Image
} from "react-native";
import PropTypes from "prop-types";
import MultiLineHeader from "../MultilineHeader/MultiLineHeader";
import { inject, observer } from "mobx-react/custom";
import moment from "moment";

const BookingHomeTitle = inject("itineraries")(
  observer(({ action, itineraries }) => {
    const { startEndDates, selectedItineraryId } = itineraries;

    const startDate = moment(startEndDates.startDate).format("MMM DD");
    const endDate = moment(startEndDates.lastDate).format("MMM DD");

    return (
      <TouchableHighlight
        style={styles.bookingTitleContainer}
        onPress={action}
        underlayColor={"transparent"}
      >
        <MultiLineHeader
          // duration={`${startDate} - ${endDate}`}
          title={`PYT${selectedItineraryId
            .substr(selectedItineraryId.length - 7)
            .toUpperCase()}`}
        />
      </TouchableHighlight>
    );
  })
);

BookingHomeTitle.propTypes = {
  action: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  bookingTitleContainer: {
    height: 40,
    minWidth: 24
  }
});

export default BookingHomeTitle;
