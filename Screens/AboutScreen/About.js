import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import constants from "../../constants/constants";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import Icon from "../../CommonComponents/Icon/Icon";
import HamburgerButton from "../../CommonComponents/HamburgerButton/HamburgerButton";
import { version } from "../../package.json";

const appVersionText = constants.aboutUs.versionText + version;
const data = [
  {
    icon: constants.infoIcon,
    text: "About us",
    action: () => {}
  },
  {
    icon: constants.infoIcon,
    text: "Terms & conditions",
    action: () => {}
  },
  {
    icon: constants.infoIcon,
    text: "Privacy Policy",
    action: () => {}
  },
  {
    icon: constants.infoIcon,
    text: "Cancellation Policy",
    action: () => {}
  },
  {
    icon: constants.infoIcon,
    text: "Cookie Policy",
    action: () => {}
  },
  {
    icon: constants.infoIcon,
    text: "Careers at Pickyourtrail",
    action: () => {}
  },
  {
    icon: constants.infoIcon,
    text: "Libraries & Frameworks",
    action: () => {}
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
            <HamburgerButton action={() => navigation.openDrawer()} />
          }
          title={constants.aboutUs.title}
          navigation={navigation}
        />
      )
    };
  };

  render() {
    return (
      <View style={styles.aboutContainer}>
        <View style={styles.logoContainer}>
          <Image source={constants.pytLogoNew} style={{ width: 196 }} />
        </View>
        <Text style={styles.contentStyle}>{constants.aboutUs.content}</Text>
        <View style={styles.appVersionContainer}>
          <Text style={styles.appVersionText}>{appVersionText}</Text>
        </View>
        {data.map((item, i) => <Row key={item.text} i={i} data={item} />)}
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
    fontSize: 17,
    color: constants.black2
  },
  arrowContainer: {
    position: "absolute",
    right: 4,
    marginTop: 16
  }
});

export default About;
