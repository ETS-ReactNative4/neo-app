import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Carousel from "../../../../CommonComponents/Carousel/Carousel";
import PropTypes from "prop-types";
import constants from "../../../../constants/constants";
import CircleIcon from "../TripView/Components/CircleIcon";
import TokenText from "./Components/TokenText";
import { recordEvent } from "../../../../Services/analytics/analyticsService";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import resolveLinks from "../../../../Services/resolveLinks/resolveLinks";

class TripViewLite extends Component {
  static propTypes = forbidExtraProps({
    containerStyle: PropTypes.object,
    title: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        cityName: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        period: PropTypes.string.isRequired,
        image: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
          .isRequired,
        transferId: PropTypes.string,
        date: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        deepLink: PropTypes.object
      }).isRequired
    ),
    widgetName: PropTypes.string
  });

  state = {
    isScrollRecorded: false
  };

  scrollAction = () => {
    if (!this.state.isScrollRecorded) {
      recordEvent(constants.tripViewLiteScroll);
      this.setState({
        isScrollRecorded: true
      });
    }
  };

  render() {
    const { data = [], widgetName } = this.props;

    const onScrollProps = {};
    if (!this.state.isScrollRecorded) {
      onScrollProps["onScrollAction"] = () => this.scrollAction();
    }
    return (
      <View style={[styles.listWrapper]}>
        <Carousel
          {...onScrollProps}
          firstMargin={24}
          containerStyle={{
            height: 34
          }}
        >
          {data.map((item, itemIndex) => {
            const action = () => {
              if (widgetName) {
                recordEvent(constants.TripFeed.event, {
                  widget: widgetName
                });
              }
              resolveLinks(item.link, {
                selectedDate: JSON.stringify(item.date)
              });
            };
            const circleAction = () => {
              if (widgetName) {
                recordEvent(constants.TripFeed.event, {
                  widget: `${widgetName}_CIRCLE`
                });
              }
              resolveLinks(false, false, item.deepLink);
            };
            const rotate = item.icon === "flight" ? "90deg" : "0deg";
            return (
              <TouchableOpacity
                onPress={action}
                activeOpacity={0.9}
                style={{ flex: 1, flexDirection: "row" }}
                key={itemIndex}
              >
                {itemIndex ? (
                  <CircleIcon
                    icon={item.icon}
                    rotate={rotate}
                    action={circleAction}
                  />
                ) : null}
                <TokenText text={item.cityName} />
              </TouchableOpacity>
            );
          })}
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listWrapper: {
    marginVertical: 16,
    paddingVertical: 8,
    borderColor: constants.shade5,
    backgroundColor: "white"
  }
});

export default TripViewLite;
