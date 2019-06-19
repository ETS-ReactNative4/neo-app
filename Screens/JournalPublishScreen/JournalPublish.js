import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  Easing,
  Text
} from "react-native";
import LottieView from "lottie-react-native";
import constants from "../../constants/constants";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import DottedLoading from "../../CommonComponents/DottedLoading/DottedLoading";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";

class JournalPublish extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    publishingAnimationTiming: new Animated.Value(0),
    publishEndAnimationTiming: new Animated.Value(0),
    isPublished: false
  };

  loopLoading() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.publishingAnimationTiming, {
          toValue: 1,
          duration: 1500,
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
            displayLoading: false,
            displayLoadEnd: true
          },
          () => {
            this.loopEnd();
          }
        );
      }
    });
  }

  loopEnd() {
    Animated.timing(this.state.publishEndAnimationTiming, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => {
      console.log("Done!");
    });
  }

  componentDidMount() {
    this.loopLoading();

    // setTimeout(() => {
    //   this.setState({
    //     isPublished: true,
    //   });
    // }, 15000);
  }

  render() {
    const {
      publishingAnimationTiming,
      publishEndAnimationTiming,
      isPublished
    } = this.state;

    return (
      <SafeAreaView style={styles.journalPublishContainer}>
        <View style={styles.journalPublishBackground}>
          {!isPublished ? (
            <View style={styles.loadingAnimationContainer}>
              <LottieView
                style={styles.loadingAnimation}
                source={constants.journalPublishingLoop}
                progress={publishingAnimationTiming}
              />
            </View>
          ) : null}
          {isPublished ? (
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
            <LottieView
              source={constants.journalPublishingLoop}
              progress={publishingAnimationTiming}
            />
          </View>
          {isPublished ? (
            <Text>{"Published"}</Text>
          ) : (
            <DottedLoading
              text={"Publishing"}
              numOfDots={3}
              textStyle={styles.infoText}
              animationSpeed={1000}
            />
          )}
        </View>
        <View style={styles.cardContainer} />
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
          action={() => null}
          text={"See My Journal"}
          icon={constants.arrowRight}
          iconSize={12}
          rightIcon={true}
          textColor={"white"}
        />
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
    height: 20,
    width: 20,
    marginLeft: -16,
    marginRight: 16
  },
  infoText: {
    textAlign: "left",
    height: 12,
    width: 75,
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
