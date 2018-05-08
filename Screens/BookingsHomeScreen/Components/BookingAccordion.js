import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import constants from "../../../constants/constants";
import NotificationCount from "../../../CommonComponents/NotificationCount/NotificationCount";

class BookingAccordion extends Component {
  state = {
    sections: [
      {
        duration: "Mar 15 - Mar 17, Barcelona",
        name: "Hotel Royal Arcade",
        header: "Hotels"
      },
      {
        duration: "Mar 15 - Mar 17, Barcelona",
        name: "Hotel Royal Arcade",
        header: "Hotels"
      },
      {
        duration: "Mar 15 - Mar 17, Barcelona",
        name: "Hotel Royal Arcade",
        header: "Hotels"
      }
    ]
  };

  _renderHeader = (section, index, isActive, sections) => {
    const customStyle = {};

    if (isActive) customStyle.borderBottomWidth = 0;

    return (
      <View style={[styles.headerContainer, customStyle]}>
        <Image
          source={constants.notificationIcon}
          resizeMode={"contain"}
          style={styles.headerIcon}
        />
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>{section.header}</Text>
        </View>
        <View style={styles.notificationWrapper}>
          {!isActive ? (
            <NotificationCount
              count={5}
              containerStyle={{
                backgroundColor: constants.secondColor,
                height: 16,
                width: 20,
                borderRadius: 8
              }}
            />
          ) : (
            <Image
              source={constants.dropDownArrow}
              resizeMode={"contain"}
              style={styles.accordionDownArrow}
            />
          )}
        </View>
      </View>
    );
  };

  _renderContent = (section, index, isActive, sections) => {
    const customStyle = {};

    return (
      <View style={[styles.contentContainer, customStyle]}>
        <View style={styles.iconWrapper}>
          <Image
            resizeMode={"cover"}
            style={styles.contentIcon}
            source={constants.splashBackground}
          />
        </View>
        <View style={styles.contentTextContainer}>
          <View style={styles.contentHeaderWrapper}>
            <Text style={styles.contentHeader}>{section.duration}</Text>
          </View>
          <View style={styles.contentTextWrapper}>
            <Text style={styles.contentText}>{section.name}</Text>
          </View>
        </View>
        <View style={styles.rightPlaceholder}>
          <Text style={styles.rightPlaceholderText}>Stayed</Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <Accordion
        sections={this.state.sections}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        underlayColor={constants.shade5}
      />
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: constants.shade4
  },
  headerIcon: {
    height: 20,
    width: 20,
    marginRight: 8
  },
  headerTextWrapper: {
    height: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    fontFamily: constants.primarySemiBold,
    fontSize: 20,
    lineHeight: 20,
    color: constants.black1
  },
  notificationWrapper: {
    flex: 1,
    alignItems: "flex-end"
  },
  accordionDownArrow: {
    height: 17,
    width: 17
  },

  contentContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: constants.shade4,
    flexDirection: "row",
    alignItems: "center"
  },
  iconWrapper: {
    overflow: "hidden",
    height: 40,
    width: 40,
    borderRadius: 20
  },
  contentIcon: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  contentTextContainer: {
    height: 40,
    marginLeft: 16
  },
  contentHeaderWrapper: {
    height: 16,
    justifyContent: "center"
  },
  contentHeader: {
    fontFamily: constants.primaryLight,
    fontSize: 14,
    lineHeight: 14,
    color: constants.shade2
  },
  contentTextWrapper: {
    height: 24,
    justifyContent: "center"
  },
  contentText: {
    fontFamily: constants.primaryLight,
    fontSize: 17
  },
  rightPlaceholder: {
    flex: 1,
    alignItems: "flex-end"
  },
  rightPlaceholderText: {
    fontFamily: constants.primaryLight,
    fontSize: 10,
    color: constants.black2
  }
});

export default BookingAccordion;
