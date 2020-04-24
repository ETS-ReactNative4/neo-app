import React, { Component } from "react";
import { View, ScrollView, StyleSheet, Keyboard } from "react-native";
import _ from "lodash";
import constants from "../../constants/constants";
import ContactActionBar from "./Components/ContactActionBar";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import apiCall from "../../Services/networkRequests/apiCall";
import { inject, observer } from "mobx-react";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import MessageInput from "../SupportCenterScreen/Components/MessageInput";
import PrimaryHeader from "../../NavigatorsV2/Components/PrimaryHeader";
import PropTypes from "prop-types";

let subjectText, messageText;

@ErrorBoundary()
@inject("itineraries")
@inject("infoStore")
@inject("supportStore")
@observer
class ContactUs extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    infoStore: PropTypes.object.isRequired,
    supportStore: PropTypes.object.isRequired,
    itineraries: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      header: () => {
        const backAction = () => {
          Keyboard.dismiss();
          if (subjectText || messageText) {
            DebouncedAlert(
              "You have a draft message...",
              "If you go back now, your message will be lost!",
              [
                {
                  text: "Go ahead",
                  onPress: () => {
                    props.navigation.goBack();
                  }
                },
                { text: "Stay here", onPress: () => null }
              ],
              { cancelable: false }
            );
          } else {
            props.navigation.goBack();
          }
        };
        return PrimaryHeader({
          leftAction: backAction,
          headerText: "Contact Us"
        });
      }
    });
  }

  state = {
    subject: "",
    message: "",
    isSubmitAttempted: false,
    subjectType: "",
    isSubjectTextMode: false,
    isSubmitting: false
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
    const subject = this.getSubjectValue();
    const { setSuccess, setError } = this.props.infoStore;
    if (this.state.message && subject) {
      const { selectedItineraryId } = this.props.itineraries;
      const { loadConversation, getFaqDetailsByName } = this.props.supportStore;
      const faqDetails = getFaqDetailsByName(subject);
      const requestObject = {
        itineraryId: selectedItineraryId,
        msg: this.state.message,
        ticketId: "",
        ticketType: _.isEmpty(faqDetails)
          ? constants.defaultSupportType
          : faqDetails.category,
        title: _.isEmpty(faqDetails) ? subject : faqDetails.categoryDisplayStr
      };
      this.setState({
        isSubmitting: true
      });
      apiCall(constants.sendTicketMessage, requestObject)
        .then(response => {
          this.setState({
            isSubmitting: false
          });
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
        .catch(() => {
          this.setState({
            isSubmitting: false
          });
          setError(
            "Unable to Create Ticket!",
            "Looks like something went wrong, please try again after sometime..."
          );
        });
    } else {
      if (!this.state.message) {
        setError(
          "Your ticket does not have a message",
          "Please add your message to our admin..."
        );
      } else if (!subject) {
        setError(
          "Your ticket is missing the subject",
          "Please add a valid subject..."
        );
      }
    }
  };

  getSubjectValue = () => {
    if (this.state.isSubjectTextMode) {
      return this.state.subject;
    } else {
      return this.state.subjectType;
    }
  };

  cancelMessage = () => {
    Keyboard.dismiss();
    if (this.getSubjectValue() || this.state.message) {
      DebouncedAlert(
        "You have a draft message...",
        "If you go back now, your message will be lost!",
        [
          {
            text: "Go ahead",
            onPress: () => {
              this.props.navigation.goBack();
            }
          },
          { text: "Stay here", onPress: () => null }
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

  changeSubjectOption = subjectType => {
    this.setState({
      subjectType
    });
    if (subjectType === constants.defaultSupportType) {
      this.setState({
        isSubjectTextMode: true
      });
    }
  };

  componentDidMount() {
    const ticketType = this.props.route.params
      ? this.props.route.params.type
      : "";
    this.changeSubjectOption(ticketType);
  }

  render() {
    const { subject, message } = this.state;
    const { faqDetails } = this.props.supportStore;
    const subjectTypes = (Object.keys(faqDetails) || []).map(faq => {
      if (faq === "Others") {
        return {
          label: faq,
          value: constants.defaultSupportType
        };
      }
      return {
        label: faq,
        value: faq
      };
    });

    const sendButtonStyle = { backgroundColor: "transparent", borderWidth: 0 };

    return (
      <View style={styles.contactUsContainer}>
        <ScrollView
          ref={e => (this._containerScroll = e)}
          style={styles.contactUsInputArea}
        >
          <MessageInput
            label={"SUBJECT"}
            textPlaceholder={"Enter message title here..."}
            text={subject}
            onChangeText={this.setSubject}
            isSelectionMode={!this.state.isSubjectTextMode}
            options={subjectTypes}
            selectedOption={this.state.subjectType}
            onOptionsChange={this.changeSubjectOption}
          />
          <MessageInput
            label={"MESSAGE"}
            textPlaceholder={"Type your message here..."}
            text={message}
            onChangeText={this.setMessage}
            isSelectionMode={false}
          />
        </ScrollView>
        <ContactActionBar
          sendText={this.state.isSubmitting ? "Creating Ticket..." : "Send"}
          cancelAction={this.cancelMessage}
          sendAction={this.state.isSubmitting ? () => null : this.sendMessage}
          navigation={this.props.navigation}
          sendContainerStyle={this.state.isSubmitting ? sendButtonStyle : {}}
          sendTextColor={
            this.state.isSubmitting ? constants.firstColor : "white"
          }
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
    backgroundColor: "white"
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
