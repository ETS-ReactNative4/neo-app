import React, { Component } from "react";
import { LayoutAnimation } from "react-native";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";
import RNCardStack, { Card } from "react-native-card-stack-swiper";
import { responsiveWidth } from "react-native-responsive-dimensions";

class CardStack extends Component {
  static propTypes = forbidExtraProps({
    onCardSwiped: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    NextCard: PropTypes.element,
    LastCard: PropTypes.element,
    EmptyPlaceHolder: PropTypes.element,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
      .isRequired,
    onSwipeStart: PropTypes.func,
    onSwipeEnd: PropTypes.func,
    verticalSwipe: PropTypes.bool,
    horizontalSwipe: PropTypes.bool,
    setRef: PropTypes.func,
    horizontalThreshold: PropTypes.number,
    secondCardZoom: PropTypes.number
  });

  state = {
    activeCardIndex: 0,
    isHidden: false
  };

  onCardSwiped = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState(
      {
        activeCardIndex: index + 1
      },
      () => {
        this.props.onCardSwiped &&
          this.props.onCardSwiped(this.state.activeCardIndex);
      }
    );
  };

  render() {
    const {
      children = [],
      NextCard = () => null,
      LastCard = () => null,
      EmptyPlaceHolder = () => null,
      containerStyle,
      onSwipeStart = () => null,
      onSwipeEnd = () => null,
      verticalSwipe = false,
      horizontalSwipe = true,
      setRef = () => null,
      horizontalThreshold = responsiveWidth(100) / 4,
      secondCardZoom = 0.95
    } = this.props;
    const pendingCards = children.length - this.state.activeCardIndex;
    return (
      <RNCardStack
        ref={setRef}
        style={containerStyle}
        onSwipeStart={() => onSwipeStart()}
        onSwipeEnd={() => onSwipeEnd()}
        onSwiped={index => this.onCardSwiped(index)}
        renderNoMoreCards={() => [
          pendingCards > 2 ? <LastCard /> : null,
          pendingCards > 1 ? <NextCard /> : null,
          pendingCards < 1 ? <EmptyPlaceHolder /> : null
        ]}
        verticalSwipe={verticalSwipe}
        horizontalSwipe={horizontalSwipe}
        horizontalThreshold={horizontalThreshold}
        secondCardZoom={secondCardZoom}
      >
        {children.map((child, childIndex) => {
          return <Card key={childIndex}>{child}</Card>;
        })}
      </RNCardStack>
    );
  }
}

export default CardStack;
