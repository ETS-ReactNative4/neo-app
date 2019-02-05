import constants from "../../../../../constants/constants";
import resolveLinks from "../../../../../Services/resolveLinks/resolveLinks";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "../../../../../CommonComponents/Icon/Icon";
import PropTypes from "prop-types";
import React from "react";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import { responsiveWidth } from "react-native-responsive-dimensions";
import changeColorAlpha from "../../../../../Services/changeColorAlpha/changeColorAlpha";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";

const getNotifProps = type => {
  switch (type) {
    case "info":
      return {
        icon: constants.infoIcon,
        ctaColor: constants.secondColor,
        textColor: "white",
        backgroundColor: constants.seventhColor
      };
    case "alert":
      return {
        icon: constants.warningIcon,
        ctaColor: "white",
        textColor: "white",
        backgroundColor: constants.fourthColor
      };
    default:
      return {
        icon: constants.infoIcon,
        ctaColor: constants.secondColor,
        textColor: "white",
        backgroundColor: constants.seventhColor
      };
  }
};

const NotifCard = ({
  item,
  itemIndex,
  onLayout,
  allElements,
  setNextCardColor,
  setLastCardColor,
  nextCardColor,
  lastCardColor,
  activeCardIndex,
  widgetName
}) => {
  const { link, title, message, cta, modalData, type, deepLink } = item;
  const { backgroundColor, icon, ctaColor, textColor } = getNotifProps(type);
  const action = () => {
    if (widgetName) recordEvent(widgetName);
    resolveLinks(link, modalData, deepLink);
  };
  if (itemIndex === activeCardIndex) {
    if (allElements[itemIndex + 1]) {
      const nextItem = allElements[itemIndex + 1];
      const { backgroundColor } = getNotifProps(nextItem.type);
      const newColor = changeColorAlpha(backgroundColor, 0.65);
      if (newColor !== nextCardColor) setNextCardColor(newColor);
    }
    if (allElements[itemIndex + 2]) {
      const lastItem = allElements[itemIndex + 2];
      const { backgroundColor } = getNotifProps(lastItem.type);
      const newColor = changeColorAlpha(backgroundColor, 0.65);
      if (newColor !== lastCardColor) setLastCardColor(newColor);
    }
  }
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.cardWrapper, { backgroundColor }]}
      onPress={action}
      onLayout={onLayout}
    >
      <View style={styles.iconWrapper}>
        <Icon name={icon} size={32} color={textColor} />
      </View>
      <View style={styles.messageWrapper}>
        <View>
          <Text
            style={[styles.messageContent, { color: textColor }]}
            numberOfLines={2}
          >
            {title ? <Text style={styles.messageTitle}>{title} </Text> : null}
            {message}
          </Text>
        </View>
        {cta ? (
          <View style={styles.messageLinkWrapper}>
            <TouchableOpacity activeOpacity={0.8} onPress={action}>
              <Text style={[styles.messageLink, { color: ctaColor }]}>
                {cta}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: responsiveWidth(100) - 48,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center"
  },
  iconWrapper: {
    width: 32,
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  messageWrapper: {
    flex: 1,
    marginHorizontal: 8
  },
  messageTitle: {
    ...constants.fontCustom(constants.primarySemiBold, 15, 18),
    paddingRight: 8
  },
  messageContent: {
    ...constants.fontCustom(constants.primaryRegular, 15, 18)
  },
  messageLinkWrapper: {
    marginTop: 8
  },
  messageLink: {
    ...constants.fontCustom(constants.primarySemiBold, 15)
  }
});

NotifCard.propTypes = forbidExtraProps({
  item: PropTypes.shape({
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    modalData: PropTypes.object,
    deepLink: PropTypes.object,
    cta: PropTypes.string
  }),
  itemIndex: PropTypes.number,
  onLayout: PropTypes.func.isRequired,
  allElements: PropTypes.array.isRequired,
  setNextCardColor: PropTypes.func.isRequired,
  setLastCardColor: PropTypes.func.isRequired,
  nextCardColor: PropTypes.string.isRequired,
  lastCardColor: PropTypes.string.isRequired,
  activeCardIndex: PropTypes.number.isRequired,
  widgetName: PropTypes.string
});

export default NotifCard;
