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
import { observer, inject } from "mobx-react/custom";
import MultiLineHeader from "../../../CommonComponents/MultilineHeader/MultiLineHeader";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

const BookedItineraryTitle = inject("itineraries")(
  inject("appState")(
    observer(({ appState, itineraries }) => {
      const { toggleItinerarySelection, selectedDate } = appState;
      const openMenu = () => {
        toggleItinerarySelection(true);
      };
      const { cities } = itineraries;

      /**
       * TODO: Might cause problems with timezone check with different timezones...
       */
      const selected = moment(
        `${selectedDate} 05:30`,
        "DDMMYYYY hh:mm"
      ).toDate();
      let selectedCity = cities.find(city => {
        const range = moment.range(city.startDay, city.endDay);
        return range.contains(selected);
      });
      if (!selectedCity) {
        selectedCity = cities[0];
      }

      return (
        <TouchableHighlight
          style={styles.bookingTitleContainer}
          onPress={openMenu}
          underlayColor={"transparent"}
        >
          <MultiLineHeader
            duration={`${moment(selectedCity.startDay).format(
              "MMM DD"
            )} - ${moment(selectedCity.endDay).format("MMM DD")}`}
            title={selectedCity.city}
          />
        </TouchableHighlight>
      );
    })
  )
);

BookedItineraryTitle.propTypes = {};

const styles = StyleSheet.create({
  bookingTitleContainer: {
    height: 40,
    minWidth: 24
  }
});

export default BookedItineraryTitle;
