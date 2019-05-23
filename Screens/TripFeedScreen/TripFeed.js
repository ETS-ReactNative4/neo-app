import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, BackHandler } from "react-native";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import ToolTip from "./Components/ToolTip/ToolTip";
import TripViewLite from "./Components/TripViewLite/TripViewLite";
import TripView from "./Components/TripView/TripView";
import TripFeedCarousel from "./Components/TripFeedCarousel/TripFeedCarousel";
import BigImageCard from "./Components/BigImageCard/BigImageCard";
import AlertCard from "./Components/AlertCard/AlertCard";
import InfoCard from "./Components/InfoCard/InfoCard";
import { inject, observer } from "mobx-react/custom";
import CustomScrollView from "../../CommonComponents/CustomScrollView/CustomScrollView";
import InfoCardModal from "./Components/InfoCardModal/InfoCardModal";
import NoInternetIndicator from "../../CommonComponents/NoInternetIndicator/NoInternetIndicator";
import FeedBackSwiper from "./Components/FeedBackSwiper/FeedBackSwiper";
import FeedBackPositiveExplosion from "./Components/FeedBackSwiper/Components/FeedBackPositiveExplosion";
import DayAhead from "./Components/DayAhead/DayAhead";
import DayAheadLite from "./Components/DayAheadLite/DayAheadLite";
import FeedbackPanelOverlay from "./Components/FeedbackPanelOverlay";

@ErrorBoundary({ isRoot: true })
@inject("tripFeedStore")
@inject("feedbackPrompt")
@observer
class TripFeed extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    scrollEnabled: true,
    tripFeedHeader: null
  };
  _didFocusSubscription;
  _willBlurSubscription;
  _emitterComponent = React.createRef();

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        this.loadTripFeedData();
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
    if (!status) {
      setTimeout(() => {
        this.setState({
          scrollEnabled: true
        });
      }, 1000);
    }
    this.setState({
      scrollEnabled: status
    });
  };

  componentDidMount() {
    this.loadTripFeedData();
    this.setState({
      tripFeedHeader: HomeHeader({ navigation: this.props.navigation }).header
    });

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
    const { fetchFeedBackData } = this.props.feedbackPrompt;
    generateTripFeed();
    setTimeout(() => {
      fetchFeedBackData();
    }, 2000);
  };

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  setEmitterComponent = emitterComponent =>
    (this._emitterComponent = emitterComponent);

  render() {
    const {
      isLoading,
      widgets,
      infoCardModal,
      closeInfoCardModal
    } = this.props.tripFeedStore;
    const { isFeedbackPanelVisible } = this.props.feedbackPrompt;
    let isImageFirst = false;
    return (
      <View style={styles.tripFeedContainer}>
        {this.state.tripFeedHeader}
        <NoInternetIndicator />
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
                      widgetName={widget.widgetName}
                      imageFirst={isImageFirst}
                    />
                  );
                case "INFO_CARD":
                  return (
                    <InfoCard
                      key={widgetIndex}
                      {...widget.data}
                      widgetName={widget.widgetName}
                    />
                  );
                case "CAROUSEL":
                  return (
                    <TripFeedCarousel
                      key={widgetIndex}
                      {...widget.data}
                      widgetName={widget.widgetName}
                    />
                  );
                case "TRIP_VIEW":
                  return (
                    <TripView
                      key={widgetIndex}
                      {...widget.data}
                      widgetName={widget.widgetName}
                    />
                  );
                case "TRIP_VIEW_LITE":
                  return (
                    <TripViewLite
                      key={widgetIndex}
                      {...widget.data}
                      widgetName={widget.widgetName}
                    />
                  );
                case "BIG_IMAGE_CARD":
                  return (
                    <BigImageCard
                      key={widgetIndex}
                      {...widget.data}
                      widgetName={widget.widgetName}
                    />
                  );
                case "ALERT_CARD":
                  return (
                    <AlertCard
                      key={widgetIndex}
                      {...widget.data}
                      toggleScrollLock={this.toggleScrollLock}
                      widgetName={widget.widgetName}
                    />
                  );
                case "FEEDBACK_SWIPER":
                  return (
                    <FeedBackSwiper
                      emitterComponent={this._emitterComponent}
                      toggleScrollLock={this.toggleScrollLock}
                      key={widgetIndex}
                      {...widget.data}
                      widgetName={widget.widgetName}
                    />
                  );
                case "DAY_AHEAD":
                  return (
                    <DayAhead
                      key={widgetIndex}
                      {...widget.data}
                      widgetName={widget.widgetName}
                    />
                  );
                case "DAY_AHEAD_LITE":
                  return (
                    <DayAheadLite
                      key={widgetIndex}
                      {...widget.data}
                      widgetName={widget.widgetName}
                    />
                  );
                default:
                  return null;
              }
            } catch (e) {
              // logError(e);
              return null;
            }
          })}
          <InfoCardModal
            isVisible={infoCardModal.isVisible}
            onClose={closeInfoCardModal}
            {...infoCardModal.modalData}
          />
        </CustomScrollView>
        <FeedBackPositiveExplosion
          emitterRef={this.setEmitterComponent}
          emitterComponent={this._emitterComponent}
        />
        {isFeedbackPanelVisible ? <FeedbackPanelOverlay /> : null}
      </View>
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
