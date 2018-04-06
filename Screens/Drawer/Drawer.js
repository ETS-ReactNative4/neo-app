import React, {
  Component,
} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import constants from '../../constants/constants';
import LoginButton from "./Components/LoginButton";
import DrawerButton from "./Components/DrawerButton";
import NotificationCount from "./Components/NotificationCount";

class Drawer extends Component {

  state = {
    activeIndex: 0,
  };

  clickDrawerItem = (index, screen) => {
    this.setState({
      activeIndex: index,
    }, () => {
      this.props.navigation.navigate('DrawerClose')
    });
  };

  render() {
    const menuItems = [
      {
        icon: constants.notificationIcon,
        text: 'Home',
        isActive: false,
        screen: 'Home',
      },
      {
        icon: constants.notificationIcon,
        text: 'Notifications',
        isActive: true,
        info: <NotificationCount count={3}/>,
        screen: 'Home',
      },
      {
        icon: constants.notificationIcon,
        text: 'Payments',
        isActive: false,
        screen: 'Home',
      },
      {
        icon: constants.notificationIcon,
        text: 'Saved Itineraries',
        isActive: false,
        screen: 'Home',
      },
      {
        icon: constants.notificationIcon,
        text: 'Your Bookings',
        isActive: false,
        screen: 'Home',
      },
      {
        icon: constants.notificationIcon,
        text: 'Your Account',
        isActive: false,
        screen: 'Home',
      },
      {
        icon: constants.notificationIcon,
        text: 'Support',
        isActive: false,
        screen: 'Home',
      },
      {
        icon: constants.notificationIcon,
        text: 'About',
        isActive: false,
        screen: 'Home',
      },
    ];

    return(
      <ScrollView style={styles.drawerContainer}>

        <Image
          style={styles.profileImage}
          source={{uri: 'https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png'}}
        />
        <Text style={styles.userName}>Hi Anand!</Text>

        <LoginButton
          text={'Login'}
          action={() => {}}
        />

        {
          menuItems.map((item, index) => {
            return (
              <DrawerButton
                key={index}
                icon={item.icon}
                text={item.text}
                action={() => this.clickDrawerItem(index, item.screen)}
                isActive={(index === this.state.activeIndex)}
                info={item.info || null}
              />
            );
          })
        }

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: constants.drawerBackgroundColor,
  },
  profileImage: {
    marginTop: 35,
    marginBottom: 5,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 32,
    height: 64,
    width: 64,
  },
  userName: {
    alignSelf: 'center',
    fontFamily: constants.primaryRegular,
    fontWeight: "600",
    lineHeight: 32,
    fontSize: 20,
    color: constants.black1,
  }
});

export default Drawer;
