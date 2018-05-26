import React, { Component } from "react";
import { TouchableHighlight, Image, BackHandler, Platform } from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import { StackActions, NavigationActions } from "react-navigation";
import { inject, observer } from "mobx-react/custom";

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Itineraries" })]
});

@inject("appState")
@observer
class CloseYourBookingsButton extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.onBackButtonPressAndroid
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.onBackButtonPressAndroid
    );
  }

  onBackButtonPressAndroid = () => {
    this.goBack();
    return true;
  };

  goBack = () => {
    const { activeScenes } = this.props.appState;
    const previousScene = activeScenes[activeScenes.length - 2];
    if (previousScene.route.routeName === "MobileNumber") {
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
        <Image
          resizeMode={"contain"}
          source={constants.closeIcon}
          style={{ height: 24, width: 30 }}
        />
      </TouchableHighlight>
    );
  }
}

export default CloseYourBookingsButton;
