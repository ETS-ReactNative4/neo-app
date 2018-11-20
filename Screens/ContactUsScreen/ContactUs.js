import React, { Component } from "react";
import { View, ScrollView, StyleSheet, TextInput } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";
import ContactActionBar from "./Components/ContactActionBar";
import { responsiveHeight } from "react-native-responsive-dimensions";

class ContactUs extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Contact Us"} navigation={navigation} />
    };
  };

  state = {
    subject: "",
    message: ""
  };
  _containerScroll = React.createRef();

  setSubject = subject => this.setState({ subject });

  setMessage = message => {
    const currentLastChar = this.state.message.substr(
      this.state.message.length - 3
    );
    const newLastChar = message(message.length - 3);
    this.setState({ message });
    if (currentLastChar !== newLastChar) {
      this._containerScroll.scrollToEnd();
    }
  };

  render() {
    return (
      <View style={styles.contactUsContainer}>
        <ScrollView
          ref={e => (this._containerScroll = e)}
          style={styles.contactUsInputArea}
        >
          <TextInput
            multiline={true}
            style={styles.subjectTextBox}
            onChangeText={this.setSubject}
            value={this.state.subject}
            underlineColorAndroid={"transparent"}
            placeholder={"Subject"}
            placeholderTextColor={constants.shade3}
          />
          <TextInput
            multiline={true}
            style={styles.messageTextBox}
            onChangeText={this.setMessage}
            value={this.state.message}
            underlineColorAndroid={"transparent"}
            placeholder={"Message"}
            placeholderTextColor={constants.shade2}
            textAlignVertical={"top"}
            numberOfLines={10}
          />
        </ScrollView>
        <ContactActionBar navigation={this.props.navigation} />
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
  }
});

export default ContactUs;
