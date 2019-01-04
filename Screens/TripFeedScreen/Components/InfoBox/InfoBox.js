import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../../constants/constants";
import resolveLinks from "../../../../Services/resolveLinks/resolveLinks";

class InfoBox extends Component {
  static propTypes = forbidExtraProps({
    title: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    content: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    boxStyle: PropTypes.object,
    titleStyle: PropTypes.object
  });

  render() {
    const {
      title,
      image,
      content,
      boxStyle = {},
      titleStyle = {}
    } = this.props;
    let { action } = this.props;
    action = () => resolveLinks(action);
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
    marginHorizontal: 24,
    marginVertical: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: constants.shade5,
    backgroundColor: "white",
    ...constants.elevationFive
  },
  imageBackground: {
    height: 160,
    overflow: "hidden",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  contentView: {
    padding: 16
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
    marginVertical: 8,
    marginTop: 0,
    ...constants.fontCustom(constants.primaryRegular, 20, 24),
    color: constants.black1
  }
});

export default InfoBox;
