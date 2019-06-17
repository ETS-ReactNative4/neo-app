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
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";

class JournalTitleDropDown extends Component {
  static propTypes = forbidExtraProps({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired
  });

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
    const { title, desc } = this.props;
    return (
      <View
        style={
          isExpanded ? styles.expandedContainer : styles.minimizedContainer
        }
      >
        {isExpanded ? (
          <ExpandedView />
        ) : (
          <MinimizedView title={title} desc={desc} />
        )}
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
