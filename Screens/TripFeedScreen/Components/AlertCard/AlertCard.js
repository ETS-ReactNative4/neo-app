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

class AlertCard extends Component {
  static propTypes = {
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    elements: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        message: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        modalData: PropTypes.object,
        deepLink: PropTypes.object,
        cta: PropTypes.string
      })
    ).isRequired,
    canDismiss: PropTypes.bool,
    toggleScrollLock: PropTypes.func.isRequired,
    widgetName: PropTypes.string
  };

  state = {
    primaryCardHeight: 0,
    nextCardColor: "white",
    lastCardColor: "white",
    activeCardIndex: 0
  };

  _onLayout = event => {
    const { x, y, height, width } = event.nativeEvent.layout;
    this.setState({ primaryCardHeight: height });
  };

  _setNextCardColor = nextCardColor => this.setState({ nextCardColor });

  _setLastCardColor = lastCardColor => this.setState({ lastCardColor });

  _setActiveCardIndex = activeCardIndex => this.setState({ activeCardIndex });

  render() {
    const {
      containerStyle = {},
      canDismiss = false,
      elements = [],
      widgetName
    } = this.props;

    const NextCard = () => (
      <View
        style={[
          styles.cardWrapper,
          {
            position: "absolute",
            bottom: 12,
            backgroundColor: this.state.nextCardColor,
            transform: [{ scale: 0.95 }],
            height: this.state.primaryCardHeight,
            paddingVertical: 0,
            paddingHorizontal: 0
          }
        ]}
      />
    );

    const LastCard = () => (
      <View
        style={[
          styles.cardWrapper,
          {
            position: "absolute",
            bottom: 4,
            backgroundColor: this.state.lastCardColor,
            transform: [{ scale: 0.9 }],
            height: this.state.primaryCardHeight,
            paddingVertical: 0,
            paddingHorizontal: 0
          }
        ]}
      />
    );

    return (
      <CardStack
        key={0}
        EmptyPlaceHolder={EmptyPlaceHolder}
        NextCard={NextCard}
        LastCard={LastCard}
        onActiveIndexChange={this._setActiveCardIndex}
        horizontalSwipe={canDismiss}
        onSwipeStart={() => this.props.toggleScrollLock(false)}
        onSwipeEnd={() => this.props.toggleScrollLock(true)}
        containerStyle={[styles.cardsContainer, containerStyle]}
      >
        {elements.map((item, itemIndex, allElements) => {
          return (
            <NotifCard
              onLayout={event => this._onLayout(event)}
              setNextCardColor={this._setNextCardColor}
              setLastCardColor={this._setLastCardColor}
              nextCardColor={this.state.nextCardColor}
              lastCardColor={this.state.lastCardColor}
              allElements={allElements}
              key={itemIndex}
              item={item}
              itemIndex={itemIndex}
              activeCardIndex={this.state.activeCardIndex}
              widgetName={widgetName}
            />
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
    alignItems: "center",
    justifyContent: "center",
    minHeight: 110
  },
  cardWrapper: {
    width: responsiveWidth(100) - 48,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
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

export default AlertCard;
