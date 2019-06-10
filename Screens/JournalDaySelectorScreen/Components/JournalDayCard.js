import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const JournalDayCard = ({ image, info, action }) => {
  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.8}
      style={styles.journalDayCardContainer}
    >
      <ImageBackground
        blurRadius={2}
        source={image}
        resizeMode={"cover"}
        style={styles.dayCardImage}
      >
        <View style={styles.imageOverlay}>
          <Icon name={constants.downloadIcon} color={"white"} size={24} />
        </View>
      </ImageBackground>
      <Text numberOfLines={2} ellipsizeMode={"tail"} style={styles.infoText}>
        {info}
      </Text>
    </TouchableOpacity>
  );
};

JournalDayCard.propTypes = forbidExtraProps({
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  info: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
});

const styles = StyleSheet.create({
  journalDayCardContainer: {
    minHeight: 246,
    width: responsiveWidth(100) - 48,
    marginHorizontal: 24,
    backgroundColor: "white"
  },
  dayCardImage: {
    backgroundColor: "white",
    height: 164
  },
  imageOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.15)"
  },
  infoText: {
    padding: 16,
    ...constants.fontCustom(constants.primaryRegular, 14, 20),
    color: constants.black1
  }
});

export default JournalDayCard;
