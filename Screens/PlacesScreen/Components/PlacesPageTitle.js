import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { inject, observer } from "mobx-react";
import MultiLineHeader from "../../../CommonComponents/MultilineHeader/MultiLineHeader";
import { recordEvent } from "../../../Services/analytics/analyticsService";
import constants from "../../../constants/constants";

const PlacesPageTitle = inject("itineraries")(
  inject("placesStore")(
    inject("appState")(
      observer(({ appState, placesStore, itineraries }) => {
        const { toggleItinerarySelection, selectedDate } = appState;
        const { getCityById } = itineraries;
        const openMenu = () => {
          recordEvent(constants.Places.event, {
            click: constants.Places.click.header
          });
          toggleItinerarySelection(true);
        };
        const selectedCity = placesStore.selectedCity;

        const city = getCityById(selectedCity);
        let cityName = "";
        if (city) {
          cityName = city.cityName;
        }

        return (
          <TouchableHighlight
            style={styles.placesTitleContainer}
            onPress={openMenu}
            underlayColor={"transparent"}
          >
            <MultiLineHeader duration={`Explore`} title={cityName} />
          </TouchableHighlight>
        );
      })
    )
  )
);

const styles = StyleSheet.create({
  placesTitleContainer: {
    height: 40,
    minWidth: 24
  }
});

export default PlacesPageTitle;
