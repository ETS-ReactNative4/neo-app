import React, { Component } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import constants from "../../constants/constants";
import { inject, observer } from "mobx-react";
import moment from "moment";
import apiCall from "../../Services/networkRequests/apiCall";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import CustomScrollView from "../../CommonComponents/CustomScrollView/CustomScrollView";
import MessageBlob from "../SupportCenterScreen/Components/MessageBlob";
import HelpDeskSectionTitle from "../SupportCenterScreen/Components/HelpDeskSectionTitle";
import MessageInput from "../SupportCenterScreen/Components/MessageInput";
import { responsiveWidth } from "react-native-responsive-dimensions";
// import ContactActionBar from "../ContactUsScreen/Components/ContactActionBar";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import PropTypes from "prop-types";
import PrimaryHeader from "../../NavigatorsV2/Components/PrimaryHeader";

@ErrorBoundary()
@inject("userStore")
@inject("infoStore")
@inject("itineraries")
@inject("supportStore")
@observer
class TicketsConversation extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    supportStore: PropTypes.object.isRequired,
    itineraries: PropTypes.object.isRequired,
    infoStore: PropTypes.object.isRequired,
    userStore: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => props.navigation.goBack(),
          headerText: props.route.params ? props.route.params.title : ""
        })
    });
  }

  state = {
    messageText: "",
    isSending: false
  };
  _scrollView = React.createRef();

  _renderItem = conversation => {
    const { userDetails } = this.props.userStore;
    const isAdmin = userDetails.email !== conversation.userEmail;
    const name = isAdmin
      ? `Reply from ${conversation.userName || "Admin"}`.toUpperCase()
      : "YOU";
    return (
      <MessageBlob
        containerStyle={styles.blobContainer}
        isAdmin={isAdmin}
        name={name}
        message={conversation.msg}
        time={moment(conversation.msgTime).format(
          `${constants.shortTimeFormat} - ${constants.shortCommonDateFormat}`
        )}
      />
    );
  };

  componentDidMount() {
    const ticketId = this.props.route.params
      ? this.props.route.params.ticketId
      : "";
    const { loadTickets } = this.props.supportStore;
    loadTickets(ticketId);
    setTimeout(() => {
      this._scrollView.current && this._scrollView.current.scrollToEnd();
    }, 300);
  }

  keyBoardStateChange = visibility => {
    if (visibility === "visible") {
      this._scrollView.current && this._scrollView.current.scrollToEnd();
    }
  };

  onEditText = messageText => this.setState({ messageText });

  sendMessage = () => {
    this.setState(
      {
        isSending: true
      },
      () => {
        if (this.state.messageText) {
          const ticketId = this.props.route.params
            ? this.props.route.params.ticketId
            : "";
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
                this.setState({
                  isSending: false
                });
                setError(
                  "Unable to send message!",
                  "Looks like something went wrong, please try again after sometime..."
                );
              }
            })
            .catch(() => {
              this.setState({
                isSending: false
              });
              setError(
                "Unable to send message!",
                "Looks like something went wrong, please try again after sometime..."
              );
            });
        } else {
          this.setState({
            isSending: false
          });
        }
      }
    );
  };

  cancelMessage = () => {
    const goBack = () => this.props.navigation.goBack();
    if (this.state.messageText) {
      DebouncedAlert(
        "Are you sure?",
        "Your current message will be discarded",
        [
          {
            text: "Stay here",
            style: "cancel",
            onPress: () => null
          },
          {
            text: "Go Back",
            onPress: () => {
              Keyboard.dismiss();
              goBack();
            }
          }
        ]
      );
    } else {
      goBack();
    }
  };

  render() {
    const ticketId = this.props.route.params
      ? this.props.route.params.ticketId
      : "";
    const {
      loadTickets,
      isMessagesLoading,
      getMessagesByTicket
    } = this.props.supportStore;
    const data = getMessagesByTicket(ticketId) || [];
    const reversedData = [...data].reverse();
    const status = this.props.route.params
      ? this.props.route.params.status
      : "";
    const isClosed = status === "Closed";
    return (
      <View style={styles.ticketsConversationContainer}>
        <HelpDeskSectionTitle
          title={
            isClosed
              ? constants.helpDeskText.queryClosedText
              : constants.helpDeskText.queryOpenText
          }
          infoColor={isClosed ? constants.shade1 : constants.firstColor}
          infoBackgroundColor={
            isClosed ? constants.shade4 : constants.firstColorBackground
          }
          info={isClosed ? "Closed" : "Open"}
          containerStyle={styles.sectionTitleWrapper}
        />
        <CustomScrollView
          scrollRef={this._scrollView}
          onRefresh={() => loadTickets(ticketId)}
          refreshing={isMessagesLoading}
          style={styles.ticketsConversationContainer}
          containerStyle={styles.ticketsConversationContainer}
        >
          {reversedData.map(this._renderItem)}
          <MessageInput
            text={this.state.messageText}
            onChangeText={this.onEditText}
            label={"YOU"}
            textPlaceholder={"Type your message here..."}
            containerStyle={styles.blobContainer}
          />
          <View style={styles.blobPlaceholder} />
        </CustomScrollView>
        {/* <ContactActionBar
          containerStyle={styles.inputActionBar}
          navigation={this.props.navigation}
          keyBoardStateChange={this.keyBoardStateChange}
          sendAction={this.state.isSending ? () => null : this.sendMessage}
          cancelAction={this.cancelMessage}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ticketsConversationContainer: {
    flex: 1,
    backgroundColor: constants.white1
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
  },
  blobContainer: {
    paddingHorizontal: 24,
    backgroundColor: "white",
    paddingVertical: 16,
    marginVertical: 1
  },
  sectionTitleWrapper: {
    marginHorizontal: 24,
    marginVertical: 12
  },
  blobPlaceholder: {
    height: 36,
    width: responsiveWidth(100)
  },
  inputActionBar: {
    backgroundColor: "white"
  }
});

export default TicketsConversation;
