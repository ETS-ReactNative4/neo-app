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
import TripHighlights from "./Components/TripHighlights/TripHighlights";
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
    const tripData = [
      {
        title: "Chennai",
        icon: "FLIGHT",
        period: "May 14-15",
        action: () => {},
        image:
          "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
      },
      {
        title: "Barcelona",
        icon: "FLIGHT",
        period: "May 17-18",
        action: () => {},
        image:
          "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
      },
      {
        title: "Sevilla",
        icon: "CAR",
        period: "May 17",
        action: () => {},
        image:
          "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
      },
      {
        title: "Sevilla",
        icon: "TRAIN",
        period: "May 17",
        action: () => {},
        image:
          "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
      },
      {
        title: "Sevilla",
        icon: "FERRY",
        period: "May 18",
        action: () => {},
        image:
          "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
      },
      {
        title: "Sevilla",
        icon: "BUS",
        period: "May19",
        action: () => {},
        image:
          "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
      }
    ];

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
        {/* <SearchPlaceholder */}
        {/*action={() => null}*/}
        {/*containerStyle={{ marginHorizontal: 24 }}*/}
        {/*/>*/}
        {/* <View style={styles.vacationNameWrapper}>
          <Text style={styles.vacationName}>{"Vacation Name"}</Text>
        </View> */}
        <WidgetTitle
          title="Anand’s Vacation to Europe"
          containerStyle={styles.wrapper}
        />
        <Notify data={notifyData} />
        <WidgetTitle
          title="30 days to go..."
          containerStyle={styles.wrapper}
          titleStyle={{
            fontSize: 17,
            fontWeight: "300"
          }}
        />
        <TripView data={tripData} containerStyle={{ marginTop: 0 }} />
        <TripViewLite data={tripData} />
        <ToolTip
          title="All aboard?"
          text="Invite your buddies. Everyone invited gets access to the vouchers and itinerary."
          buttonText="Invite Contacts"
          containerStyle={{
            marginHorizontal: 24
          }}
        />

        <TripHighlights title={"TRIP HIGHLIGHTS"} data={tripData} />
        <ToolTip
          title="Travel adaper needed!"
          text="In Europe, you will need one to power your electronic items."
          buttonText="Buy one"
          imageSrc={constants.infoBoxIllus}
          buttonStyle={{
            width: 75
          }}
          containerStyle={{
            marginHorizontal: 24,
            marginTop: 16
          }}
        />

        <ReminderCard data={reminderData} />

        <ToolTip
          imageFirst
          title="Have you done Web Check in?"
          text="Escape long queues and spend more time lounging at the airport. Do a web checkin."
          imageSrc={constants.infoBoxIllus}
          options={[
            {
              title: "Etihad A234",
              text: "Mar 23, Thu",
              action: () => null
            },
            {
              title: "Etihad A234",
              text: "Mar 23, Thu",
              action: () => null
            },
            {
              title: "Yep, all done!",
              action: () => null
            }
          ]}
          containerStyle={{
            marginHorizontal: 24
          }}
        />

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

        <ToolTip
          imageFirst
          title="Size doesn't matter"
          text="Mona Lisa is that it isn’t as big as everyone thinks, It is just a little bit larger than an A2 piece of paper."
          containerStyle={{
            marginHorizontal: 24
          }}
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
