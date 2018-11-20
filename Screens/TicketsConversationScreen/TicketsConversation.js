import React, { Component } from "react";
import { View, FlatList, StyleSheet, TextInput } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import ConversationCard from "./Components/ConversationCard";
import constants from "../../constants/constants";
import KeyboardAvoidingActionBar from "../../CommonComponents/KeyboardAvoidingActionBar/KeyboardAvoidingActionBar";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import MultiLineHeader from "../../CommonComponents/MultilineHeader/MultiLineHeader";

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
    const title = navigation.getParam("title", "");
    const status = navigation.getParam("status", "");
    return {
      header: (
        <CommonHeader
          title={""}
          TitleComponent={
            <MultiLineHeader
              duration={status}
              title={title}
              disableDropDown={true}
            />
          }
          navigation={navigation}
        />
      )
    };
  };

  state = {
    messageText: ""
  };

  _renderItem = ({ item: conversation, index }) => {
    return (
      <ConversationCard
        message={conversation.msg}
        time={conversation.msgTime}
        user={index % 2 ? "You" : "Admin"}
        containerStyle={{ marginHorizontal: 24 }}
      />
    );
  };

  onEditText = messageText => this.setState({ messageText });

  sendMessage = () => {};

  render() {
    return [
      <View style={styles.ticketsConversationContainer} key={0}>
        <FlatList
          data={data}
          renderItem={this._renderItem}
          ItemSeparatorComponent={() => (
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: constants.shade4,
                marginHorizontal: 24
              }}
            />
          )}
        />
        <KeyboardAvoidingActionBar
          navigation={this.props.navigation}
          containerStyle={styles.actionBar}
          key={1}
        >
          <TextInput
            style={styles.supportTextInput}
            onChangeText={this.onEditText}
            returnKeyType={"next"}
            underlineColorAndroid={"transparent"}
            value={() => {}}
            multiline={true}
            onSubmitEditing={() => {}}
            placeholder={"Type your message..."}
          />
          <SimpleButton
            text={""}
            containerStyle={{
              width: 24,
              marginRight: 16,
              marginLeft: 8
            }}
            color={"transparent"}
            action={() => {}}
            icon={constants.arrowRight}
            iconSize={24}
            textColor={constants.shade3}
          />
        </KeyboardAvoidingActionBar>
      </View>
    ];
  }
}

const styles = StyleSheet.create({
  ticketsConversationContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  actionBar: {
    flexDirection: "row"
  },
  supportTextInput: {
    flex: 1,
    minHeight: 32,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: constants.shade5,
    borderRadius: 7,
    marginLeft: 24,
    marginTop: 8,
    ...constants.fontCustom(constants.primaryLight, 15)
  }
});

export default TicketsConversation;
