import React, { Component, Fragment } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import constants from "../../constants/constants";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import NewJournal from "./Components/NewJounal/NewJournal";
import { inject, observer } from "mobx-react/custom";
import _ from "lodash";
import CustomScrollView from "../../CommonComponents/CustomScrollView/CustomScrollView";
import EditJournal from "./Components/EditJournal/EditJournal";
import JournalTitleDropDown from "../JournalSetupScreen/Components/JournalTitleDropDown/JournalTitleDropDown";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import Share from "react-native-share";
import { singleShare } from "../../Services/shareService/share";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";
import { StackActions } from "react-navigation";
import openCustomTab from "../../Services/openCustomTab/openCustomTab";

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
    // const pushAction = StackActions.push({
    //   routeName: "JournalImagePicker",
    //   params: {
    //     activePage,
    //     activeStory
    //   }
    // });
    const pushToTextEditor = StackActions.push({
      routeName: "JournalTextEditor",
      params: {
        selectedImagesList: [],
        activeStory,
        activePage,
        isEditMode: true
      }
    });
    // this.props.navigation.dispatch(pushAction);
    this.props.navigation.dispatch(pushToTextEditor);
  };

  deleteStory = storyId => {
    const { deleteStory } = this.props.journalStore;
    DebouncedAlert(
      constants.journalAlertMessages.removeStory.header,
      constants.journalAlertMessages.removeStory.message,
      [
        {
          text: constants.journalAlertMessages.removeStory.confirm,
          onPress: () =>
            deleteStory(storyId).catch(() =>
              DebouncedAlert(
                constants.journalFailureMessages.title,
                constants.journalFailureMessages.failedToDeleteStory
              )
            ),
          style: "destructive"
        },
        {
          text: constants.journalAlertMessages.removeStory.cancel,
          onPress: () => null
        }
      ],
      {
        cancelable: false
      }
    );
  };

  publishJournal = () => {
    this.props.navigation.navigate("JournalPublish");
  };

  shareJournal = () => {
    this.props.navigation.navigate("JournalShare");
  };

  viewJournal = () => {
    const { journalUrl } = this.props.journalStore;
    openCustomTab(journalUrl);
  };

  shareFacebook = (title, url) => {
    const { journalUrl } = this.props.journalStore;
    const shareOptions = {
      message: title,
      url: journalUrl + url,
      social: Share.Social.FACEBOOK
    };
    singleShare(shareOptions);
  };

  shareTwitter = (title, url) => {
    const { journalUrl } = this.props.journalStore;
    const shareOptions = {
      message: title,
      url: journalUrl + url,
      social: Share.Social.TWITTER
    };
    singleShare(shareOptions);
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
      journalPublishedTime,
      journalCreatedTime,
      isJournalPublished,
      storyImageQueueStatus
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
              journalCreatedTime={journalCreatedTime}
              isJournalPublished={isJournalPublished}
              coverImage={{ uri: journalCoverImage }}
              title={journalTitle}
              desc={journalDesc}
            />
            <EditJournal
              addNewStory={this.addNewStory}
              editAction={this.editStory}
              deleteAction={this.deleteStory}
              shareFacebook={this.shareFacebook}
              shareTwitter={this.shareTwitter}
              isJournalPublished={isJournalPublished}
              storyImageQueueStatus={storyImageQueueStatus}
              pages={pages}
              publishJournal={this.publishJournal}
              shareJournal={this.shareJournal}
              viewJournal={this.viewJournal}
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
