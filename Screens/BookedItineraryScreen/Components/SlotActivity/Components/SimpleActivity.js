import React from "react";
import {
  View,
  TouchableOpacity,
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
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";

const SimpleActivity = ({
  activity,
  title,
  text,
  image,
  icon,
  onClick,
  isImageContain
}) => {
  return (
    <TouchableOpacity activeOpacity={0.2} onPress={onClick}>
      <View style={styles.activityContainer}>
        <View style={styles.imageContainer}>
          <CircleThumbnail
            image={image}
            icon={icon}
            isContain={isImageContain}
          />
        </View>
        <ActivityRow title={title} text={text} />
      </View>
    </TouchableOpacity>
  );
};

SimpleActivity.propTypes = forbidExtraProps({
  activity: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isImageContain: PropTypes.bool
});

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
