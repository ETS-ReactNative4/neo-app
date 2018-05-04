import React, { Component } from "react";
import {
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Text,
  Platform
} from "react-native";
import constants from "../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";
import PropTypes from "prop-types";

class CommonHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    LeftButton: PropTypes.element,
    RightButton: PropTypes.element,
    hideBackButton: PropTypes.bool,
    navigation: PropTypes.object.isRequired,
    TitleComponent: PropTypes.element
  };

  render() {
    const {
      RightButton,
      title,
      TitleComponent,
      navigation,
      hideBackButton,
      LeftButton
    } = this.props;

    return (
      <View style={styles.headerSection}>
        <View style={styles.headerContainer}>
          {hideBackButton ? (
            <View style={styles.placeHolder} />
          ) : LeftButton ? (
            LeftButton
          ) : (
            <TouchableHighlight
              style={styles.leftButtonContainer}
              onPress={() => navigation.goBack()}
              underlayColor={"transparent"}
            >
              <Image
                resizeMode={"contain"}
                source={constants.backArrow}
                style={styles.leftButtonIcon}
              />
            </TouchableHighlight>
          )}
          {TitleComponent ? (
            TitleComponent
          ) : (
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>{title}</Text>
            </View>
          )}
          {RightButton ? RightButton : <View style={styles.placeHolder} />}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerSection: {
    backgroundColor: "white"
  },
  headerContainer: {
    height: constants.headerHeight,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Platform.OS === "android" ? 0 : isIphoneX() ? 30 : 20
  },
  leftButtonContainer: {
    height: constants.headerHeight,
    justifyContent: "center",
    paddingHorizontal: 16
  },
  leftButtonIcon: {
    height: 24,
    width: 30
  },
  headerTextContainer: {
    height: 24,
    minWidth: 24
  },
  headerTitle: {
    ...constants.font20(constants.primarySemiBold),
    color: constants.black2
  },
  placeHolder: {
    height: 24,
    width: 62
  }
});

export default CommonHeader;
