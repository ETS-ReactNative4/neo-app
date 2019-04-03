import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import constants from "../../constants/constants";
import ScrollableTabView from "react-native-scrollable-tab-view";
import ScrollableTabBar from "../../CommonComponents/ScrollableTabBar/ScrollableTabBar";
import EmergencyContactSection from "./Components/EmergencyContactSection";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import { inject, observer } from "mobx-react/custom";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import DeepLinkHandler from "../../CommonComponents/DeepLinkHandler/DeepLinkHandler";

@ErrorBoundary()
@DeepLinkHandler
@inject("itineraries")
@inject("emergencyContactsStore")
@observer
class EmergencyContacts extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader title={"Emergency Contacts"} navigation={navigation} />
      )
    };
  };

  componentDidMount() {
    const { cities } = this.props.itineraries;
    const { getEmergencyContacts } = this.props.emergencyContactsStore;
    getEmergencyContacts(cities);
  }

  render() {
    const { cities } = this.props.itineraries;
    const { getEmergencyContactsByCity } = this.props.emergencyContactsStore;
    const cityDetails = getEmergencyContactsByCity(cities);

    return (
      <View style={styles.emergencyContactsContainer}>
        <ScrollableTabView
          tabBarActiveTextColor={constants.black2}
          tabBarInactiveTextColor={constants.firstColor}
          tabBarUnderlineStyle={{
            height: 2,
            backgroundColor: constants.black2
          }}
          tabBarTextStyle={{ ...constants.font13(constants.primarySemiBold) }}
          initialPage={0}
          prerenderingSiblingsNumber={Infinity}
          renderTabBar={() => <ScrollableTabBar />}
        >
          {cityDetails.map(
            (cityContactDetails, cityDetailIndex) =>
              cityContactDetails ? (
                <EmergencyContactSection
                  key={cityDetailIndex}
                  cityContactDetails={cityContactDetails}
                  tabLabel={cityContactDetails.name.toUpperCase()}
                />
              ) : null
          )}
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emergencyContactsContainer: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default EmergencyContacts;
