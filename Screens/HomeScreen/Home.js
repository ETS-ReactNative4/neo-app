import React, { Component } from "react";
import { View, BackHandler, Platform, StyleSheet } from "react-native";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";
import ControlledWebView from "../../CommonComponents/ControlledWebView/ControlledWebView";
import constants from "../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import BackButtonIos from "../../CommonComponents/BackButtonIos/BackButtonIos";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import NoInternetIndicator from "../../CommonComponents/NoInternetIndicator/NoInternetIndicator";
import CustomScrollView from "../../CommonComponents/CustomScrollView/CustomScrollView";
import pullToRefresh from "../../Services/refresh/pullToRefresh";
import { inject, observer } from "mobx-react/custom";

@ErrorBoundary({ isRoot: true })
@inject("packagesStore")
@observer
class Home extends Component {
  static navigationOptions = HomeHeader;

  state = {
    canGoBack: false,
    injectedJavascript: ""
  };
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        BackHandler.addEventListener("hardwareBackPress", this.goBack);
      }
    );
  }

  goBack = () => {
    const { navigation } = this.props;
    if (navigation.isFocused()) {
      BackHandler.exitApp();
    } else {
      return false;
    }
  };

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () => {
        BackHandler.removeEventListener("hardwareBackPress", this.goBack);
      }
    );
    const { getPackages } = this.props.packagesStore;
    getPackages();
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  render() {
    const { packages, getPackages, isLoading } = this.props.packagesStore;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white"
        }}
      >
        <NoInternetIndicator />
        <CustomScrollView
          style={styles.homeScrollContainer}
          showsVerticalScrollIndicator={true}
          refreshing={isLoading}
          onRefresh={getPackages}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeScrollContainer: {
    flex: 1
  }
});

export default Home;
