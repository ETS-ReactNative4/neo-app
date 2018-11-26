import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import Accordion from "react-native-collapsible/Accordion";
import constants from "../../../../constants/constants";
import NotificationCount from "../../../../CommonComponents/NotificationCount/NotificationCount";
import { inject, observer } from "mobx-react/custom";
import HotelSection from "./Components/HotelSection";
import ActivitiesSection from "./Components/ActivitiesSection";
import TransferSection from "./Components/TransferSection";
import TrainsSection from "./Components/TrainsSection";
import Icon from "../../../../CommonComponents/Icon/Icon";
import FlightsSection from "./Components/FlightsSection";
import PassSection from "./Components/PassSection";
import FerriesSection from "./Components/FerriesSection";
import RentalCarSection from "./Components/RentalCarSection";
import { recordEvent } from "../../../../Services/analytics/analyticsService";

let sections = [];
@inject("itineraries")
@observer
class BookingAccordion extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  state = {
    activeSections: [0]
  };

  _renderHeader = (section, index, isActive, sections) => {
    const customStyle = {};

    if (isActive) customStyle.borderBottomWidth = 0;

    const bookingProcessingCount = section.items.reduce((count, item) => {
      if (item.voucher && !(item.voucher.booked || item.voucher.self)) {
        count++;
      }
      return count;
    }, 0);

    return (
      <View style={[styles.headerContainer, customStyle]}>
        <View style={styles.headerIcon}>
          <Icon name={section.icon} size={20} color={constants.black1} />
        </View>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>{section.type}</Text>
        </View>
        <View style={styles.notificationWrapper}>
          {!isActive ? (
            [
              bookingProcessingCount ? (
                <View key={0} style={styles.bookingProcessLoadingWrapper}>
                  <Icon
                    name={constants.bookingProcessingIcon}
                    size={24}
                    color={constants.eighthColor}
                  />
                  <Text style={styles.bookingProcessCount}>
                    {bookingProcessingCount}
                  </Text>
                </View>
              ) : null,
              <NotificationCount
                key={1}
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
                  ...Platform.select({
                    android: { marginTop: -2 },
                    ios: { marginTop: 3 }
                  })
                }}
              />
            ]
          ) : (
            <View style={styles.accordionDownArrowContainer}>
              <Icon
                name={constants.arrowDown}
                color={constants.black1}
                size={17}
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  _renderContent = (section, index, isActive, sections) => {
    const { navigation } = this.props;
    const customStyle = {};
    switch (section.type) {
      case "Hotels":
        return <HotelSection navigation={navigation} section={section} />;

      case "Activities":
        return <ActivitiesSection navigation={navigation} section={section} />;

      case "Transfers":
        return <TransferSection navigation={navigation} section={section} />;

      case "Ferries":
        return <FerriesSection navigation={navigation} section={section} />;

      case "Trains":
        return <TrainsSection navigation={navigation} section={section} />;

      case "Flights":
        return <FlightsSection navigation={navigation} section={section} />;

      case "Passes":
        return <PassSection section={section} navigation={navigation} />;

      case "Rental Cars":
        return <RentalCarSection navigation={navigation} section={section} />;

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

  _updateActiveSections = activeSections => {
    const sectionIndex = activeSections[0];
    if (sectionIndex) {
      const selectedSection = sections[sectionIndex];
      switch (selectedSection.type) {
        case "Hotels":
          recordEvent(constants.bookingsHomeAccordionHotelsHeaderClick);
          break;

        case "Activities":
          recordEvent(constants.bookingsHomeAccordionActivitiesHeaderClick);
          break;

        case "Transfers":
          recordEvent(constants.bookingsHomeAccordionTransfersHeaderClick);
          break;

        case "Ferries":
          recordEvent(constants.bookingsHomeAccordionFerriesHeaderClick);
          break;

        case "Trains":
          recordEvent(constants.bookingsHomeAccordionTrainsHeaderClick);
          break;

        case "Flights":
          recordEvent(constants.bookingsHomeAccordionFlightsHeaderClick);
          break;

        case "Passes":
          recordEvent(constants.bookingsHomeAccordionPassesHeaderClick);
          break;

        case "Rental Cars":
          recordEvent(constants.bookingsHomeAccordionRentalCarsHeaderClick);
          break;

        default:
          break;
      }
    }
    this.setState({
      activeSections
    });
  };

  render() {
    sections = [];
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
        icon: constants.aeroplaneIcon,
        items: flights
      };
      sections.push(flightSection);
    }

    if (hotels.length) {
      const hotelSection = {
        type: "Hotels",
        icon: constants.hotelIcon,
        items: hotels
      };
      sections.push(hotelSection);
    }

    if (transfers.length) {
      const transferSection = {
        type: "Transfers",
        icon: constants.transferIcon,
        items: transfers
      };
      sections.push(transferSection);
    }

    if (passes.length) {
      const passesSection = {
        type: "Passes",
        icon: constants.passIcon,
        items: passes
      };
      sections.push(passesSection);
    }

    if (activities.length) {
      const activitiesSection = {
        type: "Activities",
        icon: constants.activityIcon,
        items: activities
      };
      sections.push(activitiesSection);
    }

    if (trains.length) {
      const trainsSection = {
        type: "Trains",
        icon: constants.trainIcon,
        items: trains
      };
      sections.push(trainsSection);
    }

    if (ferries.length) {
      const ferriesSection = {
        type: "Ferries",
        icon: constants.ferryIcon,
        items: ferries
      };
      sections.push(ferriesSection);
    }

    if (rentals.length) {
      const rentalsSection = {
        type: "Rental Cars",
        icon: constants.carIcon,
        items: rentals
      };
      sections.push(rentalsSection);
    }

    if (visa.length) {
      /**
       * TODO: Need Visa icon
       */
      const visaSection = {
        type: "Visa",
        icon: constants.visaIcon,
        items: visa
      };
      sections.push(visaSection);
    }

    return (
      <View style={{ marginBottom: 24 }}>
        <Accordion
          activeSections={this.state.activeSections}
          onChange={this._updateActiveSections}
          sections={sections}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          underlayColor={constants.shade5}
          initiallyActiveSection={0}
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade4
  },
  headerIcon: {
    height: 20,
    width: 20,
    marginRight: 8
  },
  headerTextWrapper: {
    ...Platform.select({
      ios: {
        height: 24
      },
      android: {
        height: 24
      }
    }),
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    fontFamily: constants.primarySemiBold,
    fontSize: 20,
    lineHeight: 20,
    color: constants.black1,
    ...Platform.select({
      ios: {
        marginTop: 4
      },
      android: {
        marginTop: 4
      }
    })
  },
  notificationWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row"
  },
  bookingProcessLoadingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  bookingProcessIcon: {
    height: 24,
    width: 24
  },
  bookingProcessCount: {
    ...constants.fontCustom(constants.primaryLight, 13),
    color: constants.black2,
    marginLeft: 4,
    marginRight: 12,
    ...Platform.select({
      ios: {
        marginTop: 6
      }
    })
  },
  accordionDownArrowContainer: {
    // transform: [{rotate: '180deg'}]
  },

  contentContainer: {
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
