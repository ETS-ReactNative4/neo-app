import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";
import constants from "../../../../constants/constants";
import Icon from "../../../../CommonComponents/Icon/Icon";
import { responsiveWidth } from "react-native-responsive-dimensions";
import CardStack from "../../../../CommonComponents/CardStack/CardStack";
import resolveLinks from "../../../../Services/resolveLinks/resolveLinks";

class NotificationCard extends Component {
  static propTypes = {
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    data: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        message: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        modalData: PropTypes.object.isRequired,
        actionText: PropTypes.string
      })
    ).isRequired,
    canDismiss: PropTypes.bool,
    toggleScrollLock: PropTypes.func.isRequired
  };

  render() {
    const EmptyPlaceHolder = () => {
      return (
        <View style={styles.cardWrapper}>
          <Text style={styles.doneText}>All Done!</Text>
        </View>
      );
    };

    const { containerStyle = {}, canDismiss = false, data = [] } = this.props;

    const NotifCard = ({ item, itemIndex }) => {
      const { link, title, message, actionText, type } = item;
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
                {title ? (
                  <Text style={styles.messageTitle}>{title} </Text>
                ) : null}
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

    return (
      <CardStack
        key={0}
        EmptyPlaceHolder={EmptyPlaceHolder}
        horizontalSwipe={canDismiss}
        onSwipeStart={() => this.props.toggleScrollLock(false)}
        onSwipeEnd={() => this.props.toggleScrollLock(true)}
        containerStyle={[styles.cardsContainer, containerStyle]}
      >
        {data.map((item, itemIndex) => {
          return (
            <NotifCard key={itemIndex} item={item} itemIndex={itemIndex} />
          );
        })}
      </CardStack>
    );
  }
}

const styles = StyleSheet.create({
  cardsContainer: {
    marginVertical: 8,
    marginHorizontal: 24,
    minHeight: 110
  },
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
  },
  doneTextWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8
  },
  doneText: {
    ...constants.fontCustom(constants.primarySemiBold, 21),
    color: constants.black1,
    textAlign: "center"
  }
});

export default NotificationCard;
