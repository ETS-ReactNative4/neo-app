import React from "react";
import DayAheadTitle from "../DayAhead/Components/DayAheadTitle";
import { View } from "react-native";
import DayAheadBox from "./Components/DayAheadBox";
import Carousel from "../../../../CommonComponents/Carousel/Carousel";
import { StyleSheet } from "react-native";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";

const DayAheadLite = ({ title, elements }) => {
  return (
    <View style={styles.dayAheadContainer}>
      {title ? <DayAheadTitle title={title} /> : null}
      <Carousel firstMargin={24} containerStyle={{ height: 92 }}>
        {elements.map((day, dayIndex) => {
          return <DayAheadBox {...day} key={dayIndex} />;
        })}
      </Carousel>
    </View>
  );
};

DayAheadLite.propTypes = forbidExtraProps({
  title: PropTypes.string,
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      voucherType: PropTypes.string.isRequired,
      costingIdentifier: PropTypes.string.isRequired,
      deepLink: PropTypes.object
    })
  ).isRequired
});

const styles = StyleSheet.create({
  dayAheadContainer: {
    marginVertical: 16
  }
});

export default DayAheadLite;
