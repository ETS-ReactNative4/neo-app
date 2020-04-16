import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import CircleThumbnail from "../../../../../CommonComponents/CircleThumbnail/CircleThumbnail";
import ActivityRow from "./ActivityRow";

const SimpleActivity = ({
  title,
  text,
  image,
  onClick,
  isImageContain,
  containerStyle = {},
  defaultImageUri
}) => {
  return (
    <TouchableOpacity activeOpacity={0.2} onPress={onClick}>
      <View style={[styles.activityContainer, containerStyle]}>
        <View style={styles.imageContainer}>
          <CircleThumbnail
            image={image}
            isContain={isImageContain}
            defaultImageUri={defaultImageUri}
          />
        </View>
        <ActivityRow title={title} text={text} />
      </View>
    </TouchableOpacity>
  );
};

SimpleActivity.propTypes = {
  activity: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isImageContain: PropTypes.bool,
  containerStyle: PropTypes.object,
  defaultImageUri: PropTypes.string.isRequired
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
