import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";
import constants from "../../constants/constants";
import DayAhead from "./Components/DayAhead/DayAhead";
import FeedBackSwiper from "./Components/FeedBackSwiper/FeedBackSwiper";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import ToolTip from "./Components/ToolTip/ToolTip";
import TripViewLite from "./Components/TripViewLite/TripViewLite";
import TripView from "./Components/TripView/TripView";
import TripFeedCarousel from "./Components/TripFeedCarousel/TripFeedCarousel";
import JournalCard from "./Components/JournalCard/JournalCard";
import Icon from "../../CommonComponents/Icon/Icon";
import WidgetTitle from "./Components/WidgetTitle/WidgetTitle";
import Notify from "./Components/Notify/Notify";
import ReminderCard from "./Components/ReminderCard/ReminderCard";

@ErrorBoundary({ isRoot: true })
class TripFeed extends Component {
  static navigationOptions = HomeHeader;

  state = {
    scrollEnabled: true
  };

  toggleScrollLock = status => {
    this.setState({
      scrollEnabled: status
    });
  };

  render() {
    const notifyData = [
      {
        title: "Heads up!",
        message: "Your pick up is scheduled at 8:30am from your hotel lobby.",
        action: () => {},
        actionText: "LEARN MORE",
        modalButton: "Alright!",
        details: [
          {
            text:
              "Plan a trip to some local attractions, dine at a local restaurent or go shopping!"
          },
          {
            text:
              "That’s how you greet in Spanish. Learn more phrases that could come handy. That’s how you greet in Spanish. Learn more phrases that could come handy!"
          }
        ]
      }
    ];

    const reminderData = {
      title: "Royal plaza Eaplanade",
      content:
        "30 minutes from the Airport by car. Your transfer will be waiting for you outside the arrival hall.",
      image:
        "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg",
      action: () => {},
      modalButton: "Alright!"
    };

    return (
      <ScrollView
        directionalLockEnabled={true}
        scrollEnabled={this.state.scrollEnabled}
        style={styles.tripFeedScrollView}
      >
        <Notify data={notifyData} />

        <ReminderCard data={reminderData} />

        <JournalCard
          data={{
            title: "Memories from Samantha’s family vacation in July '18",
            type: "JOURNAL",
            image: {
              uri:
                "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
            },
            action: () => {}
          }}
          boxStyle={{
            height: 320,
            margin: 24,
            marginRight: 24
          }}
          icon={
            <Icon
              name={constants.starActive}
              color={constants.thirdColor}
              size={26}
            />
          }
          iconText={234}
          gradients={[constants.darkGradientAlpha]}
        />
        <FeedBackSwiper toggleScrollLock={this.toggleScrollLock} />

        <DayAhead />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tripFeedContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  tripFeedScrollView: {
    flex: 1,
    backgroundColor: "white"
  },
  wrapper: {
    marginHorizontal: 24
  }
});

export default TripFeed;
