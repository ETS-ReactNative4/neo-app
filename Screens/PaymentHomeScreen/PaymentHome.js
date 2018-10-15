import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView
} from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import HamburgerButton from "../../CommonComponents/HamburgerButton/HamburgerButton";
import { inject, observer } from "mobx-react/custom";
import EmptyListPlaceholder from "../../CommonComponents/EmptyListPlaceholder/EmptyListPlaceholder";
import constants from "../../constants/constants";
import UpcomingCard from "../YourBookingsScreen/Components/UpcomingCard";
import { isIphoneX } from "react-native-iphone-x-helper";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";

@inject("yourBookingsStore")
@observer
class PaymentHome extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader
          LeftButton={
            <HamburgerButton action={() => navigation.openDrawer()} />
          }
          title={"Payments"}
          navigation={navigation}
        />
      )
    };
  };

  render() {
    const {
      upcomingItineraries,
      isLoading,
      getUpcomingItineraries
    } = this.props.yourBookingsStore;

    return (
      <View style={styles.paymentContainer}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={getUpcomingItineraries}
            />
          }
        >
          {!upcomingItineraries.length && !isLoading ? (
            <EmptyListPlaceholder
              text={`No active bookings found on this number. If the booking is made by someone else, you need an invite from them to proceed.`}
              containerStyle={{
                borderTopWidth: 1,
                borderTopColor: constants.shade4,
                marginHorizontal: 24
              }}
            />
          ) : null}
          {upcomingItineraries.map((itinerary, index) => {
            let isLast = false;
            if (index === upcomingItineraries.length - 1) isLast = true;
            return (
              <UpcomingCard
                key={index}
                {...itinerary}
                selectItinerary={() =>
                  this.props.navigation.navigate("PaymentSummary", {
                    itineraryId: itinerary.itineraryId
                  })
                }
                isLast={isLast}
              />
            );
          })}
        </ScrollView>
        {isIphoneX() ? <XSensorPlaceholder /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paymentContainer: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default PaymentHome;
