import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { inject, observer } from "mobx-react/custom";
import MultiLineHeader from "../../../CommonComponents/MultilineHeader/MultiLineHeader";
import { recordEvent } from "../../../Services/analytics/analyticsService";
import constants from "../../../constants/constants";

const PlacesPageTitle = inject("placesStore")(
  inject("appState")(
    observer(({ appState, placesStore }) => {
      const { toggleItinerarySelection, selectedDate } = appState;
      const openMenu = () => {
        recordEvent(constants.placesHeaderClick);
        toggleItinerarySelection(true);
      };
      const selectedCity = placesStore.selectedCity;

      return (
        <TouchableHighlight
          style={styles.placesTitleContainer}
          onPress={openMenu}
          underlayColor={"transparent"}
        >
          <MultiLineHeader duration={`Explore`} title={selectedCity.city} />
        </TouchableHighlight>
      );
    })
  )
);

const styles = StyleSheet.create({
  placesTitleContainer: {
    height: 40,
    minWidth: 24
  }
});

export default PlacesPageTitle;
