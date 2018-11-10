import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import FaqSectionTile from "./Components/FaqSectionTile";
import ContactUsTile from "./Components/ContactUsTile";
import TicketTile from "./Components/TicketTile";
import constants from "../../constants/constants";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";

class SupportCenter extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Support Center"} navigation={navigation} />
    };
  };

  contactSupport = () => {
    this.props.navigation.navigate("ContactUs", {
      type: constants.defaultSupportType
    });
  };

  render() {
    const { navigation } = this.props;

    const faqSections = [
      {
        sectionName: "Visa Processing",
        onClick: () => navigation.navigate("FAQ", { title: "Visa Processing" })
      },
      {
        sectionName: "Cancellation",
        onClick: () => navigation.navigate("FAQ", { title: "Cancellation" })
      },
      {
        sectionName: "Payment related questions",
        onClick: () =>
          navigation.navigate("FAQ", { title: "Payment related questions" })
      },
      {
        sectionName: "Trip feedback",
        onClick: () => navigation.navigate("FAQ", { title: "Trip feedback" })
      },
      {
        sectionName: "Other",
        onClick: () => navigation.navigate("FAQ", { title: "Other" })
      }
    ];

    return (
      <View style={styles.supportCenterContainer}>
        <ScrollView style={styles.supportScroll}>
          <Image
            source={constants.helpSupportIllus}
            resizeMode={"contain"}
            style={styles.supportIllustration}
          />
          <TicketTile action={() => null} />
          {faqSections.map((faqSection, faqIndex) => {
            return (
              <FaqSectionTile
                onClick={faqSection.onClick}
                key={faqIndex}
                sectionName={faqSection.sectionName}
              />
            );
          })}
        </ScrollView>
        <ContactUsTile contactAction={this.contactSupport} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  supportCenterContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  supportScroll: {
    paddingHorizontal: 24
  },
  supportIllustration: {
    height: responsiveHeight(40),
    width: responsiveWidth(100) - 48
  }
});

export default SupportCenter;
