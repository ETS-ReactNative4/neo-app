import React from "react";
import {
  View,
  TouchableHighlight,
  Text,
  Image,
  StyleSheet,
  ImageBackground
} from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import constants from "../../../../../constants/constants";
import CircleThumbnail from "../../../../../CommonComponents/CircleThumbnail/CircleThumbnail";
import ActivityRow from "./ActivityRow";

const InternationalArrive = ({ activity }) => {
  return (
    <TouchableHighlight onPress={() => {}}>
      <View style={styles.activityContainer}>
        <View style={styles.imageContainer}>
          <CircleThumbnail
            image={constants.aeroplaneIcon}
            icon={constants.aeroplaneIcon}
          />
        </View>
        <ActivityRow
          title={activity.name}
          text={activity.arrivalSlotDetail.slotText}
        />
      </View>
    </TouchableHighlight>
  );
};

InternationalArrive.propTypes = {
  activity: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  activityContainer: {
    minHeight: 48,
    flexDirection: "row",
    marginHorizontal: 24,
    width: responsiveWidth(100) - 24
  },
  imageContainer: {}
});

export default InternationalArrive;
