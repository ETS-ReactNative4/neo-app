import React, { Component } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Keyboard,
  Platform
} from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import ConversationCard from "./Components/ConversationCard";
import constants from "../../constants/constants";
import KeyboardAvoidingActionBar from "../../CommonComponents/KeyboardAvoidingActionBar/KeyboardAvoidingActionBar";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import MultiLineHeader from "../../CommonComponents/MultilineHeader/MultiLineHeader";
import { inject, observer } from "mobx-react/custom";
import moment from "moment";
import apiCall from "../../Services/networkRequests/apiCall";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";

@ErrorBoundary()
@inject("userStore")
@inject("infoStore")
@inject("itineraries")
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
    messageText: "",
    isSending: false
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

  sendMessage = () => {
    this.setState({
      isSending: true
    });
    if (this.state.messageText) {
      const ticketId = this.props.navigation.getParam("ticketId", "");
      const { setError } = this.props.infoStore;
      const {
        addMessageToConversation,
        getLastMessageByTicket
      } = this.props.supportStore;
      const { selectedItineraryId } = this.props.itineraries;
      const { userDetails } = this.props.userStore;
      const lastTicketDetails = getLastMessageByTicket(ticketId);
      const requestObject = {
        itineraryId: selectedItineraryId,
        msg: this.state.messageText,
        ticketId
      };
      apiCall(constants.sendTicketMessage, requestObject)
        .then(response => {
          if (response.status === "SUCCESS") {
            Keyboard.dismiss();
            const messageObject = {
              userEmail: userDetails.email,
              msg: this.state.messageText,
              msgId: lastTicketDetails.msgId + 1,
              msgTime: moment().valueOf()
            };
            addMessageToConversation(ticketId, messageObject);
            this.setState(
              {
                messageText: ""
              },
              () => {
                // Allow sending another ticket only after the message field is reset
                this.setState({
                  isSending: false
                });
              }
            );
          } else {
            setError(
              "Unable to send message!",
              "Looks like something went wrong, please try again after sometime..."
            );
          }
        })
        .catch(error => {
          this.setState({
            isSending: false
          });
          setError(
            "Unable to send message!",
            "Looks like something went wrong, please try again after sometime..."
          );
        });
    }
  };

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
                borderTopWidth: StyleSheet.hairlineWidth,
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
            value={this.state.messageText}
            multiline={true}
            onSubmitEditing={() => null}
            placeholderTextColor={constants.shade2}
            placeholder={"Type your message..."}
          />
          <SimpleButton
            text={""}
            containerStyle={{
              width: 24,
              marginRight: 16,
              marginLeft: 8,
              ...Platform.select({
                android: {
                  marginTop: 12,
                  marginLeft: 16
                }
              })
            }}
            color={"transparent"}
            action={
              this.state.isSending ? () => null : () => this.sendMessage()
            }
            icon={constants.arrowRight}
            iconSize={Platform.OS === "ios" ? 24 : 28}
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
