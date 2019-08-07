import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
  Animated,
  Easing,
  Platform
} from "react-native";
import CustomHtmlView from "../../../CommonComponents/CustomHtmlView/CustomHtmlView";
import Icon from "../../../CommonComponents/Icon/Icon";
import constants from "../../../constants/constants";
import fonts from "../../../constants/fonts";

const faqStyleSheet = {
  p: {
    fontFamily: fonts.primaryLight,
    color: constants.black2,
    fontSize: 14,
    lineHeight: 19
  },
  a: {
    color: constants.firstColor,
    fontFamily: fonts.primarySemiBold,
    textDecorationLine: "underline"
  }
};

const FaqAccordionTile = ({ title, content }) => {
  const [isExpanded, toggleExpansion] = useState(false);

  const handleClick = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleExpansion(!isExpanded);
  };

  const spinValue = new Animated.Value(0);
  Animated.timing(spinValue, {
    toValue: 1,
    duration: 300,
    easing: Easing.linear
  }).start();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleClick}
      style={[
        styles.faqAccordionTileContainer,
        !isExpanded
          ? styles.compressedContainerStyle
          : styles.expandedContainerStyle
      ]}
    >
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>{title}</Text>
        <View style={styles.iconWrapper}>
          <Icon name={constants.arrowRight} size={10} />
        </View>
      </View>
      {isExpanded ? (
        <View style={styles.contentWrapper}>
          <CustomHtmlView styleSheet={faqStyleSheet} html={content} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

FaqAccordionTile.propTypes = {};

const styles = StyleSheet.create({
  faqAccordionTileContainer: {
    paddingHorizontal: 24
  },
  compressedContainerStyle: {
    height: 70
  },
  expandedContainerStyle: {
    backgroundColor: constants.firstColorBackground
  },
  contentWrapper: {
    marginBottom: 24
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 35,
    marginBottom: 16
  },
  titleText: {
    ...constants.fontCustom(constants.primaryRegular, 14),
    color: constants.black1
  },
  iconWrapper: {
    marginTop: Platform.OS === constants.platformIos ? -5 : -4
  }
});

export default FaqAccordionTile;
