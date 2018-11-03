import React, { Component } from "react";
import { View, ScrollView, StyleSheet, TextInput } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";

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

  setSubject = subject => this.setState({ subject });

  setMessage = message => this.setState({ message });

  render() {
    return (
      <View style={styles.contactUsContainer}>
        <ScrollView style={styles.contactUsInputArea}>
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
          />
        </ScrollView>
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
    color: constants.black2
  }
});

export default ContactUs;
