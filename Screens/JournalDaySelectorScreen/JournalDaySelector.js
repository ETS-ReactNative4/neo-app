import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import constants from "../../constants/constants";
import JournalDaySelectorTitle from "./Components/JournalDaySelectorTitle";
import JournalDayCard from "./Components/JournalDayCard";
import AddStoryButton from "./Components/AddStoryButton";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { inject, observer } from "mobx-react/custom";

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
          RightButton={
            <SimpleButton
              text={"Publish"}
              textColor={constants.firstColor}
              color={"transparent"}
              containerStyle={{
                height: 24,
                width: 62,
                marginRight: 16
              }}
            />
          }
        />
      )
    };
  };

  navigateToImagePicker = (activePage, activeStory) => {
    this.props.navigation.navigate("JournalImagePicker", {
      activePage,
      activeStory
    });
  };

  render() {
    const title = this.props.navigation.getParam("title", "");
    const info = this.props.navigation.getParam("info", "");
    const activePage = this.props.navigation.getParam("activePage", "");
    const { getStoriesByPageId } = this.props.journalStore;
    const stories = getStoriesByPageId(activePage);
    return (
      <ScrollView style={styles.journalDaySelectorContainer}>
        <JournalDaySelectorTitle title={title} description={info} />
        {stories.map((story, storyIndex) => {
          if (story.initialized) return null;
          return (
            <JournalDayCard
              key={storyIndex}
              image={{
                uri: story.defaultCoverImage.imageUrl
              }}
              info={story.title}
              action={() =>
                this.navigateToImagePicker(activePage, story.storyId)
              }
            />
          );
        })}
        <AddStoryButton
          action={() => null}
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
