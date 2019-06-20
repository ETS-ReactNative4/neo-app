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

const EditJournal = ({ addNewStory, editAction, pages }) => {
  return (
    <CustomScrollView
      containerStyle={styles.scrollContainer}
      style={styles.scrollBackground}
      onRefresh={() => null}
      refreshing={false}
    >
      <AddStoryButton action={addNewStory} />
      <Dash dashColor={constants.shade4} dashGap={2} dashLength={1} />
      {pages.map((page, pageIndex) => {
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
            {activeStories.map((story, storyIndex) => {
              const imageUrl = _.get(story, "coverImage.imageUrl");
              return (
                <JournalDayCard
                  key={storyIndex}
                  action={() => null}
                  isActivated={story.initialized}
                  info={story.title}
                  image={imageUrl ? { uri: imageUrl } : null}
                  editAction={() => editAction(page.pageId, story.storyId)}
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
  pages: PropTypes.array.isRequired
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
