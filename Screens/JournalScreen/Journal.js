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
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import HamburgerButton from "../../CommonComponents/HamburgerButton/HamburgerButton";
import storeService from "../../Services/storeService/storeService";
import HomeTitle from "../../CommonComponents/HomeTitle/HomeTitle";
import { recordEvent } from "../../Services/analytics/analyticsService";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import Share from "react-native-share";
import { singleShare } from "../../Services/shareService/share";
import { StackActions } from "react-navigation";

let _publishJournal;
let _shareJournal;

const RightButton = inject("journalStore")(
  observer(({ journalStore }) => {
    const { journalDetails, activeStories, isJournalPublished } = journalStore;
    if (_.isEmpty(journalDetails)) {
      return (
        <View
          style={{
            height: 24,
            width: 62
          }}
        />
      );
    }
    if (!isJournalPublished) {
      if (activeStories.length) {
        return (
          <SimpleButton
            text={"Publish"}
            textColor={constants.firstColor}
            color={"transparent"}
            containerStyle={{
              height: 24,
              width: 62,
              marginRight: 16
            }}
            action={_publishJournal}
          />
        );
      } else {
        return (
          <View
            style={{
              height: 24,
              width: 62
            }}
          />
        );
      }
    } else {
      return (
        <SimpleButton
          text={"Share"}
          textColor={constants.firstColor}
          color={"transparent"}
          containerStyle={{
            height: 24,
            width: 62,
            marginRight: 16
          }}
          action={_shareJournal}
        />
      );
    }
  })
);

@ErrorBoundary({ isRoot: true })
@inject("journalStore")
@inject("itineraries")
@observer
class Journal extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader
          LeftButton={
            <HamburgerButton
              action={() => {
                storeService.appState.onDrawerOpen();
                navigation.openDrawer();
              }}
            />
          }
          TitleComponent={
            <HomeTitle
              action={() => {
                recordEvent(constants.selectBookingHeaderClick);
                navigation.navigate("YourBookingsUniversal");
              }}
            />
          }
          title={""}
          RightButton={<RightButton />}
          navigation={navigation}
        />
      )
    };
  };

  _didFocusSubscription;

  constructor(props) {
    super(props);

    _publishJournal = this.publishJournal;
    _shareJournal = this.shareJournal;
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

  publishJournal = () => {
    this.props.navigation.navigate("JournalPublish");
  };

  shareJournal = () => {
    this.props.navigation.navigate("JournalShare");
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
