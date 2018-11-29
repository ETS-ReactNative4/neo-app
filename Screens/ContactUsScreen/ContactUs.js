import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Keyboard
} from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";
import ContactActionBar from "./Components/ContactActionBar";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import apiCall from "../../Services/networkRequests/apiCall";
import { inject, observer } from "mobx-react/custom";

let subjectText, messageText;

@inject("itineraries")
@inject("infoStore")
@inject("supportStore")
@observer
class ContactUs extends Component {
  static navigationOptions = ({ navigation }) => {
    const backAction = () => {
      Keyboard.dismiss();
      if (subjectText || messageText) {
        DebouncedAlert(
          "You have a draft message...",
          "If you go back now, your message will be lost!",
          [
            {
              text: "Delete Message!",
              onPress: () => {
                navigation.goBack();
              }
            },
            { text: "Cancel", onPress: () => null }
          ],
          { cancelable: false }
        );
      } else {
        navigation.goBack();
      }
    };
    return {
      header: (
        <CommonHeader
          leftAction={backAction}
          title={"Contact Us"}
          navigation={navigation}
        />
      )
    };
  };

  state = {
    subject: "",
    message: "",
    isSubmitAttempted: false
  };
  _containerScroll = React.createRef();

  setSubject = subject => {
    this.setState({ subject });
    subjectText = subject;
  };

  setMessage = message => {
    const currentLastChar = this.state.message.substr(
      this.state.message.length - 3
    );
    const newLastChar = message.substr(message.length - 3);
    this.setState({ message });
    if (currentLastChar !== newLastChar) {
      this._containerScroll.scrollToEnd();
    }
    messageText = message;
  };

  sendMessage = () => {
    this.setState({
      isSubmitAttempted: true
    });
    if (this.state.message && this.state.subject) {
      const ticketType = this.props.navigation.getParam("type", "");
      const { selectedItineraryId } = this.props.itineraries;
      const { setSuccess, setError } = this.props.infoStore;
      const { loadConversation } = this.props.supportStore;
      const requestObject = {
        itineraryId: selectedItineraryId,
        msg: this.state.message,
        ticketId: "",
        ticketType,
        title: this.state.subject
      };
      apiCall(constants.sendTicketMessage, requestObject)
        .then(response => {
          if (response.status === "SUCCESS") {
            loadConversation();
            Keyboard.dismiss();
            setSuccess(
              "Ticket Created!",
              "We will get back to you as early as possible..."
            );
            this.props.navigation.goBack();
          } else {
            setError(
              "Unable to Create Ticket!",
              "Looks like something went wrong, please try again after sometime..."
            );
          }
        })
        .catch(error => {
          setError(
            "Unable to Create Ticket!",
            "Looks like something went wrong, please try again after sometime..."
          );
        });
    }
  };

  cancelMessage = () => {
    Keyboard.dismiss();
    if (this.state.subject || this.state.message) {
      DebouncedAlert(
        "You have a draft message...",
        "If you go back now, your message will be lost!",
        [
          {
            text: "Delete Message!",
            onPress: () => {
              navigation.goBack();
            }
          },
          { text: "Cancel", onPress: () => null }
        ],
        { cancelable: false }
      );
    } else {
      this.props.navigation.goBack();
    }
  };

  componentWillUnmount() {
    subjectText = null;
    messageText = null;
  }

  render() {
    const { subject, message, isSubmitAttempted } = this.state;

    return (
      <View style={styles.contactUsContainer}>
        <ScrollView
          ref={e => (this._containerScroll = e)}
          style={styles.contactUsInputArea}
        >
          <TextInput
            multiline={true}
            style={[
              styles.subjectTextBox,
              isSubmitAttempted && !subject ? styles.error : null
            ]}
            onChangeText={this.setSubject}
            value={subject}
            underlineColorAndroid={"transparent"}
            placeholder={"Subject"}
            placeholderTextColor={constants.shade3}
          />
          <TextInput
            multiline={true}
            style={[
              styles.messageTextBox,
              isSubmitAttempted && !message ? styles.error : null
            ]}
            onChangeText={this.setMessage}
            value={message}
            underlineColorAndroid={"transparent"}
            placeholder={"Message"}
            placeholderTextColor={constants.shade2}
            textAlignVertical={"top"}
            numberOfLines={10}
          />
        </ScrollView>
        <ContactActionBar
          cancelAction={this.cancelMessage}
          sendAction={this.sendMessage}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contactUsContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  contactUsInputArea: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24
  },
  subjectTextBox: {
    marginTop: 32,
    ...constants.fontCustom(constants.primarySemiBold, 20, 24),
    color: constants.black1
  },
  messageTextBox: {
    marginTop: 8,
    ...constants.fontCustom(constants.primarySemiBold, 17, 24),
    color: constants.black2,
    marginBottom: 24
  },
  error: {
    borderBottomColor: "red",
    borderBottomWidth: 1
  }
});

export default ContactUs;
