import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes
} from "react-native";
import PropTypes from "prop-types";
import Icon from "../../../CommonComponents/Icon/Icon";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import { responsiveWidth } from "react-native-responsive-dimensions";

const SupportTopBar = ({
  containerStyle = StyleSheet.create({}),
  text = "",
  ctaText = "",
  ctaAction = () => null,
  nextAction = () => null,
  isTitleBold = false
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={ctaAction}
      style={[styles.supportTopBarContainer, containerStyle]}
    >
      <View style={styles.textArea}>
        <Text
          numberOfLines={2}
          ellipsizeMode={"tail"}
          style={[styles.supportInfoText, isTitleBold ? styles.boldText : {}]}
        >
          {text}
        </Text>
      </View>
      {!isTitleBold ? (
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
      ) : null}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={ctaAction}
        style={styles.arrowArea}
      >
        <Icon name={constants.arrowRight} size={16} color={"white"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

SupportTopBar.propTypes = {
  containerStyle: ViewPropTypes.style,
  text: PropTypes.string.isRequired,
  ctaText: PropTypes.string.isRequired,
  ctaAction: PropTypes.func.isRequired,
  nextAction: PropTypes.func.isRequired,
  isTitleBold: PropTypes.bool
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
  buttonArea: {
    paddingLeft: 8
  },
  arrowArea: {
    paddingLeft: 8,
    paddingRight: 16
  },
  boldText: {
    ...constants.fontCustom(constants.primarySemiBold, 16, 19)
  }
});

export default SupportTopBar;
