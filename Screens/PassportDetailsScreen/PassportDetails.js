import React, { Component } from "react";
import VoucherAccordion from "../VoucherScreens/Components/VoucherAccordion";
import VoucherSplitSection from "../VoucherScreens/Components/VoucherSplitSection";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import { View } from "react-native";

class PassportDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader title={"Passport Details"} navigation={navigation} />
      )
    };
  };

  render() {
    const passengerDetails = [
      {
        name: "Passenger 1",
        component: (
          <VoucherSplitSection
            sections={[
              {
                name: "Passport ID",
                value: ""
              },
              {
                name: "Surname",
                value: ""
              },
              {
                name: "Given name",
                value: ""
              },
              {
                name: "Date of birth",
                value: ""
              },
              {
                name: "Date of expiry",
                value: ""
              }
            ]}
          />
        )
      }
    ];

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <VoucherAccordion
          openFirstSection={true}
          sections={passengerDetails}
          containerStyle={{ marginHorizontal: 24 }}
        />
      </View>
    );
  }
}

export default PassportDetails;
