import React from "react";
import { View, StyleSheet } from "react-native";
import AddStoryButton from "../../../JournalDaySelectorScreen/Components/AddStoryButton";
import CustomScrollView from "../../../../CommonComponents/CustomScrollView/CustomScrollView";
import constants from "../../../../constants/constants";
import Dash from "react-native-dash";
import JournalDayCard from "../../../JournalDaySelectorScreen/Components/JournalDayCard";
import _ from "lodash";

const EditJournal = ({ activeStories, addNewStory }) => {
  return (
    <CustomScrollView
      containerStyle={styles.scrollContainer}
      style={styles.scrollBackground}
      onRefresh={() => null}
      refreshing={false}
    >
      <AddStoryButton action={addNewStory} />
      <Dash dashColor={constants.shade4} dashGap={2} dashLength={1} />
      {activeStories.map((story, storyIndex) => {
        return (
          <JournalDayCard
            key={storyIndex}
            action={() => null}
            isActivated={story.initialized}
            info={story.title}
            image={_.get(story, "defaultCoverImage.imageUrl")}
          />
        );
      })}
    </CustomScrollView>
  );
};

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
