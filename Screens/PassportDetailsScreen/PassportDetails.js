import React, { Component } from "react";
import VoucherAccordion from "../VoucherScreens/Components/VoucherAccordion";
import VoucherSplitSection from "../VoucherScreens/Components/VoucherSplitSection";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import { ScrollView } from "react-native";
import { inject, observer } from "mobx-react";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import DeepLinkHandler from "../../CommonComponents/DeepLinkHandler/DeepLinkHandler";
import PrimaryHeader from "../../NavigatorsV2/Components/PrimaryHeader";

@ErrorBoundary()
@DeepLinkHandler
@inject("passportDetailsStore")
@inject("itineraries")
@observer
class PassportDetails extends Component {
  constructor(props) {
    super(props);

    props.navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => props.navigation.goBack(),
          headerText: "Passport Details"
        })
    });
  }

  componentDidMount() {
    this.props.passportDetailsStore.updatePassportDetails(
      this.props.itineraries.selectedItineraryId
    );
  }

  render() {
    const { getPassengerDetails } = this.props.passportDetailsStore;

    const passengerDetails = getPassengerDetails.map(passportInfo => {
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
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <VoucherAccordion
          openAllSections={true}
          sections={passengerDetails}
          containerStyle={{ marginHorizontal: 24 }}
          expandMultiple={true}
        />
      </ScrollView>
    );
  }
}

export default PassportDetails;
