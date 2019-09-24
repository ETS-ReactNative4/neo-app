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
import VisaSelector from "../VisaSelectorScreen/VisaSelector";
import Visa from "../../mobx/Visa";
import debouncer from "../../Services/debouncer/debouncer";

@ErrorBoundary({ isRoot: true })
@inject("itineraries")
@inject("visaStore")
@observer
class Tools extends Component {
  static navigationOptions = HomeHeader;

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        debouncer(() => {
          this.loadVisaDetails();
        });
      }
    );
  }

  loadVisaDetails = () => {
    const { selectedItineraryId } = this.props.itineraries;
    if (selectedItineraryId) {
      const { getVisaHomeScreenDetails } = this.props.visaStore;
      getVisaHomeScreenDetails();
    }
  };

  componentDidMount() {
    this.loadVisaDetails();
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
  }

  render() {
    const { cities } = this.props.itineraries;
    const { isVisaInitialized, isSingleVisa, visaList } = this.props.visaStore;
    const { navigation } = this.props;
    const cityList = cities.map(city => {
      const cityId = city.cityObject ? city.cityObject.cityId : "";
      return {
        title: city.city,
        image: { uri: city.cityObject.image },
        action: () => {
          recordEvent(constants.Tools.event, {
            click: constants.Tools.click.placesTile
          });
          navigation.navigate("ToolPlaces", {
            city: cityId,
            target: "ToolNearBy"
          });
        },
        gradientColor: constants.darkGradientAlpha
      };
    });

    const essentialTools = [
      {
        text: `Currency Calculator`,
        action: () => {
          recordEvent(constants.Tools.event, {
            click: constants.Tools.click.currencyConverter
          });
          navigation.navigate("CurrencyConverter");
        },
        icon: constants.currencyCalculatorIcon
      },
      {
        icon: constants.commonPhrasesIcon,
        text: `Common Phrases`,
        action: () => {
          recordEvent(constants.Tools.event, {
            click: constants.Tools.click.commonPhrases
          });
          navigation.navigate("PhraseBook");
        }
      },
      {
        icon: constants.emergencyContactsIcon,
        text: `Emergency Contacts`,
        action: () => {
          recordEvent(constants.Tools.event, {
            click: constants.Tools.click.emergencyContacts
          });
          navigation.navigate("EmergencyContacts");
        }
      },
      {
        icon: constants.weatherForecastIcon,
        text: `Weather Forecast`,
        action: () => {
          recordEvent(constants.Tools.event, {
            click: constants.Tools.click.weatherForecast
          });
          navigation.navigate("Weather");
        }
      },
      {
        icon: constants.faqIcon,
        text: `Help Desk`,
        action: () => {
          recordEvent(constants.Tools.event, {
            click: constants.Tools.click.helpDesk
          });
          navigation.navigate("SupportCenter");
        }
      }
    ];

    const beforePacking = [
      {
        text: `Packing Checklist`,
        action: () => {
          recordEvent(constants.Tools.event, {
            click: constants.Tools.click.packingChecklist
          });
          navigation.navigate("PackingChecklist");
        },
        icon: constants.packageChecklistIcon
      },
      {
        text: `Buy Forex`,
        action: () => {
          recordEvent(constants.Tools.event, {
            click: constants.Tools.click.forex
          });
          navigation.navigate("Forex");
        },
        icon: constants.forexIcon
      },
      {
        icon: constants.passportDetailsIcon,
        text: `Passport Details`,
        action: () => {
          recordEvent(constants.Tools.event, {
            click: constants.Tools.click.passport
          });
          navigation.navigate("PassportDetails");
        }
      },
      {
        icon: constants.documentVisaIcon,
        text: `Documents & Visa`,
        action: () => {
          recordEvent(constants.Tools.event, {
            click: constants.Tools.click.documentsVisa
          });
          Visa.visaOpener({
            navigation,
            isVisaInitialized,
            isSingleVisa,
            visaList
          });
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
