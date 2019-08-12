import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
  ViewPropTypes
} from "react-native";
import CustomHtmlView from "../../../CommonComponents/CustomHtmlView/CustomHtmlView";
import Icon from "../../../CommonComponents/Icon/Icon";
import constants from "../../../constants/constants";
import fonts from "../../../constants/fonts";
import PropTypes from "prop-types";

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

const FaqAccordionTile = ({
  title,
  content,
  containerStyle = StyleSheet.create({})
}) => {
  const [isExpanded, toggleExpansion] = useState(false);
  const [iconContainer, setIconContainer] = useState({
    transform: [{ rotate: "0deg" }]
  });

  const spinValue = new Animated.Value(0);
  Animated.timing(spinValue, {
    toValue: 1,
    duration: 300,
    easing: Easing.linear
  }).start();
  let spin;

  const handleClick = () => {
    if (isExpanded) {
      spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["90deg", "0deg"]
      });
      setIconContainer({ transform: [{ rotate: spin }] });
    } else {
      const reverseSpin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "90deg"]
      });
      setIconContainer({ transform: [{ rotate: reverseSpin }] });
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleExpansion(!isExpanded);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleClick}
      style={[
        styles.faqAccordionTileContainer,
        !isExpanded
          ? styles.compressedContainerStyle
          : styles.expandedContainerStyle,
        containerStyle
      ]}
    >
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>{title}</Text>
        <Animated.View style={[styles.iconWrapper, iconContainer]}>
          <Icon name={constants.arrowRight} size={10} />
        </Animated.View>
      </View>
      {isExpanded ? (
        <View style={styles.contentWrapper}>
          <CustomHtmlView styleSheet={faqStyleSheet} html={content} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

FaqAccordionTile.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  containerStyle: ViewPropTypes.style
};

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
    marginTop: Platform.OS === constants.platformIos ? -4 : -3
  }
});

export default FaqAccordionTile;
