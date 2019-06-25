import React, { Fragment } from "react";
import { StyleSheet } from "react-native";
import AddStoryButton from "../../../JournalDaySelectorScreen/Components/AddStoryButton";
import CustomScrollView from "../../../../CommonComponents/CustomScrollView/CustomScrollView";
import constants from "../../../../constants/constants";
import Dash from "react-native-dash";
import JournalDayCard from "../../../JournalDaySelectorScreen/Components/JournalDayCard";
import _ from "lodash";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";
import JournalDaySelectorTitle from "../../../JournalDaySelectorScreen/Components/JournalDaySelectorTitle";

const EditJournal = ({
  addNewStory,
  editAction,
  pages,
  deleteAction,
  shareFacebook,
  shareTwitter,
  isJournalPublished,
  storyImageQueueStatus
}) => {
  return (
    <CustomScrollView
      containerStyle={styles.scrollContainer}
      style={styles.scrollBackground}
      onRefresh={() => null}
      refreshing={false}
    >
      <AddStoryButton action={addNewStory} />
      <Dash dashColor={constants.shade4} dashGap={2} dashLength={1} />
      {pages.reverse().map((page, pageIndex) => {
        const activeStories = page.stories.filter(story => story.initialized);
        return (
          <Fragment key={pageIndex}>
            {activeStories.length ? (
              <JournalDaySelectorTitle
                day={page.pageDate}
                dayString={page.pageDateStr}
                title={page.title}
                description={page.info}
              />
            ) : null}
            {activeStories.reverse().map((story, storyIndex) => {
              const imageUrl = _.get(story, "coverImage.imageUrl");
              const imageUploadStatus = storyImageQueueStatus(story.storyId);
              const pendingImages = imageUploadStatus.pendingImages;
              const uploadedImages = Object.keys(story.images || {}).length;
              return (
                <JournalDayCard
                  key={storyIndex}
                  action={() => editAction(page.pageId, story.storyId)}
                  isActivated={story.initialized}
                  info={story.title}
                  image={imageUrl ? { uri: imageUrl } : null}
                  editAction={() => editAction(page.pageId, story.storyId)}
                  deleteAction={() => deleteAction(story.storyId)}
                  isJournalPublished={isJournalPublished}
                  shareFacebook={() => shareFacebook(story.title, story.url)}
                  shareTwitter={() => shareTwitter(story.title, story.url)}
                  isImageUploading={!!pendingImages}
                  pendingImages={pendingImages}
                  totalImages={pendingImages + uploadedImages}
                />
              );
            })}
          </Fragment>
        );
      })}
    </CustomScrollView>
  );
};

EditJournal.propTypes = forbidExtraProps({
  addNewStory: PropTypes.func.isRequired,
  editAction: PropTypes.func.isRequired,
  deleteAction: PropTypes.func.isRequired,
  pages: PropTypes.array.isRequired,
  shareFacebook: PropTypes.func.isRequired,
  shareTwitter: PropTypes.func.isRequired,
  isJournalPublished: PropTypes.bool.isRequired,
  storyImageQueueStatus: PropTypes.func.isRequired
});

const styles = StyleSheet.create({
  scrollBackground: {
    flex: 1,
    backgroundColor: constants.white1
  },
  scrollContainer: {
    backgroundColor: "transparent"
  }
});

export default EditJournal;
