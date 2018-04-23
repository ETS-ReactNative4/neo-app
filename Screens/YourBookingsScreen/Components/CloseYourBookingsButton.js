import React, { Component } from "react";
import { TouchableHighlight, Image, BackHandler, Platform } from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import { NavigationActions } from "react-navigation";

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Itineraries" })]
});

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
    this.props.navigation.dispatch(resetAction);
    return true;
  };

  render() {
    return (
      <TouchableHighlight
        style={{ paddingHorizontal: 16 }}
        onPress={() => {
          this.props.navigation.dispatch(resetAction);
        }}
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
