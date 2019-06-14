import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import constants from "../../constants/constants";
import JournalDaySelectorTitle from "./Components/JournalDaySelectorTitle";
import JournalDayCard from "./Components/JournalDayCard";
import AddStoryButton from "./Components/AddStoryButton";

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

  render() {
    return (
      <ScrollView style={styles.journalDaySelectorContainer}>
        <JournalDaySelectorTitle
          title={"Tanjung Benoa"}
          description={"Parasailing / Sea Walking / Tanah Lot"}
        />
        <JournalDayCard
          image={constants.journalComingSoonIllus}
          info={
            "Snorkeling at Tanjung Benoa whilst getting exposed to the unique life of underwater"
          }
          action={() => {
            this.props.navigation.navigate("JournalImagePicker");
          }}
        />
        <JournalDayCard
          image={constants.journalComingSoonIllus}
          info={
            "Snorkeling at Tanjung Benoa whilst getting exposed to the unique life of underwater"
          }
          action={() => {
            this.props.navigation.navigate("JournalImagePicker");
          }}
          isActivated={true}
          deleteAction={() => null}
          editAction={() => null}
        />
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
