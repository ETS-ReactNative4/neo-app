import React, { Component, Fragment } from "react";
import { View, StyleSheet, Text } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";
import SimpleButton from "../SimpleButton/SimpleButton";
import * as Animatable from "react-native-animatable";
import { inject, observer } from "mobx-react/custom";
import _ from "lodash";
import navigationService from "../../Services/navigationService/navigationService";

@inject("feedbackPrompt")
@observer
class FooterFeedbackPrompt extends Component {
  positiveAction = () => {
    const {
      setPositiveFeedbackMode,
      animateFeedbackOptions,
      feedbackOptions,
      feedbackPanelOpened
    } = this.props.feedbackPrompt;
    feedbackPanelOpened();
    animateFeedbackOptions();
    setPositiveFeedbackMode();
    navigationService.navigation._navigation.navigate("FeedbackPrompt", {
      identifier: feedbackOptions.identifier
    });
  };

  negativeAction = () => {
    const {
      setNegativeFeedbackMode,
      animateFeedbackOptions,
      feedbackOptions,
      feedbackPanelOpened
    } = this.props.feedbackPrompt;
    feedbackPanelOpened();
    animateFeedbackOptions();
    setNegativeFeedbackMode();
    navigationService.navigation._navigation.navigate("FeedbackPrompt", {
      identifier: feedbackOptions.identifier
    });
  };

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
    return (
      <Fragment>
        <Animatable.View
          animation={"bounceInUp"}
          duration={1500}
          style={styles.footerFeedbackPrompt}
          useNativeDriver={true}
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
