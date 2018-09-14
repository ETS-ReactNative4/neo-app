import React, { Component } from "react";
import FastImage from "react-native-fast-image";
import PropTypes from "prop-types";

class SmartImage extends Component {
  static propTypes = {
    uri: PropTypes.string.isRequired,
    priority: PropTypes.string,
    resizeMode: PropTypes.string,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.number
    ]).isRequired,
    defaultImageUri: PropTypes.string.isRequired
  };

  state = {
    defaultImageUri: this.props.defaultImageUri,
    actualImageUri: this.props.uri,
    isUsingDefaultImage: false
  };

  loadError = () => {
    if (!this.state.isUsingDefaultImage) {
      this.setState({
        actualImageUri: this.state.defaultImageUri,
        isUsingDefaultImage: true
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.uri !== prevProps.uri) {
      this.setState({
        defaultImageUri: this.props.defaultImageUri,
        actualImageUri: this.props.uri,
        isUsingDefaultImage: false
      });
    }
  }

  render() {
    const { priority, resizeMode, style } = this.props;
    const { actualImageUri } = this.state;

    return (
      <FastImage
        style={style}
        source={{
          uri: actualImageUri,
          priority: priority || FastImage.priority.normal
        }}
        onError={this.loadError}
        resizeMode={resizeMode || FastImage.resizeMode.contain}
      />
    );
  }
}

export default SmartImage;
