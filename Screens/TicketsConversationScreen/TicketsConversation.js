import React, { Component } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import ConversationCard from "./Components/ConversationCard";
import constants from "../../constants/constants";

const data = [
  {
    msg: "Sample Message",
    msgId: "2",
    msgTime: "Yesterday, 6:30pm"
  },
  {
    msg: "Another Sample Message",
    msgId: "3",
    msgTime: "Yesterday, 6:30pm"
  },
  {
    msg: "This is also Sample Message",
    msgId: "4",
    msgTime: "Yesterday, 6:30pm"
  },
  {
    msg: "Sample Message",
    msgId: "2",
    msgTime: "Yesterday, 6:30pm"
  },
  {
    msg: "Another Sample Message",
    msgId: "3",
    msgTime: "Yesterday, 6:30pm"
  },
  {
    msg: "This is also Sample Message",
    msgId: "4",
    msgTime: "Yesterday, 6:30pm"
  },
  {
    msg: "Sample Message",
    msgId: "2",
    msgTime: "Yesterday, 6:30pm"
  },
  {
    msg: "Another Sample Message",
    msgId: "3",
    msgTime: "Yesterday, 6:30pm"
  },
  {
    msg: "This is also Sample Message",
    msgId: "4",
    msgTime: "Yesterday, 6:30pm"
  },
  {
    msg: "Sample Message",
    msgId: "2",
    msgTime: "Yesterday, 6:30pm"
  },
  {
    msg: "Another Sample Message",
    msgId: "3",
    msgTime: "Yesterday, 6:30pm"
  },
  {
    msg: "This is also Sample Message",
    msgId: "4",
    msgTime: "Yesterday, 6:30pm"
  }
];

class TicketsConversation extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Your Tickets"} navigation={navigation} />
    };
  };

  _renderItem = ({ item: conversation, index }) => {
    return (
      <ConversationCard
        message={conversation.msg}
        time={conversation.msgTime}
        user={index % 2 ? "You" : "Admin"}
      />
    );
  };

  render() {
    return [
      <View style={styles.ticketsConversationContainer} key={0}>
        <FlatList
          data={data}
          renderItem={this._renderItem}
          ItemSeparatorComponent={() => (
            <View
              style={{ borderTopWidth: 1, borderTopColor: constants.shade4 }}
            />
          )}
        />
      </View>
    ];
  }
}

const styles = StyleSheet.create({
  ticketsConversationContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24
  }
});

export default TicketsConversation;
