import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Carousel from "../../../../CommonComponents/Carousel/Carousel";
import { PropTypes } from "prop-types";
import constants from "../../../../constants/constants";
import CircleIcon from "./Components/CircleIcon";
import Box from "../../../../CommonComponents/Box/Box";
import { recordEvent } from "../../../../Services/analytics/analyticsService";

class TripView extends Component {
  state = {
    isScrollRecorded: false
  };

  scrollAction = () => {
    if (!this.state.isScrollRecorded) {
      recordEvent(constants.tripViewScroll);
      this.setState({
        isScrollRecorded: true
      });
    }
  };

  render() {
    const { data = [], containerStyle = {} } = this.props;
    const iconTypes = {
      FLIGHT: constants.aeroplaneIcon,
      CAR: constants.carIcon,
      BUS: constants.busIcon,
      TRAIN: constants.trainIcon,
      FERRY: constants.ferryIcon
    };
    const onScrollProps = {},
      boxSize = 136,
      circleSize = 32;
    if (!this.state.isScrollRecorded) {
      onScrollProps["onScrollAction"] = () => this.scrollAction();
    }
    return (
      <View style={[styles.listWrapper, containerStyle]}>
        <Carousel
          {...onScrollProps}
          firstMargin={24}
          containerStyle={{
            height: boxSize + 8
          }}
        >
          {data.map((item, itemIndex) => {
            const rotate = item.icon === "FLIGHT" ? "90deg" : "0deg";
            const ic = iconTypes[item.icon];
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginLeft: itemIndex ? -20 : 0
                }}
                key={itemIndex}
              >
                {itemIndex ? (
                  <CircleIcon
                    icon={ic}
                    color={constants.black1}
                    circleSize={circleSize}
                    rotate={rotate}
                    containerStyle={{
                      top: boxSize / 2 - circleSize / 2,
                      zIndex: 10,
                      marginHorizontal: 0,
                      marginRight: -12,
                      ...constants.elevationTwo,
                      shadowColor: constants.black2
                    }}
                  />
                ) : null}
                <Box
                  size={boxSize}
                  data={{
                    title: item.title,
                    helpText: item.period,
                    image: { uri: item.image },
                    action: () => {}
                  }}
                  gradients={[constants.darkGradientAlpha]}
                />
              </View>
            );
          })}
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listWrapper: {
    marginVertical: 8
  }
});

TripView.propTypes = {
  containerStyle: PropTypes.object,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
      period: PropTypes.string,
      image: PropTypes.string.isRequired
    })
  )
};

export default TripView;
