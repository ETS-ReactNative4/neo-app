import React, { Component, Fragment } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import constants from "../../constants/constants";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import NewJournal from "./Components/NewJounal/NewJournal";
import { inject, observer } from "mobx-react";
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
import * as Animatable from "react-native-animatable";
import Icon from "../../CommonComponents/Icon/Icon";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import { recordEvent } from "../../Services/analytics/analyticsService";
import debouncer from "../../Services/debouncer/debouncer";

/**
 * Contains two different screens
 * - New journal flow
 * - Edit journal flow
 * The screens are switched based on the `isJournalInitialized` flag
 */
@ErrorBoundary({ isRoot: true })
@inject("journalStore")
@inject("itineraries")
@observer
class Journal extends Component {
  static navigationOptions = HomeHeader;

  _didFocusSubscription;

  /**
   * Fab button should only appear when user scrolls down
   * and also only on the edit journal flow
   */
  state = {
    isFabButtonActive: false
  };

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        debouncer(() => {
          const { selectedItineraryId } = props.itineraries;
          if (selectedItineraryId) {
            this.loadJournalDetails();
          }
        });
      }
    );
  }

  startNewJournal = () => {
    const { initializeJournalDetails } = this.props.journalStore;
    initializeJournalDetails()
      .then(() => {
        this.props.navigation.navigate("JournalStart");
      })
      .catch(() => {
        DebouncedAlert(
          constants.journalFailureMessages.title,
          constants.journalFailureMessages.failedToStartJournal
        );
      });
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

  /**
   * Editing a story will take the user directly to the
   * Text editor screen of that story
   */
  editStory = (activePage, activeStory) => {
    const pushToTextEditor = StackActions.push({
      routeName: "JournalTextEditor",
      params: {
        selectedImagesList: [],
        activeStory,
        activePage,
        isEditMode: true
      }
    });
    this.props.navigation.dispatch(pushToTextEditor);
  };

  /**
   * Deleting a story will throw a confirmation alert
   */
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
    const { activeStories } = this.props.journalStore;
    for (let i = 0; i < activeStories.length; i++) {
      const story = activeStories[i];
      if (!story.title) {
        DebouncedAlert(
          constants.journalAlertMessages.oneStoryMissingTitle.header,
          constants.journalAlertMessages.oneStoryMissingTitle.message
        );
        return;
      }
    }
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
      message: constants.journalShareMessages.commonMessage(title),
      url: journalUrl + url,
      social: Share.Social.FACEBOOK
    };
    singleShare(shareOptions);
  };

  shareTwitter = (title, url) => {
    const { journalUrl } = this.props.journalStore;
    const shareOptions = {
      message: constants.journalShareMessages.twitterMessage(title),
      url: journalUrl + url,
      social: Share.Social.TWITTER
    };
    singleShare(shareOptions);
  };

  onItemScroll = ({
    nativeEvent: {
      contentOffset: { y, x }
    }
  }) => {
    /**
     * Content height of the add story button is calculated to be 135
     * Should be changed if the UI is updated.
     */
    if (y < 135) {
      this.setState({
        isFabButtonActive: false
      });
    } else {
      this.setState({
        isFabButtonActive: true
      });
    }
  };

  render() {
    const {
      isHomeScreenLoading,
      homeScreenDetails,
      isJournalInitialized,
      activeStories,
      journalTitle,
      journalDesc,
      journalCoverImage,
      journalOwner,
      journalPublishedTime,
      journalCreatedTime,
      isJournalPublished,
      storyImageQueueStatus,
      reversedPagesAndStories
    } = this.props.journalStore;

    const editJournal = () =>
      this.props.navigation.navigate("JournalStart", { isEditing: true });

    return (
      <Fragment>
        <CustomScrollView
          onScroll={this.onItemScroll}
          scrollEventThrottle={8}
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
              {activeStories.length ? (
                <EditJournal
                  addNewStory={this.addNewStory}
                  editAction={this.editStory}
                  deleteAction={this.deleteStory}
                  shareFacebook={this.shareFacebook}
                  shareTwitter={this.shareTwitter}
                  isJournalPublished={isJournalPublished}
                  storyImageQueueStatus={storyImageQueueStatus}
                  pages={reversedPagesAndStories}
                  onItemScroll={this.onItemScroll}
                  isFabButtonActive={this.state.isFabButtonActive}
                  publishJournal={this.publishJournal}
                  shareJournal={this.shareJournal}
                  activeStories={activeStories}
                  viewJournal={this.viewJournal}
                />
              ) : (
                <View>
                  <Image
                    style={styles.noStoriesIllustration}
                    source={constants.noStoriesIllus}
                  />
                  <View style={styles.textAreaContainer}>
                    <Text style={styles.noStoriesTitle}>
                      {constants.journalText.noStoriesTitle}
                    </Text>
                    <Text style={styles.noStoriesMessage}>
                      {constants.journalText.noStoriesMessage}
                    </Text>
                    <View style={styles.fabFixed}>
                      <TouchableOpacity
                        style={styles.fabTouchable}
                        onPress={this.addNewStory}
                      >
                        <Icon
                          name={constants.addIcon}
                          size={24}
                          color={"white"}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
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
        {isJournalInitialized &&
        this.state.isFabButtonActive &&
        activeStories.length ? (
          <Animatable.View
            style={styles.fabContainer}
            animation={"fadeIn"}
            duration={200}
          >
            <TouchableOpacity
              style={styles.fabTouchable}
              onPress={() => {
                recordEvent(constants.Journal.event, {
                  click: constants.Journal.click.addNewStoryFab
                });
                this.addNewStory();
              }}
            >
              <Icon name={constants.addIcon} size={24} color={"white"} />
            </TouchableOpacity>
          </Animatable.View>
        ) : null}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  journalContainer: {
    flex: 1
  },
  fabContainer: {
    backgroundColor: constants.firstColor,
    overflow: "hidden",
    height: 54,
    width: 54,
    borderRadius: 27,
    position: "absolute",
    bottom: 24,
    right: 16,
    borderWidth: 1,
    borderColor: "transparent",
    ...constants.elevationTwo
  },
  fabTouchable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  noStoriesIllustration: {
    height: responsiveWidth(100),
    width: responsiveWidth(100)
  },
  textAreaContainer: {
    height: responsiveHeight(80) - responsiveWidth(100),
    width: responsiveWidth(100),
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  fabFixed: {
    backgroundColor: constants.firstColor,
    overflow: "hidden",
    height: 54,
    width: 54,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: "transparent",
    ...constants.elevationTwo
  },
  noStoriesTitle: {
    ...constants.fontCustom(constants.primarySemiBold, 24),
    color: constants.black1,
    marginHorizontal: 24,
    textAlign: "center",
    marginTop: 16
  },
  noStoriesMessage: {
    ...constants.fontCustom(constants.primaryRegular, 16, 24),
    color: constants.black1,
    marginHorizontal: 24,
    textAlign: "center",
    marginVertical: 16
  }
});

export default Journal;
