import React, { Component } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import TicketPreview from "./Components/TicketPreview";
import constants from "../../constants/constants";
import _ from "lodash";
import { inject, observer } from "mobx-react/custom";
import moment from "moment";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import TicketMessageSummary from "./Components/TicketMessageSummary";
import HelpDeskSectionTitle from "../SupportCenterScreen/Components/HelpDeskSectionTitle";
import ContactUsTile from "../SupportCenterScreen/Components/ContactUsTile";

@ErrorBoundary()
@inject("itineraries")
@inject("supportStore")
@observer
class YourTickets extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Your Tickets"} navigation={navigation} />
    };
  };

  componentDidMount() {
    const { loadConversation } = this.props.supportStore;
    loadConversation();
  }

  contactSupport = () => {
    this.props.navigation.navigate("ContactUs", {
      type: constants.defaultSupportType
    });
  };

  _renderItem = ({ item: ticket, index }) => {
    const { getFaqDetailsByCategory } = this.props.supportStore;
    const faqDetails = getFaqDetailsByCategory(ticket.title);
    const title = _.isEmpty(faqDetails)
      ? ticket.title
      : faqDetails.categoryDisplayStr;
    const navigateToConversation = () =>
      this.props.navigation.navigate("TicketsConversation", {
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
    marginVertical: 0.5
  },
  firstLine: {
    height: 1,
    backgroundColor: constants.shade4,
    marginHorizontal: 24
  }
});

export default YourTickets;
