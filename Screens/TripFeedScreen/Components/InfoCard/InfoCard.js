import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../../constants/constants";
import resolveLinks from "../../../../Services/resolveLinks/resolveLinks";
import { recordEvent } from "../../../../Services/analytics/analyticsService";

class InfoCard extends Component {
  static propTypes = forbidExtraProps({
    title: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    content: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    boxStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    modalData: PropTypes.object,
    widgetName: PropTypes.string
  });

  render() {
    const {
      title,
      image,
      content,
      link,
      boxStyle = {},
      titleStyle = {},
      modalData,
      widgetName
    } = this.props;
    const action = () => {
      if (widgetName) {
        recordEvent(constants.TripFeed.event, {
          widget: widgetName
        });
      }
      resolveLinks(link, modalData, {});
    };
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={action}
        style={[styles.box, boxStyle]}
      >
        {image ? (
          <FastImage
            style={styles.imageBackground}
            resizeMode={FastImage.resizeMode.cover}
            source={image}
          />
        ) : null}
        <View style={styles.contentView}>
          <View style={styles.header}>
            <Text style={[styles.boxTitle, titleStyle]} numberOfLines={2}>
              {title}
            </Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.bodyText}>{content}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 5,
    marginTop: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: constants.shade5,
    backgroundColor: "white"
  },
  imageBackground: {
    height: 160,
    overflow: "hidden",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    marginHorizontal: 24,
    marginTop: 16
  },
  contentView: {
    paddingVertical: 16,
    paddingHorizontal: 24
  },
  header: {},
  body: {
    padding: 0
  },
  bodyText: {
    ...constants.fontCustom(constants.primaryLight, 15, 18),
    color: constants.black1
  },
  boxTitle: {
    marginBottom: 8,
    ...constants.fontCustom(constants.primaryRegular, 20, 24),
    color: constants.black1
  }
});

export default InfoCard;
