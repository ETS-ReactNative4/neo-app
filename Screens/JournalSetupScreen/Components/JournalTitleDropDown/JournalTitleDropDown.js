import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing
} from "react-native";
import ExpandedView from "./Components/ExpandedView";
import MinimizedView from "./Components/MinimizedView";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../constants/constants";

class JournalTitleDropDown extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isExpanded: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  componentDidMount() {
    this.setState({
      isExpanded: this.props.isExpanded
    });
  }

  render() {
    const { isExpanded } = this.state;
    return (
      <View
        style={
          isExpanded ? styles.expandedContainer : styles.minimizedContainer
        }
      >
        {isExpanded ? <ExpandedView /> : <MinimizedView />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  minimizedContainer: {
    width: responsiveWidth(100),
    height: 74,
    backgroundColor: constants.firstColor
  },
  expandedContainer: {}
});

export default JournalTitleDropDown;
