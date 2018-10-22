import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform
} from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import constants from "../../../../constants/constants";
import SimpleButton from "../../../../CommonComponents/SimpleButton/SimpleButton";
import { responsiveWidth } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";

class FeedBackSwiper extends Component {
  static propTypes = {
    toggleScrollLock: PropTypes.func.isRequired
  };

  state = {
    activeCardIndex: 0
  };

  _swiper;

  onCardSwiped = index => {
    this.setState(
      {
        activeCardIndex: index + 1
      },
      () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }
    );
  };

  render() {
    const feedBackArray = [
      {
        title: "How was your day?",
        day: "Yesterday, May 23",
        yey: () => null,
        meh: () => null
      },
      {
        title: "How was your day?",
        day: "May 22",
        yey: () => null,
        meh: () => null
      },
      {
        title: "How was your day?",
        day: "May 21",
        yey: () => null,
        meh: () => null
      },
      {
        title: "How was your day?",
        day: "May 20",
        yey: () => null,
        meh: () => null
      },
      {
        title: "How was your day?",
        day: "May 19",
        yey: () => null,
        meh: () => null
      }
    ];

    const pendingCards = feedBackArray.length - this.state.activeCardIndex;

    return (
      <CardStack
        renderNoMoreCards={() => [
          pendingCards > 2 ? (
            <View
              key={0}
              style={[
                styles.feedBackCard,
                {
                  position: "absolute",
                  bottom: 0,
                  backgroundColor: constants.secondColorAlpha(0.5),
                  transform: [{ scale: 0.9 }]
                }
              ]}
            />
          ) : null,
          pendingCards > 1 ? (
            <View
              key={1}
              style={[
                styles.feedBackCard,
                {
                  position: "absolute",
                  bottom: 8,
                  backgroundColor: constants.secondColorAlpha(0.65),
                  transform: [{ scale: 0.95 }]
                }
              ]}
            />
          ) : null,
          pendingCards < 1 ? <View key={2} style={styles.feedBackCard} /> : null
        ]}
        style={styles.feedBackSwiperContainer}
        ref={swiper => {
          this._swiper = swiper;
        }}
        secondCardZoom={0.95}
        onSwipeStart={() => this.props.toggleScrollLock(false)}
        onSwipeEnd={() => () => this.props.toggleScrollLock(true)}
        verticalSwipe={false}
        onSwiped={index => this.onCardSwiped(index)}
        horizontalThreshold={responsiveWidth(100) / 4}
      >
        {feedBackArray.map((feedBack, feedBackIndex) => {
          return (
            <Card key={feedBackIndex} style={styles.feedBackCard}>
              <Text style={styles.feedBackTitle}>{feedBack.title}</Text>
              <Text style={styles.feedBackDay}>{feedBack.day}</Text>
              <View style={styles.actionBar}>
                <SimpleButton
                  text={"Meh!"}
                  action={feedBack.meh}
                  textColor={"rgba(255,87,109,1)"}
                  hasBorder={false}
                  icon={constants.activityIcon}
                  textStyle={{
                    ...constants.fontCustom(constants.primarySemiBold, 17)
                  }}
                  iconSize={16}
                  underlayColor={"transparent"}
                  containerStyle={{
                    backgroundColor: "transparent",
                    marginRight: 4,
                    height: 20,
                    width: 80
                  }}
                />
                <SimpleButton
                  text={"Yey!"}
                  action={feedBack.yey}
                  textColor={constants.firstColor}
                  hasBorder={false}
                  icon={constants.activityIcon}
                  textStyle={{
                    ...constants.fontCustom(constants.primarySemiBold, 17)
                  }}
                  iconSize={16}
                  underlayColor={"transparent"}
                  containerStyle={{
                    backgroundColor: "transparent",
                    marginLeft: 4,
                    height: 20,
                    width: 80
                  }}
                />
              </View>
            </Card>
          );
        })}
      </CardStack>
    );
  }
}

const styles = StyleSheet.create({
  feedBackSwiperContainer: {
    marginHorizontal: 24,
    height: 120,
    marginVertical: 8
  },
  feedBackCard: {
    backgroundColor: constants.secondColor,
    height: 104,
    width: responsiveWidth(100) - 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16
  },
  feedBackTitle: {
    ...constants.fontCustom(constants.primarySemiBold, 16, 24),
    color: constants.black1
  },
  feedBackDay: {
    ...constants.fontCustom(constants.primaryLight, 15, 18),
    color: constants.black1
  },
  actionBar: {
    ...Platform.select({
      android: {
        marginTop: 4
      },
      ios: {
        marginTop: 2
      }
    }),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default FeedBackSwiper;
