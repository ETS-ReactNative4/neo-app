import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../../constants/constants";
import Carousel from "../../../../CommonComponents/Carousel/Carousel";
import { recordEvent } from "../../../../Services/analytics/analyticsService";
import SimpleCard from "../../../../CommonComponents/SimpleCard/SimpleCard";
import WidgetTitle from "../WidgetTitle/WidgetTitle";
import resolveLinks from "../../../../Services/resolveLinks/resolveLinks";

class TripFeedCarousel extends Component {
  static propTypes = forbidExtraProps({
    containerStyle: PropTypes.object,
    title: PropTypes.string,
    elements: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
          .isRequired,
        link: PropTypes.string.isRequired,
        modalData: PropTypes.object,
        gradientColor: PropTypes.string,
        backdropColor: PropTypes.string
      })
    ).isRequired,
    backdrop: PropTypes.bool,
    widgetName: PropTypes.string
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
    const { title, containerStyle = {}, backdrop, widgetName } = this.props;
    let { elements } = this.props;
    elements = elements.map(item => {
      return {
        ...item,
        action: () => {
          if (widgetName) {
            recordEvent(constants.TripFeed.event, {
              widget: widgetName
            });
          }
          resolveLinks(item.link, item.modalData, {});
        }
      };
    });
    const boxSize = 132,
      onScrollProps = {};
    if (!this.state.isScrollRecorded) {
      onScrollProps["onScrollAction"] = () => this.scrollAction;
    }
    return (
      <View style={[styles.wrapperContainer, containerStyle]}>
        {title ? (
          <WidgetTitle title={title} containerStyle={styles.header} />
        ) : null}
        <Carousel {...onScrollProps} firstMargin={24} data={elements}>
          {backdrop
            ? elements.map((item, itemIndex) => {
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
                    backdropColor={item.backdropColor}
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
    marginVertical: 8,
    paddingVertical: 8,
    borderColor: constants.shade5,
    backgroundColor: "white"
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
