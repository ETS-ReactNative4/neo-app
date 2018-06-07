import React, { Component } from "react";
import { View, ScrollView, StyleSheet, Image, Text } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../constants/constants";
import LoginButton from "./Components/LoginButton";
import DrawerButton from "./Components/DrawerButton";
import NotificationCount from "../../CommonComponents/NotificationCount/NotificationCount";
import logOut from "../../Services/logOut/logOut";

class Drawer extends Component {
  clickDrawerItem = (index, screen) => {
    this.props.navigation.navigate(screen);
  };

  render() {
    const menuItems = [
      {
        icon: constants.notificationIcon,
        text: "Home"
      },
      {
        icon: constants.notificationIcon,
        text: "Notifications",
        info: <NotificationCount count={3} />
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
        text: "Support"
      },
      {
        icon: constants.notificationIcon,
        text: "About"
      },
      {
        icon: constants.notificationIcon,
        text: "Log Out",
        action: () => logOut(this.props.navigation)
      }
    ];

    return (
      <ScrollView style={styles.drawerContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={{
              uri:
                "https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png"
            }}
          />
        </View>
        <Text style={styles.userName}>Hi Anand!</Text>

        <LoginButton text={"Login"} action={() => {}} />

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
    );
  }
}

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: constants.drawerBackgroundColor
  },
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
    color: constants.black1
  }
});

export default Drawer;
