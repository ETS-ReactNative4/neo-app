import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PropTypes } from "prop-types";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../../constants/constants";
import Carousel from "../../../../CommonComponents/Carousel/Carousel";
import { recordEvent } from "../../../../Services/analytics/analyticsService";
import SimpleCard from "../../../../CommonComponents/SimpleCard/SimpleCard";
import WidgetTitle from "../WidgetTitle/WidgetTitle";

class TripFeedCarousel extends Component {
  static propTypes = forbidExtraProps({
    containerStyle: PropTypes.object,
    title: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
          .isRequired,
        action: PropTypes.func.isRequired
      })
    ).isRequired,
    hasBackdrop: PropTypes.bool,
    backdropColor: PropTypes.string
  });

  state = {
    isScrollRecorded: false
  };

  scrollAction = () => {
    if (!this.state.isScrollRecorded) {
      recordEvent(constants.tripHighlightsScroll);
      this.setState({
        isScrollRecorded: true
      });
    }
  };

  render() {
    const {
      data,
      title,
      containerStyle = {},
      hasBackdrop,
      backdropColor = constants.black1
    } = this.props;
    const boxSize = 132,
      onScrollProps = {};
    if (!this.state.isScrollRecorded) {
      onScrollProps["onScrollAction"] = () => this.scrollAction;
    }
    return (
      <View style={[styles.wrapperContainer, containerStyle]}>
        <WidgetTitle title={title} containerStyle={styles.header} />
        <Carousel {...onScrollProps} firstMargin={24} data={data}>
          {hasBackdrop
            ? data.map((item, itemIndex) => {
                return (
                  <SimpleCard
                    key={itemIndex}
                    title={item.title}
                    image={item.image}
                    action={item.action}
                    containerStyle={{
                      width: boxSize,
                      height: boxSize
                    }}
                    imageStyle={{
                      height: boxSize * 0.8
                    }}
                    textStyle={{
                      ...constants.fontCustom(constants.primaryRegular, 13),
                      color: "white"
                    }}
                    backdropColor={backdropColor}
                  />
                );
              })
            : null}
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperContainer: {
    marginVertical: 8
  },
  header: {
    marginHorizontal: 24
  },
  title: {
    ...constants.fontCustom(constants.primaryRegular, 13),
    fontWeight: "bold",
    color: constants.shade2
  }
});

export default TripFeedCarousel;
