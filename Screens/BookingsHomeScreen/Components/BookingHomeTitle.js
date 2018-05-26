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
import MultiLineHeader from "../../../CommonComponents/MultilineHeader/MultiLineHeader";

const BookingHomeTitle = ({ title, duration, action }) => {
  return (
    <TouchableHighlight
      style={styles.bookingTitleContainer}
      onPress={action}
      underlayColor={"transparent"}
    >
      <MultiLineHeader duration={duration} title={title} />
    </TouchableHighlight>
  );
};

BookingHomeTitle.propTypes = {
  duration: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  bookingTitleContainer: {
    height: 40,
    minWidth: 24
  }
});

export default BookingHomeTitle;
