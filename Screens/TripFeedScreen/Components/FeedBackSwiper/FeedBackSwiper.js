import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import constants from "../../../../constants/constants";
import SimpleButton from "../../../../CommonComponents/SimpleButton/SimpleButton";
import { responsiveWidth } from "react-native-responsive-dimensions";

class FeedBackSwiper extends Component {
  _swiper;

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

    return (
      <CardStack
        renderNoMoreCards={() => <View />}
        loop={true}
        style={styles.feedBackSwiperContainer}
        ref={swiper => {
          this._swiper = swiper;
        }}
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
    height: 112
  },
  feedBackCard: {
    backgroundColor: constants.secondColor,
    height: 104,
    width: responsiveWidth(100) - 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default FeedBackSwiper;
