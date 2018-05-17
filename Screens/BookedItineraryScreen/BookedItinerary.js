import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  LayoutAnimation
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import BookingTitle from "../BookingsHomeScreen/Components/BookingTitle";
import SearchButton from "../../CommonComponents/SearchButton/SearchButton";
import BookedItineraryTopBar from "./Components/BookedItineraryTopBar/BookedItineraryTopBar";
import { inject, observer } from "mobx-react/custom";
import Slot from "./Components/Slot";
import moment from "moment/moment";

@inject("itineraries")
@observer
class BookedItinerary extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader
          TitleComponent={
            <BookingTitle
              duration={"Mar 14 - Mar 24"}
              title={"PYT1233345"}
              action={() => {}}
            />
          }
          RightButton={<SearchButton action={() => {}} />}
          title={""}
          navigation={navigation}
        />
      )
    };
  };

  state = {
    selectedDay: moment(this.props.itineraries.days[0]).format("DDMMYYYY"),
    headers: this.props.itineraries.days.map(day =>
      moment(day).format("DDMMYYYY")
    ),
    headerPositions: {},
    sections: this.props.itineraries.days.map(day =>
      moment(day).format("DDMMYYYY")
    ),
    sectionPositions: {}
  };
  _headerScroll = {};

  selectDay = day => {
    this.setState(
      {
        selectedDay: day
      },
      () => {
        this.refs._contentScroll.scrollTo({
          x: 0,
          y: this.state.sectionPositions[this.state.selectedDay],
          animated: false
        });
      }
    );
  };

  onItemLayout = (
    {
      nativeEvent: {
        layout: { x, y, width, height }
      }
    },
    section
  ) => {
    const newState = { ...this.state };
    newState.sectionPositions[section] = y;
    this.setState(newState);
  };

  onHeaderLayout = (
    {
      nativeEvent: {
        layout: { x, y, width, height }
      }
    },
    section
  ) => {
    const newState = { ...this.state };
    newState.headerPositions[section] = x;
    this.setState(newState);
  };

  onItemScroll = ({
    nativeEvent: {
      contentOffset: { y, x }
    }
  }) => {
    let _currentSection;
    this.state.sections.forEach(section => {
      if (y + responsiveHeight(10) > this.state.sectionPositions[section])
        _currentSection = section;
    });
    this.setState({ selectedDay: _currentSection }, () => {
      this._headerScroll.scrollTo({
        x:
          this.state.headerPositions[this.state.selectedDay] -
          responsiveWidth(45),
        y: 0,
        animated: true
      });
    });
  };

  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  render() {
    const { days, slots } = this.props.itineraries;

    return (
      <View style={styles.bookedItineraryContainer}>
        <BookedItineraryTopBar
          selectedDay={this.state.selectedDay}
          selectDay={this.selectDay}
          _headerScroll={_headerScroll => (this._headerScroll = _headerScroll)}
          onHeaderLayout={this.onHeaderLayout}
        />
        <ScrollView
          ref={"_contentScroll"}
          onScroll={this.onItemScroll}
          scrollEventThrottle={100}
        >
          {days.map((day, index) => {
            return (
              <Slot
                key={index}
                day={day}
                slot={slots[index]}
                onItemLayout={this.onItemLayout}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bookedItineraryContainer: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default BookedItinerary;
