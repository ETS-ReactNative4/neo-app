import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
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

@ErrorBoundary({ isRoot: true })
@inject("yourBookingsStore")
@observer
class YourBookings extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   const LeftButton = <CloseYourBookingsButton navigation={navigation} />;
  //
  //   return {
  //     header: (
  //       <CommonHeader
  //         LeftButton={LeftButton}
  //         // RightButton={<SearchButton action={() => {}} />}
  //         title={"Your Bookings"}
  //         navigation={navigation}
  //       />
  //     )
  //   };
  // };

  render() {
    const { navigation } = this.props;
    const {
      upcomingItineraries,
      isLoading,
      getUpcomingItineraries
    } = this.props.yourBookingsStore;
    /**
     * TODO: Destructure the screen to move click action out of close button
     */
    const LeftButton = <CloseYourBookingsButton navigation={navigation} />;
    return (
      <View style={styles.yourBookingsContainer}>
        <CommonHeader
          LeftButton={LeftButton}
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
