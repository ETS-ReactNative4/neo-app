import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import constants from "../../constants/constants";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import Icon from "../../CommonComponents/Icon/Icon";
import HamburgerButton from "../../CommonComponents/HamburgerButton/HamburgerButton";
import DeviceInfo from "react-native-device-info";
import openCustomTab from "../../Services/openCustomTab/openCustomTab";
import storeService from "../../Services/storeService/storeService";
import { recordEvent } from "../../Services/analytics/analyticsService";
import { CONSTANT_drawerEvents } from "../../constants/appEvents";

const appVersionText =
  constants.aboutUsText.versionText + DeviceInfo.getVersion();
const data = [
  {
    icon: constants.rocketIcon,
    text: "About us",
    action: () => {
      openCustomTab(`${constants.productUrl}${constants.aboutUs}`);
    }
  },
  {
    icon: constants.exceptionIcon,
    text: "Terms & conditions",
    action: () => {
      openCustomTab(`${constants.productUrl}${constants.termsAndConditions}`);
    }
  },
  {
    icon: constants.privacyIcon,
    text: "Privacy Policy",
    action: () => {
      openCustomTab(`${constants.productUrl}${constants.privacyPolicy}`);
    }
  },
  {
    icon: constants.cancellationIcon,
    text: "Cancellation Policy",
    action: () => {
      openCustomTab(`${constants.productUrl}${constants.cancellationPolicy}`);
    }
  },
  {
    icon: constants.careersIcon,
    text: "Careers at Pickyourtrail",
    action: () => {
      openCustomTab(`${constants.productUrl}${constants.careers}`);
    }
  }
];

const Row = ({ data, i }) => {
  return (
    <TouchableOpacity
      style={{
        borderColor: constants.shade4,
        borderBottomWidth: 1,
        borderTopWidth: !i ? 1 : 0
      }}
      onPress={data.action}
    >
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Icon name={data.icon} size={24} color={constants.black2} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>{data.text}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Icon name="arrow-right" size={17} color={constants.shade2} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

@ErrorBoundary({ isRoot: true })
class About extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader
          LeftButton={
            <HamburgerButton
              action={() => {
                storeService.appState.onDrawerOpen();
                recordEvent(CONSTANT_drawerEvents.event, {
                  click: CONSTANT_drawerEvents.click.openDrawer
                });
                navigation.openDrawer();
              }}
            />
          }
          title={constants.aboutUsText.title}
          navigation={navigation}
        />
      )
    };
  };

  render() {
    return (
      <View style={styles.aboutContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={constants.pytLogoNew}
            resizeMode={"contain"}
            style={styles.logo}
          />
        </View>
        <Text style={styles.contentStyle}>{constants.aboutUsText.content}</Text>
        <View style={styles.appVersionContainer}>
          <Text style={styles.appVersionText}>{appVersionText}</Text>
        </View>
        {data.map((item, i) => (
          <Row key={item.text} i={i} data={item} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  aboutContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 24
  },
  logoContainer: {
    alignItems: "center",
    paddingVertical: 24
  },
  logo: {
    height: 62,
    width: 200
  },
  contentStyle: {
    ...constants.fontCustom(constants.primaryLight, 15),
    color: constants.shade1,
    textAlign: "center"
  },
  appVersionContainer: {
    alignItems: "center",
    paddingVertical: 24
  },
  appVersionText: {
    ...constants.fontCustom(constants.primarySemiBold, 15),
    color: constants.black1
  },
  row: {
    flexDirection: "row",
    paddingVertical: 12
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  textStyle: {
    ...constants.fontCustom(constants.primaryRegular, 17, 20),
    color: constants.black2
  },
  arrowContainer: {
    position: "absolute",
    right: 4,
    marginTop: 16
  }
});

export default About;
