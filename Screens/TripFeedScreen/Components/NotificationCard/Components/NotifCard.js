import constants from "../../../../../constants/constants";
import resolveLinks from "../../../../../Services/resolveLinks/resolveLinks";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "../../../../../CommonComponents/Icon/Icon";
import PropTypes from "prop-types";
import React from "react";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import { responsiveWidth } from "react-native-responsive-dimensions";

const NotifCard = ({ item, itemIndex }) => {
  const { link, title, message, actionText, modalData, type } = item;
  let backgroundColor, icon, ctaColor, textColor;
  switch (type) {
    case "info":
      icon = constants.infoIcon;
      ctaColor = constants.secondColor;
      textColor = "white";
      backgroundColor = constants.seventhColor;
      break;
    case "alert":
      icon = constants.warningIcon;
      ctaColor = "white";
      textColor = "white";
      backgroundColor = constants.fourthColor;
      break;
    default:
      icon = constants.infoIcon;
      ctaColor = constants.secondColor;
      backgroundColor = constants.seventhColor;
      textColor = "white";
      break;
  }
  const action = () => resolveLinks(link);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.cardWrapper, { backgroundColor }]}
      onPress={action}
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
        {actionText ? (
          <View style={styles.messageLinkWrapper}>
            <TouchableOpacity activeOpacity={0.8} onPress={action}>
              <Text style={[styles.messageLink, { color: ctaColor }]}>
                {actionText}
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
    modalData: PropTypes.object.isRequired,
    actionText: PropTypes.string
  }),
  itemIndex: PropTypes.number
});

export default NotifCard;
