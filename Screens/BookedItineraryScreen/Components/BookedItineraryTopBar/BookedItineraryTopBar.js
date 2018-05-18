import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import DateItem from "./Components/DateItem";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react/custom";

@inject("itineraries")
@observer
class BookedItineraryTopBar extends Component {
  static propTypes = {
    selectedDay: PropTypes.string,
    selectDay: PropTypes.func.isRequired,
    _headerScroll: PropTypes.func.isRequired,
    onHeaderLayout: PropTypes.func.isRequired
  };

  render() {
    const { selectedDay, selectDay, onHeaderLayout } = this.props;
    const { days } = this.props.itineraries;

    return (
      <View style={styles.topBarContainer}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.scrollContainer}
          ref={this.props._headerScroll}
          scrollEventThrottle={100}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.placeHolder} />
          {days.map((day, index) => {
            return (
              <DateItem
                onHeaderLayout={onHeaderLayout}
                key={index}
                day={day}
                index={index}
                selectDay={selectDay}
                selectedDay={selectedDay}
              />
            );
          })}
          <View style={styles.placeHolder} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topBarContainer: {
    height: 40,
    marginVertical: 6
  },
  scrollContainer: {
    flexDirection: "row"
  },
  scrollContent: {
    justifyContent: "center",
    alignItems: "center"
  },
  placeHolder: {
    height: 24,
    width: responsiveWidth(45)
  }
});

export default BookedItineraryTopBar;
