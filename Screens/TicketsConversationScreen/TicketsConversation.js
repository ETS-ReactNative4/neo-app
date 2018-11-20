import React, { Component } from "react";
import { View, FlatList, StyleSheet, TextInput } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import ConversationCard from "./Components/ConversationCard";
import constants from "../../constants/constants";
import KeyboardAvoidingActionBar from "../../CommonComponents/KeyboardAvoidingActionBar/KeyboardAvoidingActionBar";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import MultiLineHeader from "../../CommonComponents/MultilineHeader/MultiLineHeader";
import { inject, observer } from "mobx-react/custom";
import moment from "moment";

@inject("userStore")
@inject("supportStore")
@observer
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
    const { userDetails } = this.props.userStore;
    const user = userDetails.email === conversation.userEmail ? "You" : "Admin";
    return (
      <ConversationCard
        message={conversation.msg}
        time={`${moment(conversation.msgTime).fromNow()}, ${moment(
          conversation.msgTime
        ).format("hh:mma")}`}
        user={user}
        containerStyle={{ marginHorizontal: 24 }}
      />
    );
  };

  componentDidMount() {
    const ticketId = this.props.navigation.getParam("ticketId", "");
    const { loadTickets } = this.props.supportStore;
    loadTickets(ticketId);
  }

  _keyExtractor = (item, index) => index;

  onEditText = messageText => this.setState({ messageText });

  sendMessage = () => {};

  render() {
    const ticketId = this.props.navigation.getParam("ticketId", "");
    const {
      loadTickets,
      isMessagesLoading,
      getMessagesByTicket
    } = this.props.supportStore;
    const data = getMessagesByTicket(ticketId);
    return [
      <View style={styles.ticketsConversationContainer} key={0}>
        <FlatList
          data={data}
          keyExtractor={this._keyExtractor}
          onRefresh={() => loadTickets(ticketId)}
          refreshing={isMessagesLoading}
          renderItem={this._renderItem}
          inverted={true}
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
            placeholderTextColor={constants.shade2}
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
    borderWidth: 1,
    borderColor: constants.shade4,
    backgroundColor: constants.shade5,
    paddingTop: 8,
    paddingHorizontal: 8,
    marginBottom: 4,
    justifyContent: "center",
    borderRadius: 7,
    marginLeft: 24,
    marginTop: 8,
    ...constants.fontCustom(constants.primaryLight, 15)
  }
});

export default TicketsConversation;
