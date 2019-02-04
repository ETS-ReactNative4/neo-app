import React, { Component } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";
import ScrollableTabView from "react-native-scrollable-tab-view";
import Upcoming from "./Components/Upcoming";
import Completed from "./Components/Completed";
import { responsiveWidth } from "react-native-responsive-dimensions";
import CloseYourBookingsButton from "./Components/CloseYourBookingsButton";
import YourBookingsTabBar from "./Components/YourBookingsTabBar";
import { inject, observer } from "mobx-react/custom";
import SearchButton from "../../CommonComponents/SearchButton/SearchButton";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { NavigationActions } from "react-navigation";

const resetAction = NavigationActions.navigate({
  routeName: "AppHome",
  action: NavigationActions.navigate({ routeName: "NewItineraryStack" })
});

@ErrorBoundary({ isRoot: true })
@inject("appState")
@inject("yourBookingsStore")
@observer
class YourBookings extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

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
          // RightButton={<SearchButton action={() => {}} />}
          title={"Your Bookings"}
          navigation={navigation}
        />
        {/*<ScrollableTabView*/}
        {/*tabBarActiveTextColor={constants.black2}*/}
        {/*tabBarInactiveTextColor={constants.firstColor}*/}
        {/*tabBarUnderlineStyle={{*/}
        {/*height: 2,*/}
        {/*backgroundColor: constants.black2*/}
        {/*}}*/}
        {/*tabBarTextStyle={{ ...constants.font13(constants.primaryLight) }}*/}
        {/*initialPage={0}*/}
        {/*style={{ alignSelf: "center", width: responsiveWidth(100) }}*/}
        {/*prerenderingSiblingsNumber={Infinity}*/}
        {/*renderTabBar={() => <YourBookingsTabBar />}*/}
        {/*>*/}
        <Upcoming
          tabLabel="UPCOMING"
          itinerariesList={upcomingItineraries}
          isLoading={isLoading}
          navigation={this.props.navigation}
          getUpcomingItineraries={getUpcomingItineraries}
          goBack={this.goBack}
        />
        {/*<Completed tabLabel="COMPLETED" />*/}
        {/*</ScrollableTabView>*/}
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
