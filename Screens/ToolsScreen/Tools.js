import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight,
  ImageBackground,
  Text
} from "react-native";
import constants from "../../constants/constants";
import SectionHeader from "../../CommonComponents/SectionHeader/SectionHeader";
import Carousel from "../../CommonComponents/Carousel/Carousel";
import PrimaryTool from "./Components/PrimaryTool";
import SecondaryTool from "./Components/SecondaryTool";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import HamburgerButton from "../../CommonComponents/HamburgerButton/HamburgerButton";
import BookingHomeTitle from "../BookingsHomeScreen/Components/BookingHomeTitle";
import TripToggle from "../../CommonComponents/TripToggle/TripToggle";
import SearchPlaceholder from "../../CommonComponents/SearchPlaceholder/SearchPlaceholder";

class Tools extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader
          LeftButton={
            <HamburgerButton action={() => navigation.openDrawer()} />
          }
          TitleComponent={
            <BookingHomeTitle
              action={() => navigation.navigate("YourBookings")}
            />
          }
          title={""}
          RightButton={<TripToggle containerStyle={{ marginHorizontal: 24 }} />}
          navigation={navigation}
        />
      )
    };
  };

  render() {
    const cityList = [
      {
        title: "Bali",
        image: constants.starterBackground,
        action: () => {}
      },
      {
        title: "Bali",
        image: constants.starterBackground,
        action: () => {}
      },
      {
        title: "Bali",
        image: constants.starterBackground,
        action: () => {}
      },
      {
        title: "Bali",
        image: constants.starterBackground,
        action: () => {}
      }
    ];

    const essentialTools = [
      {
        icon: constants.commonPhrasesIcon,
        text: `Common Phrases`,
        action: () => this.props.navigation.navigate("PhraseBook")
      },
      {
        icon: constants.emergencyContactsIcon,
        text: `Emergency Contacts`,
        action: () => this.props.navigation.navigate("EmergencyContacts")
      },
      {
        icon: constants.medicalCareIcon,
        text: `Medical Care`,
        action: () => {}
      },
      {
        icon: constants.weatherForecastIcon,
        text: `Weather Forecast`,
        action: () => this.props.navigation.navigate("Weather")
      }
    ];

    const beforePacking = [
      {
        icon: constants.passportDetailsIcon,
        text: `Passport Details`,
        action: () => this.props.navigation.navigate("PassportDetails")
      },
      {
        icon: constants.packageChecklistIcon,
        text: `Packing Checklist`,
        action: () => this.props.navigation.navigate("PackingChecklist")
      },
      {
        icon: constants.documentVisaIcon,
        text: `Documents & Visa`,
        action: () => {}
      }
    ];

    const moreTools = [
      {
        icon: constants.downloadInvoiceIcon,
        text: `Download Invoice`,
        action: () => {}
      },
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

          <PrimaryTool
            text={`Currency Calculator`}
            action={() => this.props.navigation.navigate("CurrencyConverter")}
            containerStyle={{ marginHorizontal: 24 }}
            toolIcon={constants.currencyCalculatorIcon}
          />

          {essentialTools.map((item, index) => (
            <SecondaryTool
              containerStyle={{ marginHorizontal: 24 }}
              key={index}
              icon={item.icon}
              text={item.text}
              action={item.action}
            />
          ))}

          <SectionHeader
            sectionName={"BEFORE PACKING"}
            containerStyle={{ marginTop: 40, marginHorizontal: 24 }}
          />

          <PrimaryTool
            text={`Invite Co-passengers`}
            action={() => {}}
            containerStyle={{ marginHorizontal: 24 }}
            toolIcon={constants.invitePassengersIcon}
          />

          {beforePacking.map((item, index) => (
            <SecondaryTool
              containerStyle={{ marginHorizontal: 24 }}
              key={index}
              icon={item.icon}
              text={item.text}
              action={item.action}
            />
          ))}

          <SectionHeader
            sectionName={"MORE TOOLS"}
            containerStyle={{ marginTop: 40, marginHorizontal: 24 }}
          />

          <PrimaryTool
            containerStyle={{ marginHorizontal: 24 }}
            text={`Complete Payment`}
            action={() => {}}
            toolIcon={constants.completePaymentIcon}
          />

          {moreTools.map((item, index) => (
            <SecondaryTool
              containerStyle={{ marginHorizontal: 24 }}
              key={index}
              icon={item.icon}
              text={item.text}
              action={item.action}
            />
          ))}

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
