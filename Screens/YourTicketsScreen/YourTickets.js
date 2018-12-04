import React, { Component } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import TicketPreview from "./Components/TicketPreview";
import constants from "../../constants/constants";
import { inject, observer } from "mobx-react/custom";
import moment from "moment";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";

@ErrorBoundary()
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

  _renderItem = ({ item: ticket, index }) => {
    return (
      <TicketPreview
        title={ticket.title}
        containerStyle={{ marginHorizontal: 24 }}
        lastMessage={ticket.lastMsg}
        lastMessageTime={
          ticket.closed
            ? "closed"
            : moment(ticket.lastMsgTime).format("hh:mm a")
        }
        isClosed={ticket.closed}
        isUnRead={ticket.lastSeenMsgId < ticket.maxMsgId}
        isLast={false}
        action={() =>
          this.props.navigation.navigate("TicketsConversation", {
            title: ticket.title,
            status: ticket.closed ? "Closed" : "Open",
            ticketId: ticket.ticketId
          })
        }
      />
    );
  };

  _keyExtractor = (item, index) => index;

  render() {
    const {
      conversations,
      isConversationLoading,
      loadConversation
    } = this.props.supportStore;
    return [
      <View key={0} style={styles.yourTicketsContainer}>
        <View style={styles.firstLine} />
        <FlatList
          refreshing={isConversationLoading}
          keyExtractor={this._keyExtractor}
          data={conversations}
          onRefresh={() => loadConversation()}
          renderItem={this._renderItem}
        />
      </View>
    ];
  }
}

const styles = StyleSheet.create({
  yourTicketsContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  firstLine: {
    height: 1,
    backgroundColor: constants.shade4,
    marginHorizontal: 24
  }
});

export default YourTickets;
