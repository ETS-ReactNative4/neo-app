import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl
} from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import FaqSectionTile from "./Components/FaqSectionTile";
import ContactUsTile from "./Components/ContactUsTile";
import TicketTile from "./Components/TicketTile";
import constants from "../../constants/constants";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import { inject, observer } from "mobx-react/custom";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import CustomScrollView from "../../CommonComponents/CustomScrollView/CustomScrollView";
import DeepLinkHandler from "../../CommonComponents/DeepLinkHandler/DeepLinkHandler";
import HelpDeskView from "../ChatScreen/Components/HelpDeskView";

@ErrorBoundary()
@DeepLinkHandler
@inject("itineraries")
@inject("supportStore")
@observer
class SupportCenter extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Help Desk"} navigation={navigation} />
    };
  };

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

  render() {
    const { navigation } = this.props;
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
      />
    );
  }
}

const styles = StyleSheet.create({
  supportCenterContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  supportScroll: {},
  supportIllustration: {
    height: responsiveHeight(40),
    width: responsiveWidth(100) - 48,
    marginHorizontal: 24
  }
});

export default SupportCenter;
