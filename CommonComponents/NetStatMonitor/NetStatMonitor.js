import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Platform,
  NetInfo,
  Animated,
  LayoutAnimation
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../constants/constants";
import Icon from "../Icon/Icon";

class NetStatMonitor extends Component {
  state = {
    isConnected: true,
    showText: false,
    opacity: new Animated.Value(0.3)
  };

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ isConnected }, () => {
        this.textTimer();
      });
    });

    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );

    this.animateBlink();
  }

  animateBlink = () => {
    Animated.sequence([
      Animated.timing(this.state.opacity, {
        duration: 1500,
        toValue: 0.5
      }),
      Animated.timing(this.state.opacity, {
        duration: 1500,
        toValue: 0.3
      })
    ]).start(() => {
      this.animateBlink();
    });
  };

  handleFirstConnectivityChange = isConnected => {
    this.setState({ isConnected }, () => {
      this.textTimer();
    });
  };

  textTimer = () => {
    if (!this.state.isConnected) {
      this.setState(
        {
          showText: true
        },
        () => {
          setTimeout(() => {
            this.setState({
              showText: false
            });
          }, 3000);
        }
      );
    }
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
  }

  render() {
    console.log("rendering!");

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (this.state.isConnected) return null;

    const backgroundColor = this.state.opacity.interpolate({
      inputRange: [0.3, 0.35, 0.4, 0.45, 0.5],
      outputRange: [
        "rgba(255,0,0,0.3)",
        "rgba(255,0,0,0.35)",
        "rgba(255,0,0,0.4)",
        "rgba(255,0,0,0.45)",
        "rgba(255,0,0,0.5)"
      ]
    });

    return (
      <Animated.View style={[styles.netStatContainer, { backgroundColor }]}>
        <Icon
          name={constants.noInternetIcon}
          size={16}
          color={constants.black1}
        />
        {this.state.showText ? (
          <Text style={styles.noInternetText}>{"No Internet!"}</Text>
        ) : null}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  netStatContainer: {
    position: "absolute",
    height: 24,
    backgroundColor: "rgba(255,0,0,0.3)",
    top: 44 + (isIphoneX() ? constants.xNotchHeight : 0),
    right: 0,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 8,
    paddingRight: 8
  },
  noInternetText: {
    ...constants.fontCustom(constants.primaryLight, 12),
    marginLeft: 8,
    ...Platform.select({
      ios: {
        marginTop: 6
      },
      android: {
        marginTop: 2
      }
    }),
    color: constants.black1
  }
});

export default NetStatMonitor;
