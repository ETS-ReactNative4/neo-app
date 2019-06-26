import React, { Fragment, Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  Easing,
  Text,
  LayoutAnimation
} from "react-native";
import LottieView from "lottie-react-native";
import constants from "../../constants/constants";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import DottedLoading from "../../CommonComponents/DottedLoading/DottedLoading";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { inject, observer } from "mobx-react/custom";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import Journal from "../JournalScreen/Journal";
import JournalSummary from "./Components/JournalSummary";
import { StackActions, NavigationActions } from "react-navigation";
import Share from "react-native-share";
import { share, singleShare } from "../../Services/shareService/share";
import openCustomTab from "../../Services/openCustomTab/openCustomTab";

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "JournalHome" })]
});

@ErrorBoundary()
@inject("journalStore")
@observer
class JournalPublish extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    publishingAnimationTiming: new Animated.Value(0),
    publishEndAnimationTiming: new Animated.Value(0),
    publishSuccessAnimationTiming: new Animated.Value(0),
    isPublished: false,
    isLoopEnded: false
  };
  _waitForImageQueue;

  loopLoading() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.publishingAnimationTiming, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ]),
      {
        iterations: 1
      }
    ).start(() => {
      if (!this.state.isPublished) {
        this.setState(
          {
            publishingAnimationTiming: new Animated.Value(0)
          },
          () => {
            this.loopLoading();
          }
        );
      } else {
        this.setState(
          {
            isLoopEnded: true
          },
          () => {
            this.loopEnd();
            this.animateSuccess();
          }
        );
      }
    });
  }

  loopEnd = () => {
    Animated.timing(this.state.publishEndAnimationTiming, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  };

  animateSuccess = () => {
    Animated.timing(this.state.publishSuccessAnimationTiming, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  };

  componentDidMount() {
    this.loopLoading();

    this._waitForImageQueue = setInterval(() => {
      const {
        isImageUploadQueueRunning,
        publishJournal
      } = this.props.journalStore;
      if (isImageUploadQueueRunning) {
        return;
      }
      clearInterval(this._waitForImageQueue);
      publishJournal()
        .then(() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          this.setState({
            isPublished: true
          });
        })
        .catch(() => {
          DebouncedAlert(
            constants.journalFailureMessages.title,
            constants.journalFailureMessages.failedToPublishJournal,
            [
              {
                text: "Okay",
                onPress: this.props.navigation.goBack()
              }
            ],
            {
              cancelable: false
            }
          );
        });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this._waitForImageQueue);
  }

  shareFacebook = () => {
    const { journalTitle, journalUrl } = this.props.journalStore;
    const shareOptions = {
      message: journalTitle,
      url: journalUrl,
      social: Share.Social.FACEBOOK
    };
    singleShare(shareOptions);
  };

  shareTwitter = () => {
    const { journalTitle, journalUrl } = this.props.journalStore;
    const shareOptions = {
      message: journalTitle,
      url: journalUrl,
      social: Share.Social.TWITTER
    };
    singleShare(shareOptions);
  };

  share = () => {
    const { journalTitle, journalUrl } = this.props.journalStore;
    const shareOptions = {
      message: `${journalTitle} ${journalUrl}`,
      url: journalUrl
    };
    share(shareOptions);
  };

  viewJournal = () => {
    const { journalUrl } = this.props.journalStore;
    openCustomTab(journalUrl);
  };

  render() {
    const {
      publishingAnimationTiming,
      publishEndAnimationTiming,
      publishSuccessAnimationTiming,
      isPublished,
      isLoopEnded
    } = this.state;
    const { journalTitle, journalCoverImage } = this.props.journalStore;

    return (
      <SafeAreaView style={styles.journalPublishContainer}>
        <View style={styles.journalPublishBackground}>
          {!isLoopEnded ? (
            <View style={styles.loadingAnimationContainer}>
              <LottieView
                style={styles.loadingAnimation}
                source={constants.journalPublishingLoop}
                progress={publishingAnimationTiming}
              />
            </View>
          ) : null}
          {isLoopEnded ? (
            <View style={styles.loadingAnimationContainer}>
              <LottieView
                style={styles.loadingAnimation}
                source={constants.journalPublishEnd}
                progress={publishEndAnimationTiming}
              />
            </View>
          ) : null}
        </View>

        <View style={styles.infoTextContainer}>
          <View style={styles.successAnimationContainer}>
            {isPublished || true ? (
              <LottieView
                style={styles.successAnimation}
                source={constants.journalPublishSuccess}
                progress={publishSuccessAnimationTiming}
              />
            ) : null}
          </View>
          {isPublished ? (
            <Text style={styles.infoText}>{"Published"}</Text>
          ) : (
            <DottedLoading
              text={"Publishing"}
              numOfDots={3}
              textStyle={styles.infoText}
              animationSpeed={1000}
            />
          )}
        </View>
        <View style={styles.cardContainer}>
          <JournalSummary
            title={journalTitle}
            image={{ uri: journalCoverImage }}
            isPublished={isPublished}
            shareAction={this.share}
            facebookAction={this.shareFacebook}
            twitterAction={this.shareTwitter}
          />
        </View>
        {isPublished ? (
          <Fragment>
            <SimpleButton
              containerStyle={{
                borderRadius: 2,
                height: 45,
                width: 170,
                marginTop: 64,
                marginBottom: -64,
                alignSelf: "center"
              }}
              textStyle={{ marginRight: 8 }}
              underlayColor={constants.firstColorAlpha(0.8)}
              action={this.viewJournal}
              text={"See My Journal"}
              icon={constants.arrowRight}
              iconSize={12}
              rightIcon={true}
              textColor={"white"}
            />
            <SimpleButton
              text={"Journal Home"}
              textColor={constants.seventhColor}
              icon={constants.backIcon}
              iconSize={12}
              action={() => this.props.navigation.dispatch(resetAction)}
              color={"transparent"}
              underlayColor={"rgba(255, 255, 255, 0.8)"}
              containerStyle={{
                borderRadius: 2,
                height: 45,
                width: 170,
                marginTop: 72,
                marginBottom: -64,
                alignSelf: "center"
              }}
            />
          </Fragment>
        ) : (
          <Fragment>
            <View
              style={{
                borderRadius: 2,
                height: 45,
                width: 170,
                marginTop: 64,
                marginBottom: -64,
                alignSelf: "center"
              }}
            />
            <View
              style={{
                borderRadius: 2,
                height: 45,
                width: 170,
                marginTop: 72,
                marginBottom: -64,
                alignSelf: "center"
              }}
            />
          </Fragment>
        )}
      </SafeAreaView>
    );
  }
}

const cardHeight = responsiveWidth(100) - 96;
const cardWidth = responsiveWidth(100) - 96;

const styles = StyleSheet.create({
  journalPublishContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  journalPublishBackground: {
    position: "absolute",
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    top: 0,
    left: 0
  },
  infoTextContainer: {
    marginTop: -64,
    marginBottom: 64,
    flexDirection: "row",
    alignItems: "center"
  },
  successAnimationContainer: {
    marginLeft: -16,
    marginRight: 16
  },
  successAnimation: {
    height: 50,
    width: 50
  },
  infoText: {
    textAlign: "left",
    height: 12,
    width: 75,
    marginLeft: -16,
    marginBottom: 4,
    ...constants.fontCustom(constants.primaryRegular, 12, 12),
    color: constants.shade1
  },
  loadingAnimationContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible"
  },
  loadingAnimation: {
    width: cardWidth,
    height: cardHeight,
    transform: [{ scale: 1.4 }]
  },
  cardContainer: {
    height: cardHeight,
    width: cardWidth,
    backgroundColor: "white",
    ...constants.elevationFive
  }
});

export default JournalPublish;
