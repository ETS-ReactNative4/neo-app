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

const BookedItineraryTitle = inject("appState")(
  observer(({ title, duration, appState }) => {
    const { toggleItinerarySelection } = appState;
    const openMenu = () => {
      toggleItinerarySelection(true);
    };

    return (
      <TouchableHighlight
        style={styles.bookingTitleContainer}
        onPress={openMenu}
        underlayColor={"transparent"}
      >
        <MultiLineHeader duration={duration} title={title} />
      </TouchableHighlight>
    );
  })
);

BookedItineraryTitle.propTypes = {
  duration: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  bookingTitleContainer: {
    height: 40,
    minWidth: 24
  }
});

export default BookedItineraryTitle;
