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
import NotificationCard from "./Components/NotificationCard/NotificationCard";
import InfoCard from "./Components/InfoCard/InfoCard";
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
          try {
            isImageFirst = !isImageFirst;
            switch (widget.type) {
              case "TOOL_TIP":
                return (
                  <ToolTip
                    key={widgetIndex}
                    {...widget.data}
                    imageFirst={isImageFirst}
                  />
                );
              case "INFO_CARD":
                return <InfoCard key={widgetIndex} {...widget.data} />;
              default:
                return null;
            }
          } catch (e) {
            return null;
          }
        })}
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
