import React from "react";
import { View, StyleSheet } from "react-native";
import moment from "moment";
import PropTypes from "prop-types";
import SectionHeader from "../../../CommonComponents/SectionHeader/SectionHeader";
import SlotActivity from "./SlotActivity/SlotActivity";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../constants/constants";
import SlotRowWrapper from "./SlotActivity/SlotRowWrapper";

const Slot = ({ day, slot, onItemLayout, navigation, spinValue }) => {
  const setOnLayout = nativeEvent => {
    onItemLayout(nativeEvent, moment(day).format("x"));
  };

  const firstSlot = slot[0];

  return (
    <View style={styles.slotContainer} onLayout={setOnLayout}>
      {[
        "INTERNATIONAL_ARRIVE",
        "INTERCITY_TRANSFER",
        "ACTIVITY_WITH_TRANSFER"
      ].indexOf(firstSlot.type) === -1 ? (
        <SectionHeader
          sectionName={moment(day)
            .format(constants.commonDateFormat)
            .toUpperCase()}
          containerStyle={{ marginHorizontal: 24 }}
        />
      ) : null}

      {slot.map((activity, index) => {
        return (
          <SlotRowWrapper key={index} data={activity}>
            <SlotActivity
              navigation={navigation}
              activity={activity}
              activityIndex={index}
              day={day}
              spinValue={spinValue}
            />
          </SlotRowWrapper>
        );
      })}
    </View>
  );
};

Slot.propTypes = forbidExtraProps({
  spinValue: PropTypes.object.isRequired,
  day: PropTypes.object.isRequired,
  slot: PropTypes.array.isRequired,
  onItemLayout: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
});

const styles = StyleSheet.create({
  slotContainer: {}
});

export default Slot;
