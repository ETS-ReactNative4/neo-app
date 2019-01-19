import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Carousel from "../../../../CommonComponents/Carousel/Carousel";
import constants from "../../../../constants/constants";
import DayAheadBox from "../DayAheadLite/Components/DayAheadBox";
import DayAheadRow from "./Components/DayAheadRow";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import DayAheadTitle from "./Components/DayAheadTitle";

class DayAhead extends Component {
  static propTypes = forbidExtraProps({
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

  render() {
    const { title, elements } = this.props;

    return (
      <View style={styles.dayAheadContainer}>
        {title ? <DayAheadTitle title={title} /> : null}
        <View style={styles.rowWrapper}>
          <View style={styles.rowContainer}>
            {elements.map((day, dayIndex) => {
              const isLast = elements.length === dayIndex + 1;
              return <DayAheadRow key={dayIndex} {...day} isLast={isLast} />;
            })}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dayAheadContainer: {
    marginVertical: 16
  },
  rowContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 8,
    marginBottom: 16,
    ...constants.elevationFive
  },
  rowWrapper: {
    marginHorizontal: 24
  }
});

export default DayAhead;
