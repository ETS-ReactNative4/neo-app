import React, { Component } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import constants from "../../constants/constants";
import JournalDaySelectorTitle from "./Components/JournalDaySelectorTitle";
import JournalDayCard from "./Components/JournalDayCard";
import AddStoryButton from "./Components/AddStoryButton";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { inject, observer } from "mobx-react/custom";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import _ from "lodash";

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
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam("pageTitle", "");
    return {
      header: (
        <CommonHeader
          title={title}
          navigation={navigation}
          RightButton={<RightButton />}
        />
      )
    };
  };

  constructor(props) {
    super(props);

    _publishJournal = this.publishJournal;
  }

  navigateToImagePicker = (activePage, activeStory) => {
    this.props.navigation.navigate("JournalImagePicker", {
      activePage,
      activeStory
    });
  };

  addNewStory = () => {
    const { createNewStory } = this.props.journalStore;
    const activePage = this.props.navigation.getParam("activePage", "");
    createNewStory(activePage)
      .then(storyId => {
        this.navigateToImagePicker(activePage, storyId);
      })
      .catch(() => {
        DebouncedAlert(constants.journalFailureMessages.failedToCreateNewStory);
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

  publishJournal = () => {
    this.props.navigation.navigate("JournalPublish");
  };

  render() {
    const title = this.props.navigation.getParam("title", "");
    const info = this.props.navigation.getParam("info", "");
    const activePage = this.props.navigation.getParam("activePage", "");
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
                totalImages={pendingImages + uploadedImages}
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
