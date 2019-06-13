import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import constants from "../../constants/constants";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";
import NewJournal from "./Components/NewJounal/NewJournal";
import { inject, observer } from "mobx-react/custom";
import _ from "lodash";
import CustomScrollView from "../../CommonComponents/CustomScrollView/CustomScrollView";

@ErrorBoundary({ isRoot: true })
@inject("journalStore")
@inject("itineraries")
@observer
class Journal extends Component {
  static navigationOptions = HomeHeader;

  state = {
    isNewJournal: true
  };
  _didFocusSubscription;

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        const { selectedItineraryId } = props.itineraries;
        if (selectedItineraryId) {
          this.loadJournalDetails();
        }
      }
    );
  }

  startNewJournal = () => {
    this.props.navigation.navigate("JournalStart");
  };

  loadJournalDetails = () => {
    const { getHomeScreenDetails } = this.props.journalStore;
    getHomeScreenDetails();
  };

  componentDidMount() {
    const { selectedItineraryId } = this.props.itineraries;
    if (selectedItineraryId) {
      this.loadJournalDetails();
    }
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
  }

  render() {
    const { isNewJournal } = this.state;
    const { isHomeScreenLoading, homeScreenDetails } = this.props.journalStore;
    return (
      <CustomScrollView
        style={styles.journalContainer}
        showsVerticalScrollIndicator={true}
        refreshing={isHomeScreenLoading}
        onRefresh={this.loadJournalDetails}
      >
        {_.isEmpty(homeScreenDetails) ? null : isNewJournal ? (
          <NewJournal
            title={homeScreenDetails.title}
            desc={homeScreenDetails.desc}
            buttonText={"Start Your Journal"}
            image={{ uri: homeScreenDetails.coverImage.imageUrl }}
            action={this.startNewJournal}
          />
        ) : null}
      </CustomScrollView>
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
