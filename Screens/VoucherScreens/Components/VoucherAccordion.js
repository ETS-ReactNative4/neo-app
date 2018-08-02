import React, { Component } from "react";
import { Text, View, StyleSheet, Animated, Easing } from "react-native";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";
import PropTypes from "prop-types";
import Accordion from "react-native-collapsible/Accordion";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

class VoucherAccordion extends Component {
  static propTypes = forbidExtraProps({
    sections: PropTypes.array.isRequired,
    containerStyle: PropTypes.object,
    openFirstSection: PropTypes.bool
  });

  state = {
    wasActiveIndex: 0
  };

  shouldComponentUpdate(nextProps) {
    return this.props === nextProps;
  }

  _renderHeader = (section, index, isActive, sections) => {
    const { wasActiveIndex } = this.state;

    const customStyle = {};

    if (isActive) {
      customStyle.borderBottomWidth = 0;

      if (wasActiveIndex !== index) {
        this.setState({
          wasActiveIndex: index
        });
      }
    }

    const iconContainer = {};
    const spinValue = new Animated.Value(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear
    }).start();

    if (isActive) {
      const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "90deg"]
      });
      iconContainer.transform = [{ rotate: spin }];
    } else if (wasActiveIndex === index) {
      const reverseSpin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["90deg", "0deg"]
      });
      iconContainer.transform = [{ rotate: reverseSpin }];
    }

    return (
      <View style={[styles.amenitiesSection, customStyle]}>
        <Text style={styles.amenitiesText}>{section.name}</Text>
        <Animated.View style={iconContainer}>
          <Icon
            name={constants.arrowRight}
            color={constants.shade2}
            size={16}
          />
        </Animated.View>
      </View>
    );
  };

  _renderContent = (section, index, isActive, sections) => {
    return section.component;
  };

  render() {
    let { containerStyle, openFirstSection } = this.props;
    if (!containerStyle) containerStyle = {};
    let otherProps = {};
    if (openFirstSection) otherProps.initiallyActiveSection = 0;
    return (
      <View style={[containerStyle]}>
        <Accordion
          sections={this.props.sections}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          underlayColor={constants.shade5}
          {...otherProps}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  amenitiesSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 24,
    borderBottomWidth: 2,
    borderBottomColor: constants.shade4
  },
  amenitiesText: {
    ...constants.font20(constants.primaryLight),
    color: constants.black2
  }
});

export default VoucherAccordion;
