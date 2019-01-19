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

class CustomScrollView extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]).isRequired,
    onRefresh: PropTypes.func.isRequired,
    refreshing: PropTypes.bool.isRequired,
    horizontalPadding: PropTypes.number,
    scrollComponent: PropTypes.string
  };
  _refreshControlRef = React.createRef();

  render() {
    const {
      onRefresh,
      refreshing,
      horizontalPadding,
      scrollComponent,
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
        ScrollComponent = <ScrollView {...otherProps} />;
        break;
      case "FlatList":
        ScrollComponent = <FlatList {...otherProps} />;
        break;
      default:
        ScrollComponent = <ScrollView {...otherProps} />;
        break;
    }
    return (
      <View
        style={[
          styles.customScrollContainer,
          horizontalPadding ? { paddingHorizontal: horizontalPadding } : null
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
