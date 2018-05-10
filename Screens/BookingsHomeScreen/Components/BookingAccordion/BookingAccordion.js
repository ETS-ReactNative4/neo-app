import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform
} from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import constants from "../../../../constants/constants";
import NotificationCount from "../../../../CommonComponents/NotificationCount/NotificationCount";
import { inject, observer } from "mobx-react/custom";
import HotelSection from "./Components/HotelSection";
import ActivitiesSection from "./Components/ActivitiesSection";

@inject("itineraries")
@observer
class BookingAccordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: []
    };
  }

  componentDidMount() {
    const sections = [];

    const {
      hotels,
      activities,
      flights,
      transfers,
      trains,
      ferries,
      visa,
      passes,
      rentals
    } = this.props.itineraries;

    if (flights.length) {
      const flightSection = {
        type: "Flights",
        icon: constants.notificationIcon,
        items: flights
      };
      sections.push(flightSection);
    }

    if (hotels.length) {
      const hotelSection = {
        type: "Hotels",
        icon: constants.notificationIcon,
        items: hotels
      };
      sections.push(hotelSection);
    }

    if (transfers.length) {
      const transferSection = {
        type: "Transfers",
        icon: constants.notificationIcon,
        items: transfers
      };
      sections.push(transferSection);
    }

    if (passes.length) {
      const passesSection = {
        type: "Passes",
        icon: constants.notificationIcon,
        items: passes
      };
      sections.push(passesSection);
    }

    if (activities.length) {
      const activitiesSection = {
        type: "Activities",
        icon: constants.notificationIcon,
        items: activities
      };
      sections.push(activitiesSection);
    }

    if (trains.length) {
      const trainsSection = {
        type: "Trains",
        icon: constants.notificationIcon,
        items: trains
      };
      sections.push(trainsSection);
    }

    if (ferries.length) {
      const ferriesSection = {
        type: "Ferries",
        icon: constants.notificationIcon,
        items: ferries
      };
      sections.push(ferriesSection);
    }

    if (visa.length) {
      const visaSection = {
        type: "Visa",
        icon: constants.notificationIcon,
        items: visa
      };
      sections.push(visaSection);
    }

    this.setState({
      sections
    });
  }

  _renderHeader = (section, index, isActive, sections) => {
    const customStyle = {};

    if (isActive) customStyle.borderBottomWidth = 0;

    return (
      <View style={[styles.headerContainer, customStyle]}>
        <Image
          source={section.icon}
          resizeMode={"contain"}
          style={styles.headerIcon}
        />
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>{section.type}</Text>
        </View>
        <View style={styles.notificationWrapper}>
          {!isActive ? (
            <NotificationCount
              count={section.items.length}
              containerStyle={{
                backgroundColor: constants.secondColor,
                height: 16,
                width: 26,
                borderRadius: 8
              }}
              textStyle={{
                color: constants.black2,
                fontSize: 13,
                ...Platform.select({ android: { marginTop: -2 } })
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

    switch (section.type) {
      case "Hotels":
        return <HotelSection section={section} />;

      case "Activities":
        return <ActivitiesSection section={section} />;

      default:
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
                <Text style={styles.contentHeader}>{`17 May - 21 May`}</Text>
              </View>
              <View style={styles.contentTextWrapper}>
                <Text numberOfLines={1} style={styles.contentText}>
                  {section.type}
                </Text>
              </View>
            </View>
            <View style={styles.rightPlaceholder}>
              <Text style={styles.rightPlaceholderText}>Stayed</Text>
            </View>
          </View>
        );
    }
  };

  render() {
    return (
      <View style={{ marginBottom: 24 }}>
        <Accordion
          sections={this.state.sections}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          underlayColor={constants.shade5}
        />
      </View>
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
