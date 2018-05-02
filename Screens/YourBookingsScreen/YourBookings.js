import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableHighlight,
  BackHandler,
  Image,
  StyleSheet
} from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";
import ScrollableTabView from "react-native-scrollable-tab-view";
import DefaultTabBar from "../../CommonComponents/DefaultTabBar/DefaultTabBar";
import Upcoming from "./Components/Upcoming";
import Completed from "./Components/Completed";
import { responsiveWidth } from "react-native-responsive-dimensions";
import CloseYourBookingsButton from "./Components/CloseYourBookingsButton";
import YourBookingsTabBar from "./Components/YourBookingsTabBar";
import { inject, observer } from "mobx-react/custom";
import Loader from "../../CommonComponents/Loader/Loader";

@inject("yourBookingsStore")
@observer
class YourBookings extends Component {
  static navigationOptions = ({ navigation }) => {
    const LeftButton = <CloseYourBookingsButton navigation={navigation} />;

    const RightButton = (
      <TouchableHighlight
        style={{ paddingHorizontal: 16 }}
        onPress={() => {}}
        underlayColor={"transparent"}
      >
        <Image
          resizeMode={"contain"}
          source={constants.searchIcon}
          style={{ height: 24, width: 30 }}
        />
      </TouchableHighlight>
    );

    return {
      header: (
        <CommonHeader
          LeftButton={LeftButton}
          RightButton={RightButton}
          title={"Your Bookings"}
          navigation={navigation}
        />
      )
    };
  };

  render() {
    const { itineraries, isLoading } = this.props.yourBookingsStore;

    return (
      <View style={styles.yourBookingsContainer}>
        <Loader isVisible={isLoading} />

        <ScrollableTabView
          tabBarActiveTextColor={constants.black2}
          tabBarInactiveTextColor={constants.firstColor}
          tabBarUnderlineStyle={{
            height: 2,
            backgroundColor: constants.black2
          }}
          tabBarTextStyle={{ ...constants.font13(constants.primaryLight) }}
          initialPage={0}
          style={{ alignSelf: "center", width: responsiveWidth(100) }}
          prerenderingSiblingsNumber={Infinity}
          renderTabBar={() => <YourBookingsTabBar />}
        >
          <Upcoming tabLabel="UPCOMING" itineraries={itineraries} />
          <Completed tabLabel="COMPLETED" />
        </ScrollableTabView>
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
