import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  Platform,
  ImageBackground,
  StatusBar
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../constants/constants";
import DrawerButton from "./Components/DrawerButton";
import NotificationCount from "../../CommonComponents/NotificationCount/NotificationCount";
import logOut from "../../Services/logOut/logOut";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import { inject, observer } from "mobx-react/custom";
import _ from "lodash";
import DialogBox from "../../CommonComponents/DialogBox/DialogBox";
import FCM from "react-native-fcm";

@inject("userStore")
@inject("infoStore")
@observer
class Drawer extends Component {
  clickDrawerItem = (index, screen) => {
    this.props.navigation.navigate(screen);
  };

  componentDidMount() {
    FCM.requestPermissions({ badge: true, sound: true, alert: true })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
    FCM.getFCMToken().then(token => {
      console.log("TOKEN (getFCMToken)", token);
      this.setState({ token: token || "" });
    });
    // FCM.getAPNSToken()
    //   .then(token => {
    //     console.log("APNS TOKEN (getFCMToken)", token);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  }

  render() {
    const menuItems = [
      {
        icon: constants.notificationIcon,
        text: "Home"
      },
      {
        icon: constants.notificationIcon,
        text: "Notifications",
        info: (
          <NotificationCount
            containerStyle={{
              backgroundColor: "white"
            }}
            textStyle={{
              color: "rgba(88,96,150,1)",
              ...Platform.select({
                ios: {
                  marginTop: 5
                },
                android: {
                  marginTop: -2
                }
              })
            }}
            count={3}
          />
        )
      },
      {
        icon: constants.notificationIcon,
        text: "Payments"
      },
      {
        icon: constants.notificationIcon,
        text: "Saved Itineraries"
      },
      {
        icon: constants.notificationIcon,
        text: "Your Bookings"
      },
      {
        icon: constants.notificationIcon,
        text: "Your Account"
      },
      {
        icon: constants.notificationIcon,
        text: "Support",
        action: () => this.props.navigation.navigate("AppSupport")
      },
      {
        icon: constants.notificationIcon,
        text: "About"
      },
      {
        icon: constants.notificationIcon,
        text: "Log Out",
        action: () => logOut()
      }
    ];

    const { infoStore } = this.props;
    const { userDetails } = this.props.userStore;
    const { name } = userDetails;
    const firstName = name ? name.split(" ")[0] : "";

    return [
      <ImageBackground
        key={0}
        style={{ flex: 1 }}
        source={constants.drawerBackground}
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
          <Text style={styles.userName}>{`Hi ${
            firstName
              ? firstName.charAt(0).toUpperCase() +
                firstName.substr(1).toLowerCase()
              : ""
          }!`}</Text>

          {_.isEmpty(userDetails) ? (
            <SimpleButton
              text={"Login"}
              action={() => null}
              textColor={"white"}
              hasBorder={true}
              color={"transparent"}
              containerStyle={{
                alignSelf: "center",
                width: 64,
                height: 24,
                borderRadius: 17,
                marginBottom: 19
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
            const defaultAction = () => this.clickDrawerItem(index, item.text);

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
      </ImageBackground>,
      <DialogBox
        {...infoStore.info}
        onClose={() => {
          infoStore.info.action && infoStore.info.action();
          infoStore.resetInfo();
        }}
        key={1}
      />,
      <DialogBox
        {...infoStore.error}
        onClose={() => {
          infoStore.error.action && infoStore.error.action();
          infoStore.resetError();
        }}
        key={2}
      />,
      <DialogBox
        {...infoStore.success}
        onClose={() => {
          infoStore.success.action && infoStore.success.action();
          infoStore.resetSuccess();
        }}
        key={3}
      />
    ];
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
