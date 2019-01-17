import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform
} from "react-native";
import CardStack from "../../../../CommonComponents/CardStack/CardStack";
import constants from "../../../../constants/constants";
import SimpleButton from "../../../../CommonComponents/SimpleButton/SimpleButton";
import { responsiveWidth } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import FeedBackSwiperModal from "./Components/FeedBackSwiperModal";
import FeedBackPositiveExplosion from "./Components/FeedBackPositiveExplosion";

const NextCard = () => (
  <View
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
);

const LastCard = () => (
  <View
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
);

const EmptyPlaceHolder = () => {
  return (
    <View style={[styles.feedBackCard, styles.feedBackCleared]}>
      <Text style={styles.feedBackClearedText}>{"All caught up!"}</Text>
    </View>
  );
};

class FeedBackSwiper extends Component {
  static propTypes = {
    toggleScrollLock: PropTypes.func.isRequired
  };

  state = {
    feedBackArray: [
      {
        title: "How was your day?",
        day: "Yesterday, May 23",
        yey: () => this.openFeedBackModal({}),
        meh: () => this.openFeedBackModal({ isNegative: true })
      },
      {
        title: "How was your day?",
        day: "May 22",
        yey: () => this.openFeedBackModal({}),
        meh: () => this.openFeedBackModal({ isNegative: true })
      },
      {
        title: "How was your day?",
        day: "May 21",
        yey: () => this.openFeedBackModal({}),
        meh: () => this.openFeedBackModal({ isNegative: true })
      },
      {
        title: "How was your day?",
        day: "May 20",
        yey: () => this.openFeedBackModal({}),
        meh: () => this.openFeedBackModal({ isNegative: true })
      },
      {
        title: "How was your day?",
        day: "May 19",
        yey: () => this.openFeedBackModal({}),
        meh: () => this.openFeedBackModal({ isNegative: true })
      }
    ],
    isModalVisible: false,
    isNegative: false
  };

  _cardStack = React.createRef();
  _emitterComponent = React.createRef();

  openFeedBackModal = ({ isNegative = false }) => {
    this.setState({
      isModalVisible: true,
      isNegative
    });
  };

  closeFeedBackModal = () => {
    this.setState({
      isModalVisible: false
    });
  };

  submitFeedBack = () => {
    this.setState(
      {
        isModalVisible: false
      },
      () => {
        setTimeout(() => {
          this._cardStack.swipeRight && this._cardStack.swipeRight();
        }, 300);
      }
    );
  };

  render() {
    return [
      <CardStack
        key={0}
        setRef={cardStack => (this._cardStack = cardStack)}
        NextCard={NextCard}
        LastCard={LastCard}
        EmptyPlaceHolder={EmptyPlaceHolder}
        onSwipeStart={() => this.props.toggleScrollLock(false)}
        onSwipeEnd={() => this.props.toggleScrollLock(true)}
        containerStyle={styles.feedBackSwiperContainer}
        verticalSwipe={false}
        hideEmptyWidget={true}
      >
        {this.state.feedBackArray.map((feedBack, feedBackIndex) => {
          return (
            <View key={feedBackIndex} style={styles.feedBackCard}>
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
            </View>
          );
        })}
      </CardStack>,
      <FeedBackSwiperModal
        key={1}
        isVisible={this.state.isModalVisible}
        data={{}}
        emitterComponent={this._emitterComponent}
        onClose={this.closeFeedBackModal}
        isNegative={this.state.isNegative}
        submit={this.submitFeedBack}
      />,
      <FeedBackPositiveExplosion
        ref={emitterComponent => (this._emitterComponent = emitterComponent)}
      />
    ];
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
  feedBackCleared: {
    backgroundColor: "transparent"
  },
  feedBackClearedText: {
    ...constants.fontCustom(constants.primarySemiBold, 21),
    color: constants.black1
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
