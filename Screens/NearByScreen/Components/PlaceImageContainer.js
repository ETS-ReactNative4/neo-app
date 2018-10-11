import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import SmartImage from "../../../CommonComponents/SmartImage/SmartImage";
import FastImage from "react-native-fast-image";
import Lightbox from "react-native-lightbox";
import { responsiveHeight } from "react-native-responsive-dimensions";

class PlaceImageContainer extends Component {
  static propTypes = forbidExtraProps({
    imageUrl: PropTypes.string.isRequired,
    isLast: PropTypes.bool.isRequired
  });

  state = {
    width: 0,
    height: 0
  };

  componentDidMount() {
    Image.getSize(this.props.imageUrl, (width, height) => {
      this.setState({ width, height });
    });
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => null}>
        <Lightbox
          renderContent={() => {
            return (
              <SmartImage
                uri={this.props.imageUrl}
                style={{
                  height: responsiveHeight(100)
                }}
                defaultImageUri={
                  "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg"
                }
                resizeMode={FastImage.resizeMode.contain}
              />
            );
          }}
        >
          <SmartImage
            uri={this.props.imageUrl}
            style={[
              styles.placeImage,
              this.state.width
                ? { width: Math.min(this.state.width, 192) }
                : null,
              this.props.isLast ? { marginRight: 0 } : null
            ]}
            defaultImageUri={
              "http://pickyourtrail-guides-images.imgix.net/country/1820xh/bali.jpg"
            }
            resizeMode={FastImage.resizeMode.cover}
          />
        </Lightbox>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  placeImage: {
    width: 192,
    height: 160,
    marginRight: 4
  }
});

export default PlaceImageContainer;
