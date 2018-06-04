import React from "react";
import { View, StyleSheet } from "react-native";
import moment from "moment";
import PropTypes from "prop-types";
import SectionHeader from "../../../CommonComponents/SectionHeader/SectionHeader";
import Activity from "./Activity/Activity";
import constants from "../../../constants/constants";
import CityCard from "./CityCard";
import { inject, observer } from "mobx-react/custom";

const Slot = inject("itineraries")(
  observer(({ day, slot, onItemLayout, itineraries }) => {
    const setOnLayout = nativeEvent => {
      onItemLayout(nativeEvent, moment(day).format("DDMMYYYY"));
    };

    const { getCityNameById } = itineraries;

    const firstSlot = slot[0];
    let cityCardData = null;
    switch (firstSlot.type) {
      case "INTERNATIONAL_ARRIVE":
        cityCardData = {
          cityImage: constants.splashBackground,
          action: () => null,
          cityName: firstSlot.arrivalSlotDetail.airportCity,
          activityText: firstSlot.arrivalSlotDetail.transferIndicatorText
        };
        break;

      case "INTERCITY_TRANSFER":
        cityCardData = {
          cityImage: constants.splashBackground,
          action: () => null,
          cityName: getCityNameById(
            firstSlot.intercityTransferSlotDetailVO.toCity
          ),
          activityText:
            firstSlot.intercityTransferSlotDetailVO.directTransferDetail
              .transferIndicatorText
        };
        break;

      case "ACTIVITY_WITH_TRANSFER":
        cityCardData = {
          cityImage: constants.splashBackground,
          action: () => null,
          cityName: getCityNameById(
            firstSlot.intercityTransferSlotDetailVO.toCity
          ),
          activityText:
            firstSlot.intercityTransferSlotDetailVO.directTransferDetail
              .transferIndicatorText
        };
        break;

      default:
        break;
    }

    /**
     * TODO: Get Images for cities
     */
    return (
      <View style={styles.slotContainer} onLayout={setOnLayout}>
        {cityCardData ? (
          <CityCard
            {...cityCardData}
            containerStyle={{ marginTop: 24, marginBottom: 24 }}
          />
        ) : null}

        <SectionHeader
          sectionName={moment(day)
            .format("MMM DD, dddd")
            .toUpperCase()}
          containerStyle={{ marginHorizontal: 24 }}
        />

        {slot.map((activity, index) => {
          return <Activity activity={activity} key={index} />;
        })}
      </View>
    );
  })
);

Slot.propTypes = {
  day: PropTypes.object.isRequired,
  slot: PropTypes.array.isRequired,
  onItemLayout: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  slotContainer: {}
});

export default Slot;
