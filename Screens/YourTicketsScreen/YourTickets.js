import React, { Component } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import constants from "../../constants/constants";
import _ from "lodash";
import { inject, observer } from "mobx-react";
import moment from "moment";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import TicketMessageSummary from "./Components/TicketMessageSummary";
import HelpDeskSectionTitle from "../SupportCenterScreen/Components/HelpDeskSectionTitle";
import ContactUsTile from "../SupportCenterScreen/Components/ContactUsTile";
import {
  SCREEN_CONTACT_US,
  SCREEN_TICKETS_CONVERSATION
} from "../../NavigatorsV2/ScreenNames";
import PrimaryHeader from "../../NavigatorsV2/Components/PrimaryHeader";
import PropTypes from "prop-types";

@ErrorBoundary()
@inject("itineraries")
@inject("supportStore")
@observer
class YourTickets extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    supportStore: PropTypes.object.isRequired,
    itineraries: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => props.navigation.goBack(),
          headerText: "Your Tickets"
        })
    });
  }

  componentDidMount() {
    const { loadConversation } = this.props.supportStore;
    loadConversation();
  }

  contactSupport = () => {
    this.props.navigation.navigate(SCREEN_CONTACT_US, {
      type: constants.defaultSupportType
    });
  };

  _renderItem = ({ item: ticket }) => {
    const { getFaqDetailsByCategory } = this.props.supportStore;
    const faqDetails = getFaqDetailsByCategory(ticket.title);
    const title = _.isEmpty(faqDetails)
      ? ticket.title
      : faqDetails.categoryDisplayStr;
    const navigateToConversation = () =>
      this.props.navigation.navigate(SCREEN_TICKETS_CONVERSATION, {
        title,
        status: ticket.closed ? "Closed" : "Open",
        ticketId: ticket.ticketId
      });
    return (
      <TicketMessageSummary
        time={moment(ticket.lastMsgTime).format(
          `${constants.shortTimeFormat} -${constants.shortCommonDateFormat}`
        )}
        containerStyle={styles.messageSectionWrapper}
        isClosed={ticket.closed}
        subject={title}
        message={ticket.lastMsg}
        unReadCount={ticket.lastSeenMsgId < ticket.maxMsgId ? 1 : 0}
        action={navigateToConversation}
      />
    );
  };

  _keyExtractor = (item, index) => index;

  render() {
    const {
      getConversationsByItineraryId,
      isConversationLoading,
      loadConversation
    } = this.props.supportStore;

    const { selectedItineraryId } = this.props.itineraries;

    const conversations = getConversationsByItineraryId(selectedItineraryId);

    return (
      <View key={0} style={styles.yourTicketsContainer}>
        <HelpDeskSectionTitle
          containerStyle={styles.titleWrapper}
          title={"Your conversations"}
        />
        <FlatList
          refreshing={isConversationLoading}
          keyExtractor={this._keyExtractor}
          data={conversations}
          onRefresh={() => loadConversation()}
          renderItem={this._renderItem}
        />
        <ContactUsTile
          contactText={"Would you like to start a new conversation?"}
          contactAction={this.contactSupport}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  yourTicketsContainer: {
    flex: 1,
    backgroundColor: constants.white1
  },
  titleWrapper: {
    marginHorizontal: 24,
    marginVertical: 16
  },
  messageSectionWrapper: {
    marginVertical: 1
  },
  firstLine: {
    height: 1,
    backgroundColor: constants.shade4,
    marginHorizontal: 24
  }
});

export default YourTickets;
