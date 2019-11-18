import React, { Component } from "react";
import {
  View,
  // Modal,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import { observer, inject } from "mobx-react";
import Modal from "react-native-modal";
import CommonHeader from "../CommonHeader/CommonHeader";
import SearchButton from "../SearchButton/SearchButton";
import moment from "moment";
import { responsiveHeight } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import constants from "../../constants/constants";

/**
 * TODO: Make module more generic
 */
@inject("appState")
@inject("itineraries")
@observer
class CitySelectionMenu extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    selectDay: PropTypes.func,
    selectCity: PropTypes.func
  };

  render() {
    const {
      isItinerarySelectionMenuVisible,
      toggleItinerarySelection
    } = this.props.appState;
    const { cities } = this.props.itineraries;
    const { navigation, selectDay, selectCity } = this.props;
    const closeModal = () => toggleItinerarySelection(false);

    return (
      <Modal
        animationIn="slideInDown"
        animationOut="slideOutUp"
        backdropColor={"black"}
        isVisible={isItinerarySelectionMenuVisible && navigation.isFocused()}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        backdropOpacity={0.2}
        style={{ margin: 0 }}
        onSwipe={closeModal}
        swipeDirection={"up"}
      >
        <View style={styles.itinerarySelectionContainer}>
          <View style={styles.activeSection}>
            <CommonHeader
              title={"Your Itinerary"}
              leftAction={closeModal}
              // RightButton={<SearchButton action={() => {}} />}
              navigation={navigation}
            />
            <ScrollView>
              {cities.map((city, index) => {
                return (
                  <TouchableHighlight
                    onPress={() => {
                      if (selectDay) {
                        const cityDate = moment(city.startDay).format("x");
                        selectDay(cityDate);
                      } else if (selectCity) {
                        selectCity(city);
                      }
                      closeModal();
                    }}
                    key={index}
                    underlayColor={"transparent"}
                    style={styles.itinerarySelectorTouchable}
                  >
                    <View style={styles.itineraryDetails}>
                      {selectDay ? (
                        <Text style={styles.itineraryName}>
                          {`${moment(city.startDay).format(
                            "MMM DD"
                          )} - ${moment(city.endDay).format("MMM DD")}`}
                        </Text>
                      ) : null}
                      <Text style={styles.itineraryId}>{city.city}</Text>
                    </View>
                  </TouchableHighlight>
                );
              })}
            </ScrollView>
          </View>
          <TouchableOpacity style={{ flex: 1 }} onPress={closeModal} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  itinerarySelectionContainer: {
    flex: 1,
    backgroundColor: "transparent"
  },
  activeSection: {
    backgroundColor: "white"
  },
  itinerarySelectorTouchable: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 24
  },
  itineraryDetails: {
    alignItems: "center",
    justifyContent: "center"
  },
  itineraryName: {
    ...constants.font11(constants.primaryLight),
    color: constants.shade1
  },
  itineraryId: {
    ...constants.font17(constants.primarySemiBold),
    color: constants.firstColor
  }
});

export default CitySelectionMenu;
