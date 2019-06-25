import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  StatusBar
} from "react-native";
import ExpandedView from "./Components/ExpandedView";
import MinimizedView from "./Components/MinimizedView";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import constants from "../../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import Icon from "../../../../CommonComponents/Icon/Icon";
import { isIphoneX } from "react-native-iphone-x-helper";

class JournalTitleDropDown extends Component {
  static propTypes = forbidExtraProps({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    coverImage: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
      .isRequired,
    journalOwner: PropTypes.string.isRequired,
    journalPublishedTime: PropTypes.string,
    journalCreatedTime: PropTypes.string,
    editAction: PropTypes.func.isRequired,
    isJournalPublished: PropTypes.bool
  });

  constructor(props) {
    super(props);
  }

  state = {
    isExpanded: false,
    spinAnimationTiming: new Animated.Value(0)
  };

  toggleExpansion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState(
      {
        isExpanded: !this.state.isExpanded
      },
      () => {
        if (this.state.isExpanded) {
          this.spinArrow();
        } else {
          this.reverseSpinArrow();
        }
      }
    );
  };

  spinArrow = () => {
    Animated.timing(this.state.spinAnimationTiming, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  };

  reverseSpinArrow = () => {
    Animated.timing(this.state.spinAnimationTiming, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  };

  render() {
    const { isExpanded } = this.state;
    const {
      title,
      desc,
      coverImage,
      journalOwner,
      journalPublishedTime,
      editAction,
      journalCreatedTime,
      isJournalPublished
    } = this.props;

    const spin = this.state.spinAnimationTiming.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"]
    });

    return (
      <View
        style={
          isExpanded ? styles.expandedContainer : styles.minimizedContainer
        }
      >
        <ExpandedView
          editAction={editAction}
          journalOwner={journalOwner}
          journalPublishedTime={journalPublishedTime}
          isHidden={!isExpanded}
          coverImage={coverImage}
          title={title}
          desc={desc}
          journalCreatedTime={journalCreatedTime}
          isJournalPublished={isJournalPublished}
        />

        <MinimizedView
          isHidden={isExpanded}
          title={title}
          desc={`By ${journalOwner}${
            isJournalPublished
              ? `, ${journalPublishedTime}`
              : `, ${journalCreatedTime}`
          }`}
        />

        <TouchableOpacity
          style={styles.arrowContainer}
          activeOpacity={0.8}
          onPress={this.toggleExpansion}
        >
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <Icon name={constants.arrowDown} color={"white"} size={16} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}

const headerHeight = constants.headerHeight;
const tabBarHeight = 50;

const androidStatusBarHeight =
  Platform.OS === constants.platformAndroid ? StatusBar.currentHeight : 0;

const xNotchHeight = constants.xNotchHeight;
const xSensorAreaHeight = constants.xSensorAreaHeight;
const xArea = isIphoneX() ? xNotchHeight + xSensorAreaHeight : 0;

const availableAreaHeight =
  responsiveHeight(100) -
  tabBarHeight -
  headerHeight -
  xArea -
  androidStatusBarHeight;

const styles = StyleSheet.create({
  minimizedContainer: {
    width: responsiveWidth(100),
    height: 74,
    backgroundColor: constants.firstColor
  },
  arrowContainer: {
    padding: 16,
    position: "absolute",
    top: 16,
    right: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  expandedContainer: {
    backgroundColor: "white",
    height: availableAreaHeight,
    width: responsiveWidth(100)
  }
});

export default JournalTitleDropDown;
