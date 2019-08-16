import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
  FlatList
} from "react-native";
import PropTypes from "prop-types";
import constants from "../../constants/constants";
import LineProgressBar from "../LineProgressBar/LineProgressBar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class CustomScrollView extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]).isRequired,
    onRefresh: PropTypes.func.isRequired,
    refreshing: PropTypes.bool.isRequired,
    horizontalPadding: PropTypes.number,
    scrollComponent: PropTypes.string,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    scrollRef: PropTypes.object
  };
  _refreshControlRef = React.createRef();

  render() {
    const {
      onRefresh,
      refreshing,
      horizontalPadding = 0,
      scrollComponent,
      containerStyle = {},
      scrollRef = React.createRef(),
      ...otherProps
    } = this.props;
    otherProps.refreshControl = (
      <RefreshControl
        ref={e => (this._refreshControlRef = e)}
        refreshing={false}
        tintColor={constants.firstColor}
        progressBackgroundColor={"white"}
        colors={[constants.firstColor]}
        onRefresh={onRefresh}
      />
    );
    let ScrollComponent = null;
    switch (scrollComponent) {
      case "ScrollView":
        ScrollComponent = <ScrollView ref={scrollRef} {...otherProps} />;
        break;
      case "FlatList":
        ScrollComponent = <FlatList ref={scrollRef} {...otherProps} />;
        break;
      case "KeyboardAvoidingScroll":
        ScrollComponent = (
          <KeyboardAwareScrollView ref={scrollRef} {...otherProps} />
        );
        break;
      default:
        ScrollComponent = <ScrollView ref={scrollRef} {...otherProps} />;
        break;
    }
    return (
      <View
        style={[
          styles.customScrollContainer,
          horizontalPadding ? { paddingHorizontal: horizontalPadding } : null,
          containerStyle
        ]}
      >
        <LineProgressBar
          isVisible={refreshing}
          containerStyle={{ marginLeft: -horizontalPadding }}
        />
        {ScrollComponent}
      </View>
    );
  }
}

export default CustomScrollView;

const styles = StyleSheet.create({
  customScrollContainer: {
    flex: 1,
    backgroundColor: "white"
  }
});
