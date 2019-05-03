import React, { Component, Fragment } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
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

@inject("feedbackPrompt")
@observer
class FooterFeedbackPrompt extends Component {
  _panelRef = React.createRef();

  render() {
    const {
      feedbackData,
      positiveAction = () => this._panelRef.current.hide(),
      negativeAction = () => this._panelRef.current.show()
    } = this.props.feedbackPrompt;
    const prompt = feedbackData.title;
    return (
      <Fragment>
        <Animatable.View
          animation={"bounceInUp"}
          style={styles.footerFeedbackPrompt}
        >
          <Text style={styles.promptText}>{prompt}</Text>
          <View style={styles.promptActionBar}>
            <SimpleButton
              text={"Yey"}
              action={positiveAction}
              textColor={"white"}
              hasBorder={false}
              icon={constants.thumbsUpIcon}
              textStyle={{
                ...constants.fontCustom(constants.primarySemiBold, 13)
              }}
              iconSize={13}
              underlayColor={constants.firstColorAlpha(0.8)}
              containerStyle={{
                backgroundColor: constants.firstColor,
                marginHorizontal: 4,
                height: 32,
                width: 64,
                borderRadius: 32
              }}
            />
            <SimpleButton
              text={"Meh"}
              action={negativeAction}
              textColor={"white"}
              hasBorder={false}
              icon={constants.thumbsDownIcon}
              textStyle={{
                ...constants.fontCustom(constants.primarySemiBold, 13)
              }}
              iconSize={13}
              underlayColor={"rgba(0,0,0,0.20)"}
              containerStyle={{
                backgroundColor: "rgba(0,0,0,0.33)",
                marginLeft: 4,
                marginRight: 8,
                height: 32,
                width: 64,
                borderRadius: 32
              }}
            />
          </View>
        </Animatable.View>
        <SlidingPanel panelRef={this._panelRef} />
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
