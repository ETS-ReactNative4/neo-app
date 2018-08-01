import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import constants from "../../constants/constants";
import ScrollableTabView from "react-native-scrollable-tab-view";
import ScrollableTabBar from "../../CommonComponents/ScrollableTabBar/ScrollableTabBar";
import EmergencyContactSection from "./Components/EmergencyContactSection";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";

class EmergencyContacts extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader title={"Emergency Contacts"} navigation={navigation} />
      )
    };
  };

  render() {
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
          <EmergencyContactSection tabLabel={"PARIS"} />
          <EmergencyContactSection tabLabel={"BRUSSELS"} />
          <EmergencyContactSection tabLabel={"VIENNA"} />
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
