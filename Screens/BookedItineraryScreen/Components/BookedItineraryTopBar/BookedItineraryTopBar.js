import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import DateItem from "./Components/DateItem";

class BookedItineraryTopBar extends Component {
  state = {
    date: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
  };

  render() {
    return (
      <View style={styles.topBarContainer}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.placeHolder} />
          {this.state.date.map((day, index) => {
            return <DateItem key={index} date={day} />;
          })}
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
    width: responsiveWidth(20)
  }
});

export default BookedItineraryTopBar;
