import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  Animated,
  Easing
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import BookedItineraryTopBar from "./Components/BookedItineraryTopBar/BookedItineraryTopBar";
import { inject, observer } from "mobx-react/custom";
import Slot from "./Components/Slot";
import moment from "moment/moment";
import BookedItineraryTitle from "./Components/BookedItineraryTitle";
import CitySelectionMenu from "../../CommonComponents/CitySelectionMenu/CitySelectionMenu";
import { recordEvent } from "../../Services/analytics/analyticsService";
import constants from "../../constants/constants";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import DeepLinkHandler from "../../CommonComponents/DeepLinkHandler/DeepLinkHandler";

@ErrorBoundary()
@DeepLinkHandler
@inject("appState")
@inject("itineraries")
@observer
class BookedItinerary extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader
          TitleComponent={<BookedItineraryTitle />}
          // RightButton={<SearchButton action={() => {}} />}
          title={""}
          navigation={navigation}
        />
      )
    };
  };

  state = {
    selectedDay: moment(this.props.itineraries.days[0]).format("x"),
    headers: this.props.itineraries.days.map(day => moment(day).format("x")),
    headerPositions: {},
    sections: this.props.itineraries.days.map(day => moment(day).format("x")),
    sectionPositions: {},
    isScrollRecorded: false
  };
  _headerScroll = {};
  spinValue = new Animated.Value(0);

  selectDay = day => {
    this.setState(
      {
        selectedDay: day
      },
      () => {
        this.props.appState.setSelectedDate(day);
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
    const sectionPositions = { ...this.state.sectionPositions };
    sectionPositions[section] = y;
    this.setState({ sectionPositions });
  };

  onHeaderLayout = (
    {
      nativeEvent: {
        layout: { x, y, width, height }
      }
    },
    section
  ) => {
    const headerPositions = { ...this.state.headerPositions };
    headerPositions[section] = x;
    this.setState({ headerPositions });
  };

  onItemScroll = ({
    nativeEvent: {
      contentOffset: { y, x }
    }
  }) => {
    if (!this.state.isScrollRecorded) {
      recordEvent(constants.bookedItineraryContentScroll);
      this.setState({
        isScrollRecorded: true
      });
    }
    let _currentSection;
    this.state.sections.forEach(section => {
      if (y + responsiveHeight(10) > this.state.sectionPositions[section])
        _currentSection = section;
    });
    this.setState({ selectedDay: _currentSection }, () => {
      this.props.appState.setSelectedDate(this.state.selectedDay);
      this._headerScroll.scrollTo({
        x:
          this.state.headerPositions[this.state.selectedDay] -
          responsiveWidth(45),
        y: 0,
        animated: true
      });
    });
  };

  dateSelectedFromModal = date => {
    recordEvent(constants.bookedItineraryHeaderCityNameClick);
    this.selectDay(date);
  };

  componentDidMount() {
    const selectedDay = this.props.navigation.getParam("selectedDate", 0);
    if (selectedDay) {
      setTimeout(() => {
        this.selectDay(selectedDay);
      }, 350);
    }
    Animated.loop(
      Animated.timing(this.spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }

  render() {
    const { days, slots } = this.props.itineraries;
    const { navigation } = this.props;
    return (
      <View style={styles.bookedItineraryContainer}>
        <CitySelectionMenu
          navigation={navigation}
          selectDay={this.dateSelectedFromModal}
        />
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
                spinValue={this.spinValue}
                key={index}
                day={day}
                slot={slots[index]}
                onItemLayout={this.onItemLayout}
                navigation={navigation}
              />
            );
          })}
          <View style={{ height: responsiveHeight(60) }} />
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
