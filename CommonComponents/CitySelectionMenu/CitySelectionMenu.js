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
import { observer, inject } from "mobx-react/custom";
import Modal from "react-native-modal";
import CommonHeader from "../CommonHeader/CommonHeader";
import SearchButton from "../SearchButton/SearchButton";
import { responsiveHeight } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import constants from "../../constants/constants";

@inject("appState")
@inject("yourBookingsStore")
@observer
class CitySelectionMenu extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  render() {
    const {
      isItinerarySelectionMenuVisible,
      toggleItinerarySelection
    } = this.props.appState;
    const { upcomingItineraries } = this.props.yourBookingsStore;
    const { navigation } = this.props;
    const closeModal = () => toggleItinerarySelection(false);

    return (
      <Modal
        animationIn="slideInDown"
        animationOut="slideOutUp"
        backdropColor={"black"}
        isVisible={isItinerarySelectionMenuVisible}
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
              title={"Your Itineraries"}
              leftAction={closeModal}
              RightButton={<SearchButton action={() => {}} />}
              navigation={navigation}
            />
            <ScrollView>
              {upcomingItineraries.map(itinerary => {
                return (
                  <TouchableHighlight
                    underlayColor={"transparent"}
                    style={styles.itinerarySelectorTouchable}
                  >
                    <View style={styles.itineraryDetails}>
                      <Text style={styles.itineraryName}>
                        {itinerary.itineraryName}
                      </Text>
                      <Text
                        style={styles.itineraryId}
                      >{`PYT${itinerary.itineraryId
                        .substr(itinerary.itineraryId.length - 7)
                        .toUpperCase()}`}</Text>
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
