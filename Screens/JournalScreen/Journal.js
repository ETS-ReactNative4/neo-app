import React, { Component, Fragment } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import constants from "../../constants/constants";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";
import NewJournal from "./Components/NewJounal/NewJournal";
import { inject, observer } from "mobx-react/custom";
import _ from "lodash";
import CustomScrollView from "../../CommonComponents/CustomScrollView/CustomScrollView";
import EditJournal from "./Components/EditJournal/EditJournal";
import JournalTitleDropDown from "../JournalSetupScreen/Components/JournalTitleDropDown/JournalTitleDropDown";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";

@ErrorBoundary({ isRoot: true })
@inject("journalStore")
@inject("itineraries")
@observer
class Journal extends Component {
  static navigationOptions = HomeHeader;

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
    const { initializeJournalDetails } = this.props.journalStore;
    initializeJournalDetails();
    this.props.navigation.navigate("JournalStart");
  };

  loadJournalDetails = () => {
    const {
      getHomeScreenDetails,
      isJournalInitialized,
      refreshJournalInformation
    } = this.props.journalStore;
    if (isJournalInitialized) {
      refreshJournalInformation();
    } else {
      getHomeScreenDetails();
    }
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

  addNewStory = () => {
    this.props.navigation.navigate("JournalSetup");
  };

  editStory = (activePage, activeStory) => {
    this.props.navigation.navigate("JournalImagePicker", {
      activePage,
      activeStory
    });
  };

  deleteStory = storyId => {
    const { deleteStory } = this.props.journalStore;
    DebouncedAlert(
      "Are you sure?",
      "Deleting a story is an irreversible action",
      [
        {
          text: "Yes",
          onPress: () =>
            deleteStory(storyId).catch(() =>
              DebouncedAlert("Error!", "Failed to delete the story!")
            )
        },
        {
          text: "No",
          onPress: () => null
        }
      ],
      {
        cancelable: false
      }
    );
  };

  render() {
    const {
      isHomeScreenLoading,
      homeScreenDetails,
      isJournalInitialized,
      pages,
      journalTitle,
      journalDesc,
      journalCoverImage,
      journalOwner,
      journalPublishedTime
    } = this.props.journalStore;

    const editJournal = () =>
      this.props.navigation.navigate("JournalStart", { isEditing: true });

    return (
      <CustomScrollView
        style={[
          styles.journalContainer,
          {
            backgroundColor: isJournalInitialized ? constants.white1 : "white"
          }
        ]}
        showsVerticalScrollIndicator={true}
        refreshing={isHomeScreenLoading}
        onRefresh={this.loadJournalDetails}
      >
        {isJournalInitialized ? (
          <Fragment>
            <JournalTitleDropDown
              editAction={editJournal}
              journalOwner={journalOwner}
              journalPublishedTime={journalPublishedTime}
              coverImage={{ uri: journalCoverImage }}
              title={journalTitle}
              desc={journalDesc}
            />
            <EditJournal
              addNewStory={this.addNewStory}
              editAction={this.editStory}
              deleteAction={this.deleteStory}
              pages={pages}
            />
          </Fragment>
        ) : (
          <NewJournal
            title={homeScreenDetails.title}
            desc={homeScreenDetails.desc}
            buttonText={"Start Your Journal"}
            image={{ uri: _.get(homeScreenDetails, "coverImage.imageUrl") }}
            action={this.startNewJournal}
          />
        )}
      </CustomScrollView>
    );
  }
}

const styles = StyleSheet.create({
  journalContainer: {
    flex: 1
  }
});

export default Journal;
