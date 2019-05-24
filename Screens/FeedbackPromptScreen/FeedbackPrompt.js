import React, { Component, Fragment } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  Platform,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  LayoutAnimation,
  BackHandler
} from "react-native";
import { inject, observer } from "mobx-react/custom";
import _ from "lodash";
import PanelLogoContainer from "./Components/PanelLogoContainer";
import FeedbackOption from "./Components/FeedbackOption";
import constants from "../../constants/constants";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";

@ErrorBoundary()
@inject("feedbackPrompt")
@observer
class FeedbackPrompt extends Component {
  static navigationOptions = {
    header: null,
    gestureResponseDistance: {
      vertical: responsiveHeight(50)
    }
  };

  _titleIllustrationRef = React.createRef();
  _didFocusSubscription;
  _willBlurSubscription;
  _keyboardDidShowListener;
  _keyboardDidHideListener;

  state = {
    positiveUserFeedback: {},
    negativeUserFeedback: {},
    isKeyboardVisible: false,
    keyboardSpace: 0,
    focusedOption: ""
  };

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        this._keyboardDidShowListener = Keyboard.addListener(
          Platform.OS === "ios" ? "keyboardWillChangeFrame" : "keyboardDidShow",
          this.keyboardWillShow
        );
        this._keyboardDidHideListener = Keyboard.addListener(
          Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
          this.keyboardWillHide
        );
        BackHandler.addEventListener("hardwareBackPress", this.goBack);
      }
    );
  }

  focusOption = identifier => this.setState({ focusedOption: identifier });

  blurOption = () => this.setState({ focusedOption: "" });

  unselectOption = identifier => {
    const { isFeedbackPositive } = this.props.feedbackPrompt;
    if (isFeedbackPositive) {
      const positiveUserFeedback = { ...this.state.positiveUserFeedback };
      delete positiveUserFeedback[identifier];
      this.setState({ positiveUserFeedback });
    } else {
      const negativeUserFeedback = { ...this.state.negativeUserFeedback };
      delete negativeUserFeedback[identifier];
      this.setState({ negativeUserFeedback });
    }
  };

  rotateIllustration = ({ isReverse = false } = {}) => {
    if (!isReverse) {
      this._titleIllustrationRef.current.transitionTo({
        rotate: "180deg"
      });
    } else {
      this._titleIllustrationRef.current.transitionTo({
        rotate: "0deg"
      });
    }
  };

  onPanelClosed = () => {
    const {
      isFeedbackPositive,
      feedbackPanelClosed
    } = this.props.feedbackPrompt;
    feedbackPanelClosed();
    const userFeedback = isFeedbackPositive
      ? this.state.positiveUserFeedback
      : this.state.negativeUserFeedback;
    if (!_.isEmpty(userFeedback)) {
      this.submitFeedback();
    }
    this.props.navigation.goBack();
  };

  updateUserFeedback = (identifier, text) => {
    const { isFeedbackPositive } = this.props.feedbackPrompt;
    if (isFeedbackPositive) {
      const positiveUserFeedback = { ...this.state.positiveUserFeedback };
      positiveUserFeedback[identifier] = text;
      this.setState({ positiveUserFeedback });
    } else {
      const negativeUserFeedback = { ...this.state.negativeUserFeedback };
      negativeUserFeedback[identifier] = text;
      this.setState({ negativeUserFeedback });
    }
  };

  componentDidMount() {
    const { isFeedbackPositive } = this.props.feedbackPrompt;
    if (isFeedbackPositive) {
      this.rotateIllustration();
    }
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () => {
        this._keyboardDidShowListener && this._keyboardDidShowListener.remove();
        this._keyboardDidHideListener && this._keyboardDidHideListener.remove();
        BackHandler.removeEventListener("hardwareBackPress", this.goBack);
      }
    );
  }

  keyboardWillShow = e => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      isKeyboardVisible: true,
      keyboardSpace: e.endCoordinates.height
    });
  };

  keyboardWillHide = () => {
    this.blurOption();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      isKeyboardVisible: false,
      keyboardSpace: 0
    });
  };

  componentWillUnmount() {
    const {
      resetAnimationFeedback,
      feedbackPanelClosed
    } = this.props.feedbackPrompt;
    resetAnimationFeedback();
    this.onPanelClosed();
    feedbackPanelClosed();
    this._keyboardDidShowListener && this._keyboardDidShowListener.remove();
    this._keyboardDidHideListener && this._keyboardDidHideListener.remove();
    BackHandler.removeEventListener("hardwareBackPress", this.goBack);
  }

  clickSubmit = () => {
    const { feedbackPanelClosed } = this.props.feedbackPrompt;
    this.submitFeedback();
    feedbackPanelClosed();
    this.props.navigation.goBack();
  };

  submitFeedback = () => {
    const {
      feedbackOptions,
      submitFeedback,
      isFeedbackPositive
    } = this.props.feedbackPrompt;
    const positiveItems = feedbackOptions.items.length
      ? feedbackOptions.items[0]
      : {};
    const negativeItems = feedbackOptions.items.length
      ? feedbackOptions.items[1]
      : {};

    const requestObject = {
      itineraryId: feedbackOptions.itineraryId,
      identifier: feedbackOptions.identifier,
      reviews: isFeedbackPositive
        ? this.state.positiveUserFeedback
        : this.state.negativeUserFeedback,
      responseType: isFeedbackPositive
        ? positiveItems.title
        : negativeItems.title
    };
    const submitApiURL = feedbackOptions.url;
    submitFeedback(requestObject, submitApiURL);
  };

  goBack = () => {
    this.onPanelClosed();
    return true;
  };

  render() {
    const { focusedOption, keyboardSpace, isKeyboardVisible } = this.state;

    const {
      isFeedbackPositive,
      animatedFeedbackOptions: feedbackOptions
    } = this.props.feedbackPrompt;

    if (_.isEmpty(feedbackOptions)) return null;
    const positiveItems = feedbackOptions.items.length
      ? feedbackOptions.items[0]
      : {};
    const negativeItems = feedbackOptions.items.length
      ? feedbackOptions.items[1]
      : {};
    const items = isFeedbackPositive ? positiveItems : negativeItems;

    const userFeedback = isFeedbackPositive
      ? this.state.positiveUserFeedback
      : this.state.negativeUserFeedback;

    return (
      <Fragment>
        <TouchableWithoutFeedback
          onPress={this.onPanelClosed}
          style={styles.feedbackPromptContainer}
        >
          <View style={styles.feedbackPromptContainer}>
            <View style={styles.backgroundPlaceholder} />
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              style={styles.touchableContainer}
            >
              <View
                style={[
                  styles.slidingContainer,
                  isKeyboardVisible && Platform.OS === constants.platformIos
                    ? { position: "absolute", bottom: keyboardSpace }
                    : {}
                ]}
              >
                <PanelLogoContainer
                  isFeedbackPositive={isFeedbackPositive}
                  titleIllustrationRef={this._titleIllustrationRef}
                />
                <View style={styles.slidingContainerContentSection}>
                  <Text style={styles.slidingContainerTitle}>
                    {items.title}
                  </Text>
                  <Text style={styles.slidingContainerInfo}>
                    {isFeedbackPositive
                      ? feedbackOptions.desc ||
                        "Pick your favourite moments of the day"
                      : feedbackOptions.desc || "Where did we go wrong?"}
                  </Text>
                  {items.options.map((option, optionIndex) => {
                    if (!option.isVisible) {
                      return (
                        <View
                          key={optionIndex}
                          style={styles.optionPlaceholder}
                        />
                      );
                    }
                    if (!focusedOption || focusedOption === option.identifier) {
                      return (
                        <FeedbackOption
                          key={optionIndex}
                          option={option}
                          userFeedback={userFeedback}
                          updateUserFeedback={this.updateUserFeedback}
                          isFocusedOption={focusedOption === option.identifier}
                          focusOption={this.focusOption}
                          blurOption={this.blurOption}
                          unselectOption={this.unselectOption}
                        />
                      );
                    } else {
                      return null;
                    }
                  })}
                  {!_.isEmpty(userFeedback) &&
                  !isKeyboardVisible &&
                  !focusedOption ? (
                    <SimpleButton
                      text={"SUBMIT"}
                      textColor={constants.seventhColor}
                      action={this.clickSubmit}
                      textStyle={{
                        ...constants.fontCustom(constants.primarySemiBold, 17)
                      }}
                      containerStyle={{
                        backgroundColor: "transparent",
                        marginTop: 16,
                        width: responsiveWidth(80)
                      }}
                    />
                  ) : (
                    <View style={styles.buttonPlaceholder} />
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  backgroundPlaceholder: {
    width: responsiveWidth(100),
    height: responsiveHeight(50),
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white"
  },
  feedbackPromptContainer: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  touchableContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  slidingContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  slidingContainerTitle: {
    ...constants.fontCustom(constants.primarySemiBold, 50),
    marginTop: 16,
    color: constants.black1
  },
  slidingContainerInfo: {
    ...constants.fontCustom(constants.primaryRegular, 15),
    marginTop: 16,
    color: constants.shade1,
    marginBottom: 8
  },
  slidingContainerContentSection: {
    backgroundColor: "white",
    width: responsiveWidth(100),
    alignItems: "center",
    justifyContent: "center"
  },
  optionPlaceholder: {
    height: 48,
    marginVertical: 4,
    width: responsiveWidth(100) - 48,
    alignSelf: "center",
    backgroundColor: "transparent"
  },
  buttonPlaceholder: {
    height: 40,
    marginTop: 16,
    width: 96,
    backgroundColor: "transparent"
  }
});

export default FeedbackPrompt;
