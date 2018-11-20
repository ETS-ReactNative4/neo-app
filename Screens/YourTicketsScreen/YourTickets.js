import React, { Component } from "react";
import { FlatList, View, StyleSheet, Platform, TextInput } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import TicketPreview from "./Components/TicketPreview";

const data = [
  {
    ticketId: "1",
    lastMsg:
      "This is a sample Message for the your tickets screen as a placeholder for testing purposes...",
    closed: true,
    maxMsgId: "1",
    title: "Hello world",
    lastSeenMsgId: ""
  },
  {
    ticketId: "1",
    lastMsg:
      "This is a sample Message for the your tickets screen as a placeholder for testing purposes...",
    closed: true,
    maxMsgId: "1",
    title: "Hello world",
    lastSeenMsgId: ""
  },
  {
    ticketId: "1",
    lastMsg:
      "This is a sample Message for the your tickets screen as a placeholder for testing purposes...",
    closed: true,
    maxMsgId: "1",
    title: "Hello world",
    lastSeenMsgId: ""
  },
  {
    ticketId: "1",
    lastMsg:
      "This is a sample Message for the your tickets screen as a placeholder for testing purposes...",
    closed: true,
    maxMsgId: "1",
    title: "Hello world",
    lastSeenMsgId: ""
  },
  {
    ticketId: "1",
    lastMsg:
      "This is a sample Message for the your tickets screen as a placeholder for testing purposes...",
    closed: true,
    maxMsgId: "1",
    title: "Hello world",
    lastSeenMsgId: ""
  },
  {
    ticketId: "1",
    lastMsg:
      "This is a sample Message for the your tickets screen as a placeholder for testing purposes...",
    closed: true,
    maxMsgId: "1",
    title: "Hello world",
    lastSeenMsgId: ""
  },
  {
    ticketId: "1",
    lastMsg:
      "This is a sample Message for the your tickets screen as a placeholder for testing purposes...",
    closed: true,
    maxMsgId: "1",
    title: "Hello world",
    lastSeenMsgId: ""
  }
];

class YourTickets extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Your Tickets"} navigation={navigation} />
    };
  };

  _renderItem = ({ item: ticket, index }) => {
    return (
      <TicketPreview
        title={ticket.title}
        containerStyle={{ marginHorizontal: 24 }}
        lastMessage={ticket.lastMsg}
        lastMessageTime={"6:30pm"}
        isClosed={ticket.closed}
        isUnRead={true}
        isLast={index === data.length - 1}
        action={() =>
          this.props.navigation.navigate("TicketsConversation", {
            title: ticket.title,
            status: ticket.closed ? "Closed" : "Open"
          })
        }
      />
    );
  };

  render() {
    return (
      <View key={0} style={styles.yourTicketsContainer}>
        <FlatList data={data} renderItem={this._renderItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  yourTicketsContainer: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default YourTickets;
