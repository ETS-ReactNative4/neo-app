import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Platform,
  Animated,
  Easing
} from "react-native";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import { inject, observer } from "mobx-react";
import { recordEvent } from "../../Services/analytics/analyticsService";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import openCustomTab from "../../Services/openCustomTab/openCustomTab";
import { responsiveWidth } from "react-native-responsive-dimensions";
import StarterAnimation from "./Components/StarterAnimation";
import BootAnimation from "./Components/BootAnimation";
import AppState from "../../mobx/AppState";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppNavigatorParamsType } from "../../NavigatorsV2/AppNavigator";
import {
  SCREEN_STARTER,
  SCREEN_APP_LOGIN,
  SCREEN_SAVED_ITINERARIES,
  SCREEN_TRAVEL_PROFILE_WELCOME
} from "../../NavigatorsV2/ScreenNames";
import { isIphoneX } from "react-native-iphone-x-helper";
import { CONSTANT_xSensorAreaHeight } from "../../constants/styles";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryLight
} from "../../constants/fonts";
import {
  CONSTANT_firstColor,
  CONSTANT_firstColorAlpha,
  CONSTANT_shade2,
  CONSTANT_shade1
} from "../../constants/colorPallete";
import TranslucentStatusBar from "../../CommonComponents/TranslucentStatusBar/TranslucentStatusBar";
import {
  CONSTANT_platformIos,
  CONSTANT_termsAndConditions,
  CONSTANT_privacyPolicy
} from "../../constants/stringConstants";
import { CONSTANT_pytLogoBlack } from "../../constants/imageAssets";
import { CONSTANT_starterScreenText } from "../../constants/appText";
import { CONSTANT_StarterScreen } from "../../constants/appEvents";
import { CONSTANT_productUrl } from "../../constants/serverUrls";
import isPreTripWelcomePending from "../../Services/appLauncher/launchCheckpoints/isPreTripWelcomePending";
import resetToWelcomeFlow from "../../Services/resetToWelcomeFlow/resetToWelcomeFlow";
import { navigationDispatcher } from "../../Services/navigationService/navigationServiceV2";
import launchPretripHome from "../../Services/launchPretripHome/launchPretripHome";
import isPreTripWelcomeCompleted from "../../Services/appLauncher/launchCheckpoints/isPreTripWelcomeCompleted";

const bootAnimationTiming = 350;

type screenName = typeof SCREEN_STARTER;

export type StarterScreenNavigationProp = StackNavigationProp<
  AppNavigatorParamsType,
  screenName
>;

export interface StarterState {
  displayStarterAnimation: boolean;
  displayStarterOptions: boolean;
  bootAnimationOpacity: number;
  bootSplashAnimationProgress: Animated.Value;
}

export interface StarterProps {
  appState: AppState;
  navigation: StarterScreenNavigationProp;
}

@ErrorBoundary({ isRoot: true })
@inject("appState")
@observer
class Starter extends Component<StarterProps, StarterState> {
  static navigationOptions = {
    header: null
  };
  _splashAnimationRef = React.createRef();

  state = {
    displayStarterAnimation: false,
    displayStarterOptions: false,
    bootAnimationOpacity: 0,
    bootSplashAnimationProgress: new Animated.Value(0)
  };

  clickedBooking = () => {
    this.props.navigation.navigate(SCREEN_APP_LOGIN);
  };

  clickedPlan = () => {
    isPreTripWelcomeCompleted().then(isWelcomeComplete => {
      if (isWelcomeComplete) {
        navigationDispatcher(launchPretripHome());
      } else {
        isPreTripWelcomePending().then(isWelcomePending => {
          if (isWelcomePending) {
            resetToWelcomeFlow().then(resetAction => {
              navigationDispatcher(resetAction);
            });
          } else {
            this.props.navigation.navigate(SCREEN_TRAVEL_PROFILE_WELCOME);
          }
        });
      }
    });
  };

  clickedSavedItineraries = () => {
    this.props.navigation.navigate(SCREEN_APP_LOGIN, {
      resetTarget: SCREEN_SAVED_ITINERARIES
    });
  };

  componentDidMount() {
    /**
     * TODO: The animation time in iOS is high to wait for the boot animation to complete.
     * Lottie animation and layout animation are having a lag when they both happen simultaneously...
     */
    if (Platform.OS === CONSTANT_platformIos) {
      this.animateiOS();
    } else {
      this.animateAndroid();
    }
  }

  animateAndroid = () => {
    this.setState(
      {
        bootAnimationOpacity: 1
      },
      () => {
        Animated.timing(this.state.bootSplashAnimationProgress, {
          toValue: 1,
          duration: bootAnimationTiming,
          easing: Easing.linear,
          useNativeDriver: true
        }).start(() => {
          this.setState({
            bootAnimationOpacity: 0
          });
        });
        const animationTime = 220;
        setTimeout(() => {
          this.setState({
            displayStarterAnimation: true,
            displayStarterOptions: true
          });
        }, animationTime);
      }
    );
  };

  animateiOS = () => {
    this.setState(
      {
        bootAnimationOpacity: 1
      },
      () => {
        Animated.timing(this.state.bootSplashAnimationProgress, {
          toValue: 0.9,
          duration: bootAnimationTiming,
          easing: Easing.linear,
          useNativeDriver: true
        }).start(() => {
          this.setState(
            {
              bootAnimationOpacity: 0
            },
            () => {
              setTimeout(() => {
                this.setState({
                  displayStarterAnimation: true,
                  displayStarterOptions: true
                });
              }, 100);
            }
          );
        });
      }
    );
  };

  render() {
    const {
      displayStarterAnimation,
      displayStarterOptions,
      bootAnimationOpacity
    } = this.state;

    const findBookingButtonStyle = { width: 220, height: 48 };

    const exploreButtonStyle = {
      width: 220,
      height: 48,
      marginVertical: 16
    };

    return (
      <Fragment>
        <TranslucentStatusBar />
        {displayStarterAnimation ? <StarterAnimation /> : null}
        <BootAnimation
          animationProgress={this.state.bootSplashAnimationProgress}
          splashAnimationRef={this._splashAnimationRef}
          opacity={bootAnimationOpacity}
        />
        {displayStarterOptions ? (
          <SafeAreaView style={styles.container}>
            <View style={styles.contentSection}>
              <View style={styles.logoRow}>
                <Image
                  source={CONSTANT_pytLogoBlack}
                  style={styles.logo}
                  resizeMode={"contain"}
                />
              </View>
              <View style={styles.buttonRow}>
                <SimpleButton
                  text={CONSTANT_starterScreenText.exploreButton}
                  textColor={`white`}
                  textStyle={{
                    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 18)
                  }}
                  color={CONSTANT_firstColor}
                  underlayColor={CONSTANT_firstColorAlpha(0.7)}
                  action={() => {
                    recordEvent(CONSTANT_StarterScreen.event, {
                      click: CONSTANT_StarterScreen.click.planVacation
                    });
                    this.clickedPlan();
                    return null;
                  }}
                  containerStyle={findBookingButtonStyle}
                />
                <SimpleButton
                  text={CONSTANT_starterScreenText.mainButton}
                  textColor={CONSTANT_shade2}
                  textStyle={{
                    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 18)
                  }}
                  color={`white`}
                  hasBorder={true}
                  action={() => {
                    this.clickedBooking();
                    recordEvent(CONSTANT_StarterScreen.event, {
                      click: CONSTANT_StarterScreen.click.findBooking
                    });
                    return null;
                  }}
                  containerStyle={exploreButtonStyle}
                />
              </View>
              <View style={styles.linkRow}>
                <Text style={styles.infoText}>
                  {`or, check your  `}
                  <Text
                    style={styles.infoLink}
                    onPress={this.clickedSavedItineraries}
                  >
                    {`Saved Itineraries`}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.tncWrapper}>
              <Text style={styles.tncText}>
                {`By using Pickyourtrail app you agree to our `}
                <Text
                  style={styles.tncLink}
                  onPress={() => {
                    openCustomTab(
                      `${CONSTANT_productUrl}${CONSTANT_termsAndConditions}`
                    );
                    recordEvent(CONSTANT_StarterScreen.event, {
                      click: CONSTANT_StarterScreen.click.termsAndConditions
                    });
                  }}
                >
                  {`Terms and Conditions`}
                </Text>
                {` and all your data will be protected by our `}
                <Text
                  style={styles.tncLink}
                  onPress={() => {
                    openCustomTab(
                      `${CONSTANT_productUrl}${CONSTANT_privacyPolicy}`
                    );
                    recordEvent(CONSTANT_StarterScreen.event, {
                      click: CONSTANT_StarterScreen.click.privacyPolicy
                    });
                  }}
                >
                  {`Privacy Policy`}
                </Text>
              </Text>
            </View>
          </SafeAreaView>
        ) : null}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },
  contentSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  logoRow: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },
  logo: {
    height: 62,
    width: 200
  },
  buttonRow: {
    width: responsiveWidth(100),
    alignItems: "center",
    justifyContent: "center"
  },
  linkRow: {},
  infoText: {
    ...CONSTANT_fontCustom(CONSTANT_primaryLight, 13),
    color: CONSTANT_shade1,
    textAlignVertical: "center"
  },
  infoLink: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14),
    textDecorationLine: "underline",
    textAlignVertical: "center",
    color: CONSTANT_firstColor
  },
  hyperlink: {
    textDecorationLine: "underline"
  },
  tncWrapper: {
    position: "absolute",
    marginHorizontal: 48,
    marginTop: 16,
    bottom: 24 + (isIphoneX() ? CONSTANT_xSensorAreaHeight : 0),
    borderRadius: 4
  },
  tncText: {
    ...CONSTANT_fontCustom(CONSTANT_primaryLight, 10, 16),
    color: CONSTANT_shade1,
    textAlign: "center",
    padding: 8
  },
  tncLink: {
    fontFamily: CONSTANT_primarySemiBold,
    textDecorationLine: "underline"
  }
});

export default Starter;
