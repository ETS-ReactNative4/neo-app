import React from "react";
import { View, StyleSheet } from "react-native";
import moment from "moment";
import PropTypes from "prop-types";
import SectionHeader from "../../../CommonComponents/SectionHeader/SectionHeader";
import Activity from "./Activity/Activity";

const Slot = ({ day, slot }) => {
  return (
    <View style={styles.slotContainer}>
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
};

Slot.propTypes = {
  day: PropTypes.object.isRequired,
  slot: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  slotContainer: {}
});

export default Slot;
