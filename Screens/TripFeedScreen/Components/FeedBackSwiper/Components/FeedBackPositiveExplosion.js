import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Vector } from "react-native-particles/";
import { BurstAndMoveEmitter } from "react-native-particles";
import { Emitter } from "react-native-particles";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import Icon from "../../../../../CommonComponents/Icon/Icon";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";

class FeedBackPositiveExplosion extends Component {
  static propTypes = {
    emitterRef: PropTypes.func.isRequired,
    emitterComponent: PropTypes.object.isRequired
  };

  _emitter = React.createRef();

  start() {
    this.props.emitterComponent.start();
  }

  stopEmitting() {
    this.props.emitterComponent.stopEmitting();
  }

  render() {
    return (
      <BurstAndMoveEmitter
        autoStart={false}
        numberOfParticles={1}
        interval={100}
        emissionRate={4}
        particleContainerStyle={styles.particleContainer}
        particleLife={3000}
        fromPosition={Vector(responsiveWidth(50), responsiveHeight(40))}
        finalPoint={Vector(responsiveWidth(50) - 24, responsiveHeight(75))}
        ref={this.props.emitterRef}
        radius={100}
      >
        <View style={styles.feedBackIconContainer}>
          <Icon
            name={constants.thumbsUpIcon}
            color={constants.firstColor}
            size={22}
          />
        </View>
      </BurstAndMoveEmitter>
    );
  }
}

/*
<Emitter
  autoStart={false}
  numberOfParticles={25}
  interval={0}
  emissionRate={25}
  particleLife={3000}
  direction={-90}
  spread={150}
  speed={8}
  segments={100}
  width={responsiveWidth(100)}
  height={responsiveHeight(100)}
  fromPosition={{ x: responsiveWidth(50), y: responsiveHeight(50) }}
  particleStyle={styles.emitter}
  gravity={0.2}
  ref={emitter => (this._emitter = emitter)}
>
</Emitter>
*/

const styles = StyleSheet.create({
  particleContainer: {
    elevation: 2,
    zIndex: 2
  },
  feedBackIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: constants.shade4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  }
});

export default FeedBackPositiveExplosion;
