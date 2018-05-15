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

const SimpleActivity = ({ activity, title, text, image, icon }) => {
  return (
    <TouchableHighlight onPress={() => {}}>
      <View style={styles.activityContainer}>
        <View style={styles.imageContainer}>
          <CircleThumbnail image={image} icon={icon} />
        </View>
        <ActivityRow title={title} text={text} />
      </View>
    </TouchableHighlight>
  );
};

SimpleActivity.propTypes = {
  activity: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

const styles = StyleSheet.create({
  activityContainer: {
    minHeight: 48,
    flexDirection: "row",
    marginHorizontal: 24,
    width: responsiveWidth(100) - 24,
    marginBottom: 16
  },
  imageContainer: {}
});

export default SimpleActivity;
