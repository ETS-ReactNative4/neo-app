import React, { Component } from "react";
import VoucherAccordion from "../VoucherScreens/Components/VoucherAccordion";
import VoucherSplitSection from "../VoucherScreens/Components/VoucherSplitSection";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import { View } from "react-native";
import { inject, observer } from "mobx-react/custom";

@inject("passportDetailsStore")
@observer
class PassportDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader title={"Passport Details"} navigation={navigation} />
      )
    };
  };

  render() {
    const { getPassengerDetails } = this.props.passportDetailsStore;

    const passportDetails = getPassengerDetails();

    const passengerDetails = passportDetails.map(passportInfo => {
      const {
        passengerId,
        salutation,
        firstName,
        lastName,
        passportNumber,
        birthDay,
        passportExpirationDate
      } = passportInfo;

      return {
        name: `${salutation} ${firstName} ${lastName}`,
        component: (
          <VoucherSplitSection
            sections={[
              {
                name: "Passport Number",
                value: passportNumber || "NA"
              },
              {
                name: "Surname",
                value: lastName || "NA"
              },
              {
                name: "Given name",
                value: firstName || "NA"
              },
              {
                name: "Date of birth",
                value: birthDay || "NA"
              },
              {
                name: "Date of Passport expiry",
                value: passportExpirationDate || "NA"
              }
            ]}
          />
        )
      };
    });

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <VoucherAccordion
          openFirstSection={true}
          sections={passengerDetails}
          containerStyle={{ marginHorizontal: 24 }}
          expandMultiple={true}
        />
      </View>
    );
  }
}

export default PassportDetails;
