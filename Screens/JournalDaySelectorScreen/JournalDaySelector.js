import React, { Component } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import constants from "../../constants/constants";
import JournalDaySelectorTitle from "./Components/JournalDaySelectorTitle";
import JournalDayCard from "./Components/JournalDayCard";
import AddStoryButton from "./Components/AddStoryButton";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { inject, observer } from "mobx-react";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import _ from "lodash";
import { SCREEN_JOURNAL_IMAGE_PICKER } from "../../NavigatorsV2/ScreenNames";

let _publishJournal = () => null;

const RightButton = inject("journalStore")(
  observer(({ journalStore }) => {
    const { activeStories, isJournalPublished } = journalStore;
    if (activeStories.length && !isJournalPublished) {
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
  })
);

@ErrorBoundary()
@inject("journalStore")
@observer
class JournalDaySelector extends Component {
  constructor(props) {
    super(props);

    _publishJournal = this.publishJournal;
    const title = props.route.params?.pageTitle ?? "";
    props.navigation.setOptions({
      header: () => (
        <CommonHeader
          title={title}
          navigation={props.navigation}
          RightButton={<RightButton />}
        />
      )
    });
  }

  navigateToImagePicker = (activePage, activeStory) => {
    this.props.navigation.navigate(SCREEN_JOURNAL_IMAGE_PICKER, {
      activePage,
      activeStory
    });
  };

  addNewStory = () => {
    const activePage = this.props.route.params?.activePage ?? "";
    this.navigateToImagePicker(activePage, "");
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

  render() {
    const title = this.props.route.params?.title ?? "";
    const info = this.props.route.params?.info ?? "";
    const activePage = this.props.route.params?.activePage ?? "";
    const {
      getStoriesByPageId,
      storyImageQueueStatus
    } = this.props.journalStore;
    const stories = getStoriesByPageId(activePage);
    return (
      <ScrollView style={styles.journalDaySelectorContainer}>
        <JournalDaySelectorTitle title={title} description={info} />
        {stories.map((story, storyIndex) => {
          if (story.initialized) {
            const imageUrl = _.get(story, "coverImage.imageUrl");
            const imageUploadStatus = storyImageQueueStatus(story.storyId);
            const pendingImages = imageUploadStatus.pendingImages;
            const completedImages = imageUploadStatus.completedImages;
            const uploadedImages = Object.keys(story.images || {}).length;
            return (
              <JournalDayCard
                key={storyIndex}
                action={() =>
                  this.navigateToImagePicker(activePage, story.storyId)
                }
                isActivated={story.initialized}
                info={story.title}
                image={imageUrl ? { uri: imageUrl } : null}
                editAction={() =>
                  this.navigateToImagePicker(activePage, story.storyId)
                }
                deleteAction={() => this.deleteStory(story.storyId)}
                isImageUploading={!!pendingImages}
                pendingImages={pendingImages}
                totalImages={pendingImages + completedImages + uploadedImages}
                isImageContained={_.get(story, "coverImage.contained")}
              />
            );
          }
          return (
            <JournalDayCard
              key={storyIndex}
              image={{
                uri: _.get(story, "defaultCoverImage.imageUrl")
              }}
              info={story.title}
              action={() =>
                this.navigateToImagePicker(activePage, story.storyId)
              }
            />
          );
        })}
        <AddStoryButton
          action={this.addNewStory}
          containerStyle={styles.addStoryButton}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  journalDaySelectorContainer: {
    backgroundColor: constants.white1
  },
  addStoryButton: {
    marginBottom: 32
  }
});

export default JournalDaySelector;
