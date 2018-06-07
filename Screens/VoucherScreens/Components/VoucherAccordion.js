import React, { Component } from "react";
import { Text, View, StyleSheet, Animated, Easing } from "react-native";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";
import Accordion from "react-native-collapsible/Accordion";

class VoucherAccordion extends Component {
  _renderHeader = (section, index, isActive, sections) => {
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
    } else {
      const reverseSpin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["90deg", "0deg"]
      });
      iconContainer.transform = [{ rotate: reverseSpin }];
    }

    return (
      <View style={styles.amenitiesSection}>
        <Text style={styles.amenitiesText}>Hotel amenities</Text>
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
    return <View />;
  };

  render() {
    const sections = [
      {
        name: "Hotel Amenities",
        data: {
          name: "My Hotel"
        }
      }
    ];
    return (
      <View>
        <Accordion
          sections={sections}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          underlayColor={constants.shade5}
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
