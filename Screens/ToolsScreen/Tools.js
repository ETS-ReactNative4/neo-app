import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import constants from "../../constants/constants";
import SectionHeader from "../../CommonComponents/SectionHeader/SectionHeader";
import Carousel from "../../CommonComponents/Carousel/Carousel";
import PrimaryTool from "./Components/PrimaryTool";
import SecondaryTool from "./Components/SecondaryTool";
import SearchPlaceholder from "../../CommonComponents/SearchPlaceholder/SearchPlaceholder";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";
import { inject, observer } from "mobx-react/custom";

@inject("itineraries")
@inject("emergencyContactsStore")
@inject("passportDetailsStore")
@inject("visaStore")
@observer
class Tools extends Component {
  static navigationOptions = HomeHeader;

  componentDidMount() {
    const { cities, selectedItineraryId } = this.props.itineraries;
    const { getEmergencyContacts } = this.props.emergencyContactsStore;
    const { getPassportDetails } = this.props.passportDetailsStore;
    const { getVisaDetails } = this.props.visaStore;

    getEmergencyContacts(cities);
    getPassportDetails(selectedItineraryId);
    getVisaDetails(selectedItineraryId);
  }

  render() {
    const { cities } = this.props.itineraries;
    const cityList = cities.map(city => {
      return {
        title: city.city,
        image: { uri: constants.cityImageBaseUrl + city.cityObject.image },
        action: () => this.props.navigation.navigate("Places", { city })
      };
    });

    const essentialTools = [
      {
        icon: constants.commonPhrasesIcon,
        text: `Common${"\n"}Phrases`,
        action: () => this.props.navigation.navigate("PhraseBook")
      },
      {
        icon: constants.emergencyContactsIcon,
        text: `Emergency${"\n"}Contacts`,
        action: () => this.props.navigation.navigate("EmergencyContacts")
      },
      {
        icon: constants.medicalCareIcon,
        text: `Medical${"\n"}Care`,
        action: () => {}
      },
      {
        icon: constants.weatherForecastIcon,
        text: `Weather${"\n"}Forecast`,
        action: () => this.props.navigation.navigate("Weather")
      }
    ];

    const beforePacking = [
      {
        icon: constants.passportDetailsIcon,
        text: `Passport${"\n"}Details`,
        action: () => this.props.navigation.navigate("PassportDetails")
      },
      {
        icon: constants.packageChecklistIcon,
        text: `Packing${"\n"}Checklist`,
        action: () => this.props.navigation.navigate("PackingChecklist")
      },
      {
        icon: constants.documentVisaIcon,
        text: `Documents${"\n"}& Visa`,
        action: () => this.props.navigation.navigate("Visa")
      },
      {
        icon: constants.yourPickIcon,
        text: `Your${"\n"}Picks`,
        action: () => {}
      }
    ];

    const moreTools = [
      {
        icon: constants.faqIcon,
        text: `Frequently Asked Questions`,
        action: () => {}
      },
      {
        icon: constants.cancelTripIcon,
        text: `Cancel Trip`,
        action: () => {}
      }
    ];

    return (
      <View style={styles.container}>
        <SearchPlaceholder
          action={() => null}
          containerStyle={{ marginHorizontal: 24 }}
        />
        <ScrollView>
          <SectionHeader
            sectionName={"CITY GUIDES"}
            containerStyle={{ marginHorizontal: 24 }}
          />

          <Carousel data={cityList} firstMargin={24} />

          <SectionHeader
            sectionName={"ESSENTIALS"}
            containerStyle={{ marginTop: 40, marginHorizontal: 24 }}
          />

          <View style={styles.toolMenuRow}>
            <PrimaryTool
              text={`Currency${"\n"}Calculator`}
              action={() => this.props.navigation.navigate("CurrencyConverter")}
              toolIcon={constants.currencyCalculatorIcon}
            />

            {essentialTools.map((item, index) => (
              <SecondaryTool
                key={index}
                icon={item.icon}
                text={item.text}
                action={item.action}
              />
            ))}
          </View>

          <SectionHeader
            sectionName={"BEFORE PACKING"}
            containerStyle={{ marginTop: 40, marginHorizontal: 24 }}
          />

          <View style={styles.toolMenuRow}>
            <PrimaryTool
              text={`Invite${"\n"}Co-passengers`}
              action={() => {}}
              toolIcon={constants.invitePassengersIcon}
            />

            {beforePacking.map((item, index) => (
              <SecondaryTool
                key={index}
                icon={item.icon}
                text={item.text}
                action={item.action}
              />
            ))}
          </View>

          {/*<SectionHeader*/}
          {/*sectionName={"MORE TOOLS"}*/}
          {/*containerStyle={{ marginTop: 40, marginHorizontal: 24 }}*/}
          {/*/>*/}

          {/*<View style={styles.toolMenuRow}>*/}
          {/*<PrimaryTool*/}
          {/*text={`Complete Payment`}*/}
          {/*action={() => {}}*/}
          {/*toolIcon={constants.completePaymentIcon}*/}
          {/*/>*/}

          {/*{moreTools.map((item, index) => (*/}
          {/*<SecondaryTool*/}
          {/*key={index}*/}
          {/*icon={item.icon}*/}
          {/*text={item.text}*/}
          {/*action={item.action}*/}
          {/*/>*/}
          {/*))}*/}
          {/*</View>*/}
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.appBackgroundColor
  },
  secondaryContainer: {
    height: 24,
    marginTop: 24
  },
  secondaryWrapper: {
    flex: 1,
    flexDirection: "row"
  },
  icon: {
    height: 24,
    width: 24
  },
  toolMenuRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 24
  },
  text2: {
    fontFamily: constants.primaryRegular,
    marginLeft: 8,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "300",
    color: constants.black2
  }
});

export default Tools;
