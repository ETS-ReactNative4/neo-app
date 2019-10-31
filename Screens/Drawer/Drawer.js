import React, { Component, Fragment } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  Linking,
  StatusBar
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../constants/constants";
import DrawerButton from "./Components/DrawerButton";
import logOut from "../../Services/logOut/logOut";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import { inject, observer } from "mobx-react/custom";
import _ from "lodash";
import DialogBox from "../../CommonComponents/DialogBox/DialogBox";
import { shouldIncludeStoryBook } from "../../storybook/Storybook";
import { recordEvent } from "../../Services/analytics/analyticsService";
import isUserLoggedInCallback from "../../Services/isUserLoggedInCallback/isUserLoggedInCallback";
import appLauncher from "../../Services/appLauncher/appLauncher";
import {
  getInitialNotification,
  onNotificationDisplayed,
  onNotificationOpened,
  onNotificationReceived
} from "../../Services/fcmService/fcm";
import { logError } from "../../Services/errorLogger/errorLogger";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import getUrlParams from "../../Services/getUrlParams/getUrlParams";
import resolveLinks from "../../Services/resolveLinks/resolveLinks";
import ratioCalculator from "../../Services/ratioCalculator/ratioCalculator";
import debouncer from "../../Services/debouncer/debouncer";
import RNBootSplash from "react-native-bootsplash";
import { CONSTANT_drawerEvents } from "../../constants/appEvents";

let _onNotificationReceived, _onNotificationDisplayed, _onNotificationOpened;

@inject("userStore")
@inject("infoStore")
@inject("appState")
@observer
class Drawer extends Component {
  static launchApp = () => {
    // clear notification listeners if active
    _onNotificationReceived && _onNotificationReceived();
    _onNotificationDisplayed && _onNotificationDisplayed();
    _onNotificationOpened && _onNotificationOpened();

    debouncer(() => {
      appLauncher()
        .then(() => {
          /**
           * App launch complete so hide the bootsplash
           */
          RNBootSplash.hide();
          /**
           * Subscribe to push notification events once app is launched
           */
          getInitialNotification();
          _onNotificationDisplayed = onNotificationDisplayed();
          _onNotificationReceived = onNotificationReceived();
          _onNotificationOpened = onNotificationOpened();
        })
        .catch(error => {
          /**
           * App launch failed but hide the bootsplash to move to fallback screen
           */
          RNBootSplash.hide();
          logError(error);
        });
    });
  };

  clickDrawerItem = (index, screen) => {
    this.props.navigation.navigate(screen);
  };

  state = {
    isLoggedIn: false
  };
  componentDidMount() {
    this.checkLogin();
    Drawer.launchApp();
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          this._handleOpenURL({ url });
        }
      })
      .catch(err => logError("An error occurred with deep linking", { err }));
    Linking.addEventListener("url", this._handleOpenURL);
  }

  componentWillUnmount() {
    _onNotificationReceived && _onNotificationReceived();
    _onNotificationDisplayed && _onNotificationDisplayed();
    _onNotificationOpened && _onNotificationOpened();
    Linking.removeEventListener("url", this._handleOpenURL);
  }

  componentDidUpdate() {
    this.checkLogin();
  }

  /**
   * Handles the deep linking URLs that opens the app
   * - Currently supported prefix pyt://
   */
  _handleOpenURL = event => {
    /**
     * Only DeepLink if the user is logged into the app
     */
    isUserLoggedInCallback(() => {
      try {
        const { url } = event;
        const params = getUrlParams(url);
        const link = url.split(/["://","?"]+/)[1];
        if (params.type === constants.voucherLinkType) {
          resolveLinks(false, false, {
            voucherType: link,
            costingIdentifier: params.costingIdentifier
          });
        } else {
          resolveLinks(link, params);
        }
      } catch (e) {
        logError("Invalid Deeplink url", { event, e });
      }
    });
  };

  checkLogin = () => {
    isUserLoggedInCallback(
      () => {
        if (!this.state.isLoggedIn) {
          this.setState({
            isLoggedIn: true
          });
        }
      },
      () => {
        if (this.state.isLoggedIn) {
          this.setState({
            isLoggedIn: false
          });
        }
      }
    );
  };

  /**
   * TODO: `getDerivedStateFromProps` prevents mobX from updating DOM elements
   * Issue Reference - https://github.com/reactjs/reactjs.org/issues/978
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { onDrawerOpen, onDrawerClose } = this.props.appState;

    if (nextProps.navigation.state.isDrawerOpen) {
      onDrawerOpen();
    } else {
      onDrawerClose();
    }
  }

  render() {
    const menuItems = [
      {
        icon: constants.homeIcon,
        text: "Home",
        action: index => {
          recordEvent(CONSTANT_drawerEvents.event, {
            click: CONSTANT_drawerEvents.click.home
          });
          this.clickDrawerItem(index, "Home");
        }
      },
      // {
      //   icon: constants.notificationIcon,
      //   text: "Notifications",
      //   info: (
      //     <NotificationCount
      //       containerStyle={{
      //         backgroundColor: "white"
      //       }}
      //       textStyle={{
      //         color: "rgba(88,96,150,1)",
      //         ...Platform.select({
      //           ios: {
      //             marginTop: 5
      //           },
      //           android: {
      //             marginTop: -2
      //           }
      //         })
      //       }}
      //       count={3}
      //     />
      //   )
      // },
      // {
      //   icon: constants.notificationIcon,
      //   text: "Saved Itineraries"
      // },
      // {
      //   icon: constants.notificationIcon,
      //   text: "Your Bookings"
      // },
      // {
      //   icon: constants.notificationIcon,
      //   text: "Your Account"
      // },
      // {
      //   icon: constants.notificationIcon,
      //   text: "Support",
      //   action: () => this.props.navigation.navigate("AppSupport")
      // },
      {
        icon: constants.infoIcon,
        text: "About",
        action: index => {
          recordEvent(CONSTANT_drawerEvents.event, {
            click: CONSTANT_drawerEvents.click.about
          });
          this.clickDrawerItem(index, "About");
        }
      }
    ];

    if (shouldIncludeStoryBook()) {
      menuItems.push({
        icon: constants.storybookIcon,
        text: "StoryBook",
        action: index => {
          recordEvent(CONSTANT_drawerEvents.event, {
            click: CONSTANT_drawerEvents.click.storyBook
          });
          this.clickDrawerItem(index, "StoryBook");
        }
      });
    }

    const { infoStore, navigation } = this.props;
    const { userDetails } = this.props.userStore;
    const { name } = userDetails;
    const firstName = name ? name.split(" ")[0] : "";

    if (this.state.isLoggedIn) {
      menuItems.splice(1, 0, {
        icon: constants.paymentIcon,
        text: "Payments"
      });

      menuItems.push({
        icon: constants.logoutIcon,
        text: "Log Out",
        action: () => {
          recordEvent(CONSTANT_drawerEvents.event, {
            click: CONSTANT_drawerEvents.click.logout
          });
          recordEvent(constants.userLoggedOutEvent);
          logOut();
        }
      });
    }

    return (
      <View style={{ flex: 1 }} overflow="hidden">
        <Image
          resizeMode={"cover"}
          source={constants.drawerBackgroundImage}
          style={styles.drawerBackgroundImage}
        />
        <View
          // Following gradient config might be needed in the future
          // useAngle={true}
          // angle={180}
          // angleCenter={{ x: 0.5, y: 0.5 }}
          // locations={[0, 0.5, 0.75]}
          // colors={constants.drawerBackgroundColor}
          style={{ flex: 1 }}
        >
          <ScrollView style={styles.drawerContainer}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View style={styles.profileImageContainer}>
              <Image
                resizeMode={"contain"}
                style={styles.profileImage}
                source={constants.defaultUserIcon}
              />
            </View>
            {!_.isEmpty(userDetails) ? (
              <Text style={styles.userName}>{`Hi ${
                firstName
                  ? firstName.charAt(0).toUpperCase() +
                    firstName.substr(1).toLowerCase()
                  : ""
              }!`}</Text>
            ) : null}

            {!this.state.isLoggedIn ? (
              <SimpleButton
                text={"Login"}
                action={() => {
                  recordEvent(CONSTANT_drawerEvents.event, {
                    click: CONSTANT_drawerEvents.click.login
                  });
                  navigation.navigate("MobileNumber");
                }}
                textColor={"white"}
                hasBorder={true}
                color={constants.firstColor}
                containerStyle={{
                  alignSelf: "center",
                  width: 64,
                  height: 24,
                  borderRadius: 17,
                  marginBottom: 19,
                  marginTop: 16
                }}
                textStyle={{
                  fontFamily: constants.primaryRegular,
                  fontWeight: "600",
                  fontSize: 10,
                  marginTop: -2,
                  marginLeft: 0
                }}
              />
            ) : (
              <View style={{ height: 24 }} />
            )}

            <View style={styles.buttonsContainer}>
              {menuItems.map((item, index) => {
                const defaultAction = () =>
                  this.clickDrawerItem(index, item.text);

                return (
                  <DrawerButton
                    key={index}
                    icon={item.icon}
                    text={item.text}
                    action={
                      item.action ? () => item.action(index) : defaultAction
                    }
                    isActive={item.text === this.props.activeItemKey}
                    info={item.info || null}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
        <DialogBox
          {...infoStore.info}
          onClose={() => {
            infoStore.info.action && infoStore.info.action();
            infoStore.resetInfo();
          }}
        />
        <DialogBox
          {...infoStore.error}
          onClose={() => {
            infoStore.error.action && infoStore.error.action();
            infoStore.resetError();
          }}
        />
        <DialogBox
          {...infoStore.success}
          onClose={() => {
            infoStore.success.action && infoStore.success.action();
            infoStore.resetSuccess();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profileImageContainer: {
    overflow: "hidden",
    marginTop: 75,
    marginBottom: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 28,
    height: 56,
    width: 56,
    borderWidth: 5,
    borderColor: constants.thirteenthColor
  },
  profileImage: {
    borderRadius: 28,
    height: 56,
    width: 56
  },
  userName: {
    alignSelf: "center",
    ...constants.fontCustom(constants.primaryRegular, 17),
    color: constants.black1,
    marginTop: 16
  },
  drawerBackgroundImage: {
    position: "absolute",
    left: 0,
    top: 0,
    height: responsiveHeight(100),
    width: ratioCalculator(128, 75, responsiveHeight(100)) // The background width is calculated to match the aspect ratio of the image used
  },
  buttonsContainer: {
    marginTop: 56,
    borderTopWidth: 2,
    borderTopColor: constants.shade6
  }
});

export default Drawer;
