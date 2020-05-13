import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import constants from "../../constants/constants";
import { inject, observer } from "mobx-react";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import DeepLinkHandler from "../../CommonComponents/DeepLinkHandler/DeepLinkHandler";
import HelpDeskView from "../ChatScreen/Components/HelpDeskView";
import ContactUsTile from "./Components/ContactUsTile";
import PrimaryHeader from "../../NavigatorsV2/Components/PrimaryHeader";

@ErrorBoundary()
@DeepLinkHandler
@inject("itineraries")
@inject("supportStore")
@observer
class SupportCenter extends Component {
  constructor(props) {
    super(props);

    props.navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => props.navigation.goBack(),
          headerText: "Help Desk"
        })
    });
  }

  contactSupport = () => {
    this.props.navigation.navigate("ContactUs", {
      type: constants.defaultSupportType
    });
  };

  viewTickets = () => {
    this.props.navigation.navigate("YourTickets");
  };

  componentDidMount() {
    const { loadConversation, loadFaqDetails } = this.props.supportStore;
    setTimeout(() => {
      loadConversation();
      loadFaqDetails();
    }, 1000);
  }

  contactSupport = () => {
    const title = constants.defaultSupportType;
    this.props.navigation.navigate("ContactUs", { type: title });
  };

  render() {
    const {
      faqDetails,
      getConversationsByItineraryId,
      loadConversation,
      isConversationLoading
    } = this.props.supportStore;

    const { selectedItineraryId } = this.props.itineraries;

    const conversations = getConversationsByItineraryId(selectedItineraryId);

    const faqSections = Object.keys(faqDetails).map(faqSection => {
      return {
        title: faqSection,
        icon: faqSection,
        action: () =>
          this.props.navigation.navigate("FAQ", { title: faqSection })
      };
    });

    const ctaText = conversations.length
      ? `${conversations.length} Message${conversations.length > 1 ? "s" : ""}`
      : "Message us";
    const ctaAction = conversations.length
      ? this.viewTickets
      : this.contactSupport;

    return (
      <View style={styles.supportCenterContainer}>
        <HelpDeskView
          faqSections={faqSections}
          navigation={this.props.navigation}
          disableHeader={true}
          topBarText={"Your Conversations"}
          topBarCta={ctaText}
          topBarCtaAction={ctaAction}
          refreshing={isConversationLoading}
          onRefresh={loadConversation}
          isTitleBold={true}
          disableTopBar={!conversations.length}
          chatActivationMessage={""}
        />
        <ContactUsTile contactAction={this.contactSupport} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  supportCenterContainer: {
    flex: 1,
    backgroundColor: constants.white1
  }
});

export default SupportCenter;
