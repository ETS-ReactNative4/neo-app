import React, { Component, Fragment } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  Platform,
  StatusBar
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../constants/constants";
import DrawerButton from "./Components/DrawerButton";
import logOut from "../../Services/logOut/logOut";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import { inject, observer } from "mobx-react/custom";
import _ from "lodash";
import * as Keychain from "react-native-keychain";
import DialogBox from "../../CommonComponents/DialogBox/DialogBox";
import { shouldIncludeStoryBook } from "../../storybook/Storybook";
import { recordEvent } from "../../Services/analytics/analyticsService";
import LinearGradient from "react-native-linear-gradient";

@inject("userStore")
@inject("infoStore")
@observer
class Drawer extends Component {
  clickDrawerItem = (index, screen) => {
    this.props.navigation.navigate(screen);
  };

  state = {
    isLoggedIn: false
  };

  componentDidMount() {
    this.checkLogin();
  }

  componentDidUpdate() {
    this.checkLogin();
  }

  checkLogin = () => {
    Keychain.getGenericPassword().then(credentials => {
      if (credentials && credentials.password) {
        if (!this.state.isLoggedIn) {
          this.setState({
            isLoggedIn: true
          });
        }
      } else {
        if (this.state.isLoggedIn) {
          this.setState({
            isLoggedIn: false
          });
        }
      }
    });
  };

  render() {
    const menuItems = [
      {
        icon: constants.homeIcon,
        text: "Home"
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
        text: "About"
      }
    ];

    if (shouldIncludeStoryBook()) {
      menuItems.push({
        icon: constants.activityIcon,
        text: "StoryBook"
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
          recordEvent(constants.userLoggedOutEvent);
          logOut();
        }
      });
    }

    return (
      <Fragment>
        <View
          // useAngle={true}
          // angle={180}
          // angleCenter={{ x: 0.5, y: 0.5 }}
          // locations={[0, 0.5, 0.75]}
          // colors={constants.drawerBackgroundColor}
          style={{ flex: 1, backgroundColor: constants.drawerBackgroundColor }}
        >
          <ScrollView style={styles.drawerContainer}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View style={styles.profileImageContainer}>
              <Image
                style={styles.profileImage}
                source={{
                  uri:
                    "https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png"
                }}
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
                action={() => navigation.navigate("MobileNumber")}
                textColor={"white"}
                hasBorder={true}
                color={"transparent"}
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
                  color: constants.shade1,
                  fontSize: 10,
                  marginTop: -2,
                  marginLeft: 0
                }}
              />
            ) : (
              <View style={{ height: 24 }} />
            )}

            {menuItems.map((item, index) => {
              const defaultAction = () =>
                this.clickDrawerItem(index, item.text);

              return (
                <DrawerButton
                  key={index}
                  icon={item.icon}
                  text={item.text}
                  action={item.action || defaultAction}
                  isActive={item.text === this.props.activeItemKey}
                  info={item.info || null}
                />
              );
            })}
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
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  profileImageContainer: {
    overflow: "hidden",
    marginTop: isIphoneX ? 70 : 35,
    marginBottom: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 32,
    height: 64,
    width: 64
  },
  profileImage: {
    borderRadius: 32,
    height: 64,
    width: 64
  },
  userName: {
    alignSelf: "center",
    fontFamily: constants.primaryRegular,
    fontWeight: "600",
    lineHeight: 32,
    fontSize: 20,
    color: "white"
  }
});

export default Drawer;
