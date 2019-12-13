import React, { Component } from "react";
import constants from "../../constants/constants";
import { inject, observer } from "mobx-react";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import isUserLoggedInCallback from "../../Services/isUserLoggedInCallback/isUserLoggedInCallback";
import HelpDeskView from "./Components/HelpDeskView";
import debouncer from "../../Services/debouncer/debouncer";

@ErrorBoundary({ isRoot: true })
@inject("itineraries")
@inject("chatDetailsStore")
@inject("supportStore")
@observer
class ChatScreen extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        debouncer(() => {
          this.refreshFaqDetails();
        });
      }
    );
  }

  loadFaqDetails = () => {
    isUserLoggedInCallback(() => {
      const { loadConversation, loadFaqDetails } = this.props.supportStore;
      loadConversation();
      loadFaqDetails();
    });
  };

  componentDidMount() {
    this.refreshFaqDetails();
  }

  refreshFaqDetails = () => {
    const { selectedItineraryId } = this.props.itineraries;
    if (selectedItineraryId) {
      this.loadFaqDetails();
    }
  };

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
  }

  contactSupport = () => {
    this.props.navigation.navigate("ContactUs", {
      type: constants.defaultSupportType
    });
  };

  viewTickets = () => {
    this.props.navigation.navigate("YourTickets");
  };

  render() {
    const { chatActivationMessage } = this.props.chatDetailsStore;
    const {
      faqDetails,
      getConversationsByItineraryId
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
      : "New Message";
    const ctaAction = conversations.length
      ? this.viewTickets
      : this.contactSupport;
    return (
      <HelpDeskView
        disableTopBar={!conversations.length}
        onRefresh={this.refreshFaqDetails}
        faqSections={faqSections}
        chatActivationMessage={chatActivationMessage}
        navigation={this.props.navigation}
        topBarCta={ctaText}
        topBarCtaAction={ctaAction}
        topBarText={
          conversations.length ? "Your conversations" : chatActivationMessage
        }
        isTitleBold={conversations.length}
      />
    );
  }
}

export default ChatScreen;
