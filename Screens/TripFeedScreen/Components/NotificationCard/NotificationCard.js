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
import NotifCard from "./Components/NotifCard";

const EmptyPlaceHolder = () => {
  return (
    <View style={styles.cardWrapper}>
      <Text style={styles.doneText}>All Done!</Text>
    </View>
  );
};

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
        cta: PropTypes.string
      })
    ).isRequired,
    canDismiss: PropTypes.bool,
    toggleScrollLock: PropTypes.func.isRequired
  };

  render() {
    const { containerStyle = {}, canDismiss = false, data = [] } = this.props;

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
