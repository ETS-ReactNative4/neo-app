import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import constants from "../../constants/constants";
import SectionHeader from "../../CommonComponents/SectionHeader/SectionHeader";
import Carousel from "../../CommonComponents/Carousel/Carousel";
import PrimaryTool from "./Components/PrimaryTool";
import SecondaryTool from "./Components/SecondaryTool";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";
import { inject, observer } from "mobx-react/custom";
import { recordEvent } from "../../Services/analytics/analyticsService";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";

@ErrorBoundary({ isRoot: true })
@inject("itineraries")
@observer
class Tools extends Component {
  static navigationOptions = HomeHeader;

  render() {
    const { cities } = this.props.itineraries;
    const cityList = cities.map(city => {
      return {
        title: city.city,
        image: { uri: city.cityObject.image },
        action: () => {
          recordEvent(constants.toolsPlacesTileClick);
          this.props.navigation.navigate("ToolPlaces", {
            city,
            target: "ToolNearBy"
          });
        },
        gradientColor: constants.darkGradientAlpha
      };
    });

    const essentialTools = [
      {
        icon: constants.commonPhrasesIcon,
        text: `Common${"\n"}Phrases`,
        action: () => {
          recordEvent(constants.toolsCommonPhrasesTileClick);
          this.props.navigation.navigate("PhraseBook");
        }
      },
      {
        icon: constants.emergencyContactsIcon,
        text: `Emergency${"\n"}Contacts`,
        action: () => {
          recordEvent(constants.toolsEmergencyContactsTileClick);
          this.props.navigation.navigate("EmergencyContacts");
        }
      },
      {
        icon: constants.weatherForecastIcon,
        text: `Weather${"\n"}Forecast`,
        action: () => {
          recordEvent(constants.toolsWeatherForecastTileClick);
          this.props.navigation.navigate("Weather");
        }
      },
      {
        icon: constants.faqIcon,
        text: `Support${"\n"}Center`,
        action: () => {
          recordEvent(constants.toolsSupportCenterTileClick);
          this.props.navigation.navigate("SupportCenter");
        }
      }
    ];

    const beforePacking = [
      {
        icon: constants.passportDetailsIcon,
        text: `Passport${"\n"}Details`,
        action: () => {
          recordEvent(constants.toolsPassportTileClick);
          this.props.navigation.navigate("PassportDetails");
        }
      },
      {
        icon: constants.documentVisaIcon,
        text: `Documents${"\n"}& Visa`,
        action: () => {
          recordEvent(constants.toolsDocumentsVisaTileClick);
          this.props.navigation.navigate("Visa");
        }
      },
      {
        icon: constants.invitePassengersIcon,
        text: `Invite${"\n"}Co-passengers`,
        action: () => null,
        isComingSoon: true
      },
      {
        icon: constants.yourPickIcon,
        text: `Your${"\n"}Picks`,
        action: () => null,
        isComingSoon: true
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

    const Header = () =>
      HomeHeader({ navigation: this.props.navigation }).header;

    return (
      <View style={styles.container}>
        <Header />
        {/*<SearchPlaceholder*/}
        {/*action={() => null}*/}
        {/*containerStyle={{ marginHorizontal: 24 }}*/}
        {/*/>*/}
        <ScrollView>
          <SectionHeader
            sectionName={"Explore Places"}
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
                isComingSoon={item.isComingSoon}
              />
            ))}
          </View>

          <SectionHeader
            sectionName={"BEFORE PACKING"}
            containerStyle={{ marginTop: 40, marginHorizontal: 24 }}
          />

          <View style={styles.toolMenuRow}>
            <PrimaryTool
              text={`Packing${"\n"}Checklist`}
              action={() => this.props.navigation.navigate("PackingChecklist")}
              toolIcon={constants.packageChecklistIcon}
            />

            {beforePacking.map((item, index) => (
              <SecondaryTool
                key={index}
                icon={item.icon}
                text={item.text}
                action={item.action}
                isComingSoon={item.isComingSoon}
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
