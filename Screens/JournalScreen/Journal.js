import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import constants from "../../constants/constants";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";
import NewJournal from "./Components/NewJounal/NewJournal";

@ErrorBoundary({ isRoot: true })
class Journal extends Component {
  static navigationOptions = HomeHeader;

  state = {
    isNewJournal: true
  };

  startNewJournal = () => {
    this.props.navigation.navigate("JournalStart");
  };

  render() {
    const { isNewJournal } = this.state;
    return (
      <View style={styles.journalContainer}>
        {isNewJournal ? (
          <NewJournal
            title={"Write beautiful travel stories"}
            desc={`Memories from your travels to inspire your readers and maybe also induce some envy.`}
            buttonText={"Start Your Journal"}
            image={constants.paymentSuccessIllus}
            action={this.startNewJournal}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  journalContainer: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default Journal;
