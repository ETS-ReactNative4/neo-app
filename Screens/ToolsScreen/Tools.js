import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import constants from "../../constants/constants";
import SectionHeader from "../../CommonComponents/SectionHeader/SectionHeader";
import Carousel from "../../CommonComponents/Carousel/Carousel";
import PrimaryTool from "./Components/PrimaryTool";
import ToolListItem from "./Components/ToolListItem";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";
import { inject, observer } from "mobx-react/custom";
import { recordEvent } from "../../Services/analytics/analyticsService";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import NoInternetIndicator from "../../CommonComponents/NoInternetIndicator/NoInternetIndicator";

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
        text: `Currency Calculator`,
        action: () => this.props.navigation.navigate("CurrencyConverter"),
        icon: constants.currencyCalculatorIcon
      },
      {
        icon: constants.commonPhrasesIcon,
        text: `Common Phrases`,
        action: () => {
          recordEvent(constants.toolsCommonPhrasesTileClick);
          this.props.navigation.navigate("PhraseBook");
        }
      },
      {
        icon: constants.emergencyContactsIcon,
        text: `Emergency Contacts`,
        action: () => {
          recordEvent(constants.toolsEmergencyContactsTileClick);
          this.props.navigation.navigate("EmergencyContacts");
        }
      },
      {
        icon: constants.weatherForecastIcon,
        text: `Weather Forecast`,
        action: () => {
          recordEvent(constants.toolsWeatherForecastTileClick);
          this.props.navigation.navigate("Weather");
        }
      },
      {
        icon: constants.faqIcon,
        text: `Support Center`,
        action: () => {
          recordEvent(constants.toolsSupportCenterTileClick);
          this.props.navigation.navigate("SupportCenter");
        }
      }
    ];

    const beforePacking = [
      {
        text: `Packing Checklist`,
        action: () => this.props.navigation.navigate("PackingChecklist"),
        icon: constants.packageChecklistIcon
      },
      {
        text: `Buy Forex`,
        action: () => this.props.navigation.navigate("Forex"),
        icon: constants.forexIcon
      },
      {
        icon: constants.passportDetailsIcon,
        text: `Passport Details`,
        action: () => {
          recordEvent(constants.toolsPassportTileClick);
          this.props.navigation.navigate("PassportDetails");
        }
      },
      {
        icon: constants.documentVisaIcon,
        text: `Documents & Visa`,
        action: () => {
          recordEvent(constants.toolsDocumentsVisaTileClick);
          this.props.navigation.navigate("Visa");
        }
      },
      {
        icon: constants.invitePassengersIcon,
        text: `Invite Co-passengers`,
        action: () => null,
        isComingSoon: true
      },
      {
        icon: constants.yourPickIcon,
        text: `Your Picks`,
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
        <NoInternetIndicator />
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
            {essentialTools.map((item, index) => (
              <ToolListItem
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
            {beforePacking.map((item, index) => (
              <ToolListItem
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
    alignItems: "flex-start",
    // marginVertical: 24,
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
