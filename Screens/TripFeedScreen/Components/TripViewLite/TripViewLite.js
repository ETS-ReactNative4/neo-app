import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Carousel from "../../../../CommonComponents/Carousel/Carousel";
import PropTypes from "prop-types";
import constants from "../../../../constants/constants";
import CircleIcon from "./Components/CircleIcon";
import TokenText from "./Components/TokenText";
import { recordEvent } from "../../../../Services/analytics/analyticsService";

class TripViewLite extends Component {
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
    const { data = [] } = this.props;
    const iconTypes = {
      FLIGHT: constants.aeroplaneIcon,
      CAR: constants.carIcon,
      BUS: constants.busIcon,
      TRAIN: constants.trainIcon,
      FERRY: constants.ferryIcon
    };

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
            const rotate = item.icon === "FLIGHT" ? "90deg" : "0deg";
            const ic = iconTypes[item.icon];
            return (
              <View style={{ flex: 1, flexDirection: "row" }} key={itemIndex}>
                {itemIndex ? <CircleIcon icon={ic} rotate={rotate} /> : null}
                <TokenText text={item.title} />
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
    marginVertical: 16
  }
});

TripViewLite.propTypes = {
  containerStyle: PropTypes.object,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string
    })
  )
};

export default TripViewLite;
