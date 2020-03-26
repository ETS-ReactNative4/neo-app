import React, { Component } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import Upcoming from "./Components/Upcoming";
import CloseYourBookingsButton from "./Components/CloseYourBookingsButton";
import { inject, observer } from "mobx-react";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
// import { NavigationActions } from "react-navigation";
import PropTypes from "prop-types";

const resetAction = () => null;

@ErrorBoundary({ isRoot: true })
@inject("appState")
@inject("yourBookingsStore")
@observer
class YourBookings extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  static propTypes = {
    appState: PropTypes.object.isRequired,
    yourBookingsStore: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        BackHandler.addEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        );
      }
    );
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () => {
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        );
      }
    );
    const { getUpcomingItineraries } = this.props.yourBookingsStore;
    getUpcomingItineraries();
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  onBackButtonPressAndroid = () => {
    const { navigation } = this.props;
    if (navigation.isFocused()) {
      this.goBack();
      return true;
    }
    return false;
  };

  goBack = () => {
    const routeName = this.props.navigation.state.routeName;
    if (routeName === "YourBookings") {
      this.props.appState.setTripMode(false);
      this.props.navigation.dispatch(resetAction);
    } else if (routeName === "YourBookingsUniversal") {
      this.props.navigation.goBack();
    }
  };

  render() {
    const { navigation } = this.props;
    const {
      upcomingItineraries,
      isLoading,
      getUpcomingItineraries
    } = this.props.yourBookingsStore;
    return (
      <View style={styles.yourBookingsContainer}>
        <CommonHeader
          LeftButton={<CloseYourBookingsButton goBack={this.goBack} />}
          title={"Your Bookings"}
          navigation={navigation}
        />
        <Upcoming
          tabLabel="UPCOMING"
          itinerariesList={upcomingItineraries}
          isLoading={isLoading}
          navigation={this.props.navigation}
          getUpcomingItineraries={getUpcomingItineraries}
          goBack={this.goBack}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  yourBookingsContainer: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default YourBookings;
