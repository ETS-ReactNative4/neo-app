import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  Animated,
  Easing
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
import _ from "lodash";
import VisaSection from "./Components/VisaSection";
import InsuranceSection from "./Components/InsuranceSection";

let sections = [];
@inject("itineraries")
@inject("visaStore")
@observer
class BookingAccordion extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  state = {
    activeSections: [],
    wasActiveIndex: []
  };
  spinValue = new Animated.Value(0);

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }

  _renderHeader = (section, index, isActive, sections) => {
    const { wasActiveIndex } = this.state;
    const customStyle = {};

    // if (isActive) customStyle.borderBottomWidth = 0;

    const iconContainer = {};
    const spinValue = new Animated.Value(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear
    }).start();
    if (isActive) {
      if (!wasActiveIndex.includes(index)) {
        const spin = spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: ["-90deg", "90deg"]
        });
        iconContainer.transform = [{ rotate: spin }];
      } else {
        iconContainer.transform = [{ rotate: "90deg" }];
      }
    } else if (wasActiveIndex.includes(index)) {
      const reverseSpin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["90deg", "-90deg"]
      });
      iconContainer.transform = [{ rotate: reverseSpin }];
    } else {
      iconContainer.transform = [{ rotate: "-90deg" }];
    }

    const processingSpin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["360deg", "0deg"]
    });

    const bookingProcessingCount = section.items.length
      ? section.items.reduce((count, item) => {
          if (item.voucher && !(item.voucher.booked || item.free)) {
            count++;
          }
          return count;
        }, 0)
      : 0;

    return (
      <View style={[styles.headerContainer, customStyle]}>
        <View style={styles.headerIcon}>
          <Icon name={section.icon} size={20} color={constants.shade1} />
        </View>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>{section.type}</Text>
          {bookingProcessingCount && !isActive ? (
            <Animated.View
              style={[
                styles.bookingProcessLoadingWrapper,
                { transform: [{ rotate: processingSpin }] }
              ]}
            >
              <Icon
                name={constants.bookingProcessingIcon}
                size={24}
                color={constants.eighthColor}
              />
            </Animated.View>
          ) : null}
        </View>
        <View style={styles.notificationWrapper}>
          <NotificationCount
            count={section.items.length || 1}
            containerStyle={{
              backgroundColor: constants.secondColor,
              height: 26,
              width: 26,
              borderRadius: 13,
              marginRight: 2
            }}
            textStyle={{
              ...constants.fontCustom(constants.primarySemiBold, 13),
              color: constants.black2,
              marginTop: 3
            }}
          />

          <Animated.View style={iconContainer}>
            <Icon
              name={constants.backIcon}
              color={constants.shade1}
              size={17}
            />
          </Animated.View>
        </View>
      </View>
    );
  };

  _renderContent = (section, index, isActive, sections) => {
    const { navigation } = this.props;
    const customStyle = {};

    let spinValue = 0;
    if (!(section.voucher && section.voucher.booked) || !section.free) {
      spinValue = this.spinValue;
    }

    switch (section.type) {
      case "Hotels":
        return (
          <HotelSection
            navigation={navigation}
            section={section}
            spinValue={spinValue}
          />
        );

      case "Activities":
        return (
          <ActivitiesSection
            navigation={navigation}
            section={section}
            spinValue={spinValue}
          />
        );

      case "Transfers":
        return (
          <TransferSection
            navigation={navigation}
            section={section}
            spinValue={spinValue}
          />
        );

      case "Ferries":
        return (
          <FerriesSection
            navigation={navigation}
            section={section}
            spinValue={spinValue}
          />
        );

      case "Trains":
        return (
          <TrainsSection
            navigation={navigation}
            section={section}
            spinValue={spinValue}
          />
        );

      case "Flights":
        return (
          <FlightsSection
            navigation={navigation}
            section={section}
            spinValue={spinValue}
          />
        );

      case "Passes":
        return (
          <PassSection
            section={section}
            navigation={navigation}
            spinValue={spinValue}
          />
        );

      case "Rental Cars":
        return (
          <RentalCarSection
            navigation={navigation}
            section={section}
            spinValue={spinValue}
          />
        );

      case "Visa":
        return (
          <VisaSection
            navigation={navigation}
            section={section}
            spinValue={spinValue}
          />
        );

      case "Insurance":
        return (
          <InsuranceSection
            navigation={navigation}
            section={section}
            spinValue={spinValue}
          />
        );

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
    this.setState(
      {
        wasActiveIndex: this.state.activeSections
      },
      () => {
        const sectionIndex = activeSections[0];
        if (sectionIndex) {
          const selectedSection = sections[sectionIndex];
          switch (selectedSection.type) {
            case "Hotels":
              recordEvent(constants.Bookings.event, {
                click: constants.Bookings.click.accordionHeader,
                type: constants.Bookings.type.hotels
              });
              break;

            case "Activities":
              recordEvent(constants.Bookings.event, {
                click: constants.Bookings.click.accordionHeader,
                type: constants.Bookings.type.activities
              });
              break;

            case "Transfers":
              recordEvent(constants.Bookings.event, {
                click: constants.Bookings.click.accordionHeader,
                type: constants.Bookings.type.transfers
              });
              break;

            case "Ferries":
              recordEvent(constants.Bookings.event, {
                click: constants.Bookings.click.accordionHeader,
                type: constants.Bookings.type.ferries
              });
              break;

            case "Trains":
              recordEvent(constants.Bookings.event, {
                click: constants.Bookings.click.accordionHeader,
                type: constants.Bookings.type.trains
              });
              break;

            case "Flights":
              recordEvent(constants.Bookings.event, {
                click: constants.Bookings.click.accordionHeader,
                type: constants.Bookings.type.flights
              });
              break;

            case "Passes":
              recordEvent(constants.Bookings.event, {
                click: constants.Bookings.click.accordionHeader,
                type: constants.Bookings.type.passes
              });
              break;

            case "Rental Cars":
              recordEvent(constants.Bookings.event, {
                click: constants.Bookings.click.accordionHeader,
                type: constants.Bookings.type.rentalCars
              });
              break;

            case "Visa":
              recordEvent(constants.Bookings.event, {
                click: constants.Bookings.click.accordionHeader,
                type: constants.Bookings.type.visa
              });
              break;

            case "Insurance":
              recordEvent(constants.Bookings.event, {
                click: constants.Bookings.click.accordionHeader,
                type: constants.Bookings.type.insurance
              });
              break;

            default:
              break;
          }
        }
        this.setState({
          activeSections
        });
      }
    );
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
      rentals,
      insurance
    } = this.props.itineraries;
    const { isVisaInitialized } = this.props.visaStore;

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
       * Check if visa is initialized before rendering the visa section
       */
      if (isVisaInitialized) {
        const visaSection = {
          type: "Visa",
          icon: constants.visaIcon,
          items: visa
        };
        sections.push(visaSection);
      }
    }

    if (!_.isEmpty(insurance)) {
      const insuranceSection = {
        type: "Insurance",
        icon: constants.insuranceIcon,
        items: insurance
      };
      sections.push(insuranceSection);
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
    height: 48,
    flexDirection: "row",
    alignItems: "center"
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    fontFamily: constants.primaryRegular,
    fontSize: 20,
    lineHeight: 20,
    color: constants.black2,
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
    marginLeft: 4
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
