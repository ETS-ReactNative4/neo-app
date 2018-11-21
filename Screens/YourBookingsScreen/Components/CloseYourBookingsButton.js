import React, { Component } from "react";
import { TouchableHighlight, Image, BackHandler, Platform } from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import { StackActions, NavigationActions } from "react-navigation";
import { inject, observer } from "mobx-react/custom";
import Icon from "../../../CommonComponents/Icon/Icon";

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "AppHome" })]
});

@inject("appState")
@observer
class CloseYourBookingsButton extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
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

  componentDidMount() {
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

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  onBackButtonPressAndroid = () => {
    this.goBack();
    return true;
  };

  goBack = () => {
    const { activeScenes } = this.props.appState;
    const previousScene = activeScenes[activeScenes.length - 2];
    if (!previousScene) {
      this.props.appState.setTripMode(false);
      this.props.navigation.dispatch(resetAction);
    } else if (previousScene.route.routeName === "MobileNumber") {
      // might not need this check
      this.props.appState.setTripMode(false);
      this.props.navigation.dispatch(resetAction);
    } else {
      this.props.navigation.goBack();
    }
  };

  render() {
    return (
      <TouchableHighlight
        style={{ paddingHorizontal: 16 }}
        onPress={this.goBack}
        underlayColor={"transparent"}
      >
        <Icon color={constants.black1} name={constants.closeIcon} size={24} />
      </TouchableHighlight>
    );
  }
}

export default CloseYourBookingsButton;
