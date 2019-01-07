import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, BackHandler } from "react-native";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";
import constants from "../../constants/constants";
import DayAhead from "./Components/DayAhead/DayAhead";
import FeedBackSwiper from "./Components/FeedBackSwiper/FeedBackSwiper";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import ToolTip from "./Components/ToolTip/ToolTip";
import TripViewLite from "./Components/TripViewLite/TripViewLite";
import TripView from "./Components/TripView/TripView";
import TripFeedCarousel from "./Components/TripFeedCarousel/TripFeedCarousel";
import BigImageCard from "./Components/BigImageCard/BigImageCard";
import Icon from "../../CommonComponents/Icon/Icon";
import WidgetTitle from "./Components/WidgetTitle/WidgetTitle";
import Notify from "./Components/Notify/Notify";
import InfoBox from "./Components/InfoBox/InfoBox";
import { inject, observer } from "mobx-react/custom";
import _ from "lodash";
import CustomScrollView from "../../CommonComponents/CustomScrollView/CustomScrollView";

@ErrorBoundary({ isRoot: true })
@inject("tripFeedStore")
@observer
class TripFeed extends Component {
  static navigationOptions = HomeHeader;

  state = {
    scrollEnabled: true
  };
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        BackHandler.addEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        );
      }
    );
  }

  onBackButtonPressAndroid = () => {
    const { navigation } = this.props;
    if (navigation.isFocused()) {
      BackHandler.exitApp();
    } else {
      return false;
    }
  };

  toggleScrollLock = status => {
    this.setState({
      scrollEnabled: status
    });
  };

  componentDidMount() {
    this.loadTripFeedData();

    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () => {
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        );
      }
    );
  }

  loadTripFeedData = () => {
    const { generateTripFeed } = this.props.tripFeedStore;
    generateTripFeed();
  };

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

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
    const { isLoading, widgets } = this.props.tripFeedStore;
    let isImageFirst = false;
    return (
      <CustomScrollView
        onRefresh={this.loadTripFeedData}
        refreshing={isLoading}
        directionalLockEnabled={true}
        scrollEnabled={this.state.scrollEnabled}
        style={styles.tripFeedScrollView}
      >
        {widgets.map((widget, widgetIndex) => {
          isImageFirst = !isImageFirst;
          switch (widget.type) {
            case "TOOL_TIP":
              return <ToolTip {...widget.data} imageFirst={isImageFirst} />;
            default:
              return null;
          }
        })}

        <Notify data={notifyData} />

        <BigImageCard
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
          icon={constants.starActive}
          iconText={234}
          gradients={[constants.darkGradientAlpha]}
        />
        <FeedBackSwiper toggleScrollLock={this.toggleScrollLock} />

        <DayAhead />
      </CustomScrollView>
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
