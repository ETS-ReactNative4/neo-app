import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import SmartImage from "../../../CommonComponents/SmartImage/SmartImage";
import FastImage from "react-native-fast-image";
import { responsiveHeight } from "react-native-responsive-dimensions";
import constants from "../../../constants/constants";

class PlaceImageContainer extends Component {
  static propTypes = forbidExtraProps({
    imageUrl: PropTypes.string.isRequired,
    isLast: PropTypes.bool.isRequired
  });

  state = {
    width: 0,
    height: 0,
    displayHeight: 0,
    displayWidth: 0,
    isPreviewOpen: false,
    resizeMode: FastImage.resizeMode.cover
  };

  componentDidMount() {
    Image.getSize(this.props.imageUrl, (width, height) => {
      this.setState({
        width,
        height: 160,
        resizeMode: FastImage.resizeMode.cover
      });
    });
  }

  previewOpened = () => {
    this.setState({
      height: responsiveHeight(100),
      resizeMode: FastImage.resizeMode.contain,
      isPreviewOpen: true
    });
  };

  previewClosed = () => {
    this.setState({
      height: 160,
      isPreviewOpen: false,
      resizeMode: FastImage.resizeMode.cover
    });
  };

  render() {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => null}>
        <SmartImage
          uri={this.props.imageUrl}
          style={[
            styles.placeImage,
            this.state.width && !this.state.isPreviewOpen
              ? { width: Math.min(this.state.width, 192) }
              : null,
            this.state.height ? { height: this.state.height } : null,
            this.props.isLast ? { marginRight: 0 } : null
          ]}
          defaultImageUri={constants.defaultPlaceImage}
          resizeMode={this.state.resizeMode}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  placeImage: {
    marginRight: 4
  }
});

export default PlaceImageContainer;
