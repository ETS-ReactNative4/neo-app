import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PropTypes } from "prop-types";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../../constants/constants";
import Carousel from "../../../../CommonComponents/Carousel/Carousel";
import { recordEvent } from "../../../../Services/analytics/analyticsService";
import Box from "../../../../CommonComponents/Box/Box";

class TripHighlights extends Component {
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
    const { data, title, containerStyle = {} } = this.props;
    const boxSize = 132,
      onScrollProps = {};
    if (!this.state.isScrollRecorded) {
      onScrollProps["onScrollAction"] = () => this.scrollAction;
    }
    return (
      <View style={[styles.wrapperContainer, containerStyle]}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Carousel
          {...onScrollProps}
          firstMargin={24}
          containerStyle={{
            height: boxSize + 8
          }}
        >
          {data.map((item, itemIndex) => {
            return (
              <Box
                key={itemIndex}
                showBar
                size={boxSize}
                data={{
                  title: item.title,
                  image: { uri: item.image },
                  action: () => {}
                }}
                gradients={[constants.black1]}
                titleStyle={{
                  fontSize: 13,
                  fontWeight: "400"
                }}
              />
            );
          })}
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

TripHighlights.propTypes = forbidExtraProps({
  containerStyle: PropTypes.object,
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired
});

export default TripHighlights;
