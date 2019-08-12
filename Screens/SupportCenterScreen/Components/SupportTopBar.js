import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "../../../CommonComponents/Icon/Icon";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import { responsiveWidth } from "react-native-responsive-dimensions";

const SupportTopBar = ({
  text = "",
  ctaText = "",
  ctaAction = () => null,
  nextAction = () => null
}) => {
  return (
    <View style={styles.supportTopBarContainer}>
      <View style={styles.textArea}>
        <Text
          numberOfLines={2}
          ellipsizeMode={"tail"}
          style={styles.supportInfoText}
        >
          {text}
        </Text>
      </View>
      <View style={styles.buttonArea}>
        <SimpleButton
          containerStyle={{ width: 80, height: 24, borderRadius: 50 }}
          text={ctaText}
          color={"white"}
          textColor={constants.firstColor}
          action={ctaAction}
          textStyle={styles.ctaTextStyle}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={nextAction}
        style={styles.arrowArea}
      >
        <Icon name={constants.arrowRight} size={10} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

SupportTopBar.propTypes = {
  text: PropTypes.string.isRequired,
  ctaText: PropTypes.string.isRequired,
  ctaAction: PropTypes.func.isRequired,
  nextAction: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  supportTopBarContainer: {
    flexDirection: "row",
    height: 60,
    width: responsiveWidth(100),
    alignItems: "center",
    backgroundColor: constants.firstColor
  },
  textArea: {
    flex: 1,
    marginLeft: 16
  },
  supportInfoText: {
    ...constants.fontCustom(constants.primaryRegular, 12, 19),
    color: "white"
  },
  ctaTextStyle: {
    ...constants.fontCustom(constants.primarySemiBold, 12)
  },
  buttonArea: {},
  arrowArea: {
    paddingHorizontal: 16
  }
});

export default SupportTopBar;
