import React, { Component, Fragment } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Keyboard,
  Platform
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import constants from "../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";
import PropTypes from "prop-types";
import SimpleButton from "../SimpleButton/SimpleButton";
import * as Animatable from "react-native-animatable";
import SlidingUpPanel from "rn-sliding-up-panel";
import SlidingPanel from "./Components/SlidingPanel/SlidingPanel";
import { inject, observer } from "mobx-react/custom";
import _ from "lodash";

@inject("feedbackPrompt")
@observer
class FooterFeedbackPrompt extends Component {
  _panelRef = React.createRef();
  _footerRef = React.createRef();
  _titleIllustrationRef = React.createRef();
  _keyboardDidShowListener;
  _keyboardDidHideListener;

  state = {
    isFeedbackPositive: true,
    positiveUserFeedback: {},
    negativeUserFeedback: {},
    isKeyboardVisibleiOS: false,
    keyboardSpace: 0,
    focusedOption: ""
  };

  focusOption = identifier => this.setState({ focusedOption: identifier });

  blurOption = () => this.setState({ focusedOption: "" });

  unselectOption = identifier => {
    if (this.state.isFeedbackPositive) {
      const positiveUserFeedback = { ...this.state.positiveUserFeedback };
      delete positiveUserFeedback[identifier];
      this.setState({ positiveUserFeedback });
    } else {
      const negativeUserFeedback = { ...this.state.negativeUserFeedback };
      delete negativeUserFeedback[identifier];
      this.setState({ negativeUserFeedback });
    }
  };

  showFooter = () => {
    return this._footerRef.current.bounceInUp();
  };

  hideFooter = () => {
    return this._footerRef.current.bounceOutDown();
  };

  openSlidingPanel = () => {
    this._panelRef.current.show();
  };

  rotateIllustration = ({ isReverse = false } = {}) => {
    if (!isReverse) {
      return this._titleIllustrationRef.current.transitionTo({
        rotate: "180deg"
      });
    } else {
      return this._titleIllustrationRef.current.transitionTo({
        rotate: "0deg"
      });
    }
  };

  positiveAction = () => {
    this.hideFooter().then(endState => {
      this.setState({
        isFeedbackPositive: true
      });
      this.openSlidingPanel();
      setTimeout(() => {
        this.rotateIllustration();
      }, 500);
    });
  };

  negativeAction = () => {
    this.hideFooter().then(endState => {
      this.setState({
        isFeedbackPositive: false
      });
      this.openSlidingPanel();
    });
  };

  onPanelClosed = () => {
    this.rotateIllustration({ isReverse: true });
    this.blurOption();
    this.showFooter();
  };

  updateUserFeedback = (identifier, text) => {
    if (this.state.isFeedbackPositive) {
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
    if (Platform.OS === "ios") {
      this._keyboardDidShowListener = Keyboard.addListener(
        "keyboardWillChangeFrame",
        this.keyboardWillChangeFrame
      );
      this._keyboardDidHideListener = Keyboard.addListener(
        "keyboardWillHide",
        this.keyboardWillHide
      );
    }
  }

  keyboardWillChangeFrame = e => {
    this.setState({
      isKeyboardVisibleiOS: true,
      keyboardSpace: e.endCoordinates.height
    });
  };

  keyboardWillHide = () => {
    this.setState({
      isKeyboardVisibleiOS: false,
      keyboardSpace: 0
    });
  };

  componentWillUnmount() {
    this._keyboardDidShowListener && this._keyboardDidShowListener.remove();
    this._keyboardDidHideListener && this._keyboardDidHideListener.remove();
  }

  render() {
    const {
      feedbackOptions,
      isFeedbackFooterVisible
    } = this.props.feedbackPrompt;
    if (!isFeedbackFooterVisible) return null;
    if (_.isEmpty(feedbackOptions)) return null;
    const currentDate = new Date();
    const currentMillis = currentDate.getTime();
    if (feedbackOptions.endTime < currentMillis) return null;
    const prompt = feedbackOptions.title;
    const positiveItems = feedbackOptions.items.length
      ? feedbackOptions.items[0]
      : [];
    const negativeItems = feedbackOptions.items.length
      ? feedbackOptions.items[1]
      : [];
    return (
      <Fragment>
        <Animatable.View
          ref={this._footerRef}
          animation={"bounceInUp"}
          duration={1500}
          style={styles.footerFeedbackPrompt}
        >
          <Text style={styles.promptText}>{prompt}</Text>
          <View style={styles.promptActionBar}>
            {feedbackOptions.items.length
              ? feedbackOptions.items.map((item, itemIndex) => {
                  const isPositive = itemIndex % 2 === 0;
                  return (
                    <SimpleButton
                      key={itemIndex}
                      text={item.title}
                      action={
                        isPositive ? this.positiveAction : this.negativeAction
                      }
                      textColor={"white"}
                      hasBorder={false}
                      icon={
                        isPositive
                          ? constants.thumbsUpIcon
                          : constants.thumbsDownIcon
                      }
                      textStyle={{
                        ...constants.fontCustom(constants.primarySemiBold, 13)
                      }}
                      iconSize={13}
                      underlayColor={
                        isPositive
                          ? constants.firstColorAlpha(0.8)
                          : "rgba(0,0,0,0.20)"
                      }
                      containerStyle={{
                        backgroundColor: isPositive
                          ? constants.firstColor
                          : "rgba(0,0,0,0.33)",
                        marginHorizontal: 4,
                        height: 32,
                        width: 64,
                        borderRadius: 32
                      }}
                    />
                  );
                })
              : null}
          </View>
        </Animatable.View>
        <SlidingPanel
          titleIllustrationRef={this._titleIllustrationRef}
          onClose={this.onPanelClosed}
          panelRef={this._panelRef}
          isFeedbackPositive={this.state.isFeedbackPositive}
          items={this.state.isFeedbackPositive ? positiveItems : negativeItems}
          userFeedback={
            this.state.isFeedbackPositive
              ? this.state.positiveUserFeedback
              : this.state.negativeUserFeedback
          }
          isKeyboardVisible={this.state.isKeyboardVisibleiOS}
          keyboardHeight={this.state.keyboardSpace}
          updateUserFeedback={this.updateUserFeedback}
          focusOption={this.focusOption}
          blurOption={this.blurOption}
          focusedOption={this.state.focusedOption}
          unselectOption={this.unselectOption}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  footerFeedbackPrompt: {
    position: "absolute",
    height: 48,
    left: 24,
    bottom: 48 + (isIphoneX() ? constants.xSensorAreaHeight + 4 : 0),
    borderRadius: 4,
    width: responsiveWidth(100) - 48,
    backgroundColor: constants.secondColor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  promptText: {
    ...constants.fontCustom(constants.primaryRegular, 16),
    color: constants.black1,
    marginTop: 3,
    marginLeft: 8
  },
  promptActionBar: {
    flexDirection: "row"
  }
});

export default FooterFeedbackPrompt;
