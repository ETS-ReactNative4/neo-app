import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import FaqSectionTile from "./Components/FaqSectionTile";
import ContactUsTile from "./Components/ContactUsTile";
import TicketTile from "./Components/TicketTile";

class SupportCenter extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Support Center"} navigation={navigation} />
    };
  };

  contactSupport = () => {};

  render() {
    const { navigation } = this.props;

    const faqSections = [
      {
        sectionName: "Visa Processing",
        onClick: () => navigation.navigate("FAQ")
      },
      {
        sectionName: "Cancellation",
        onClick: () => navigation.navigate("FAQ")
      },
      {
        sectionName: "Payment related questions",
        onClick: () => navigation.navigate("FAQ")
      },
      {
        sectionName: "Trip feedback",
        onClick: () => navigation.navigate("FAQ")
      },
      {
        sectionName: "Other",
        onClick: () => navigation.navigate("FAQ")
      }
    ];

    return (
      <View style={styles.supportCenterContainer}>
        <ScrollView style={styles.supportScroll}>
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
  }
});

export default SupportCenter;
