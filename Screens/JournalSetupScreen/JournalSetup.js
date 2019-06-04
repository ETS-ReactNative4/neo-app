import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";

class JournalSetup extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Journal Setup"} navigation={navigation} />
    };
  };

  render() {
    return (
      <View style={styles.journalSetupContainer}>
        <Text />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  journalSetupContainer: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default JournalSetup;
