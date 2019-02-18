import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";
import constants from "../../constants/constants";
import HTMLView from "react-native-htmlview";
import containsHtml from "../../Services/containsHtml/containsHtml";

const collapsibleMinHeight = 192;

class CollapsibleTextSection extends Component {
  static propTypes = forbidExtraProps({
    content: PropTypes.string.isRequired,
    expandText: PropTypes.string
  });

  state = {
    isCollapsed: true,
    isCollapsible: undefined,
    collapsibleContainerWidth: 0
  };

  _onLayout = event => {
    if (this.state.isCollapsible === undefined) {
      const { height, width } = event.nativeEvent.layout;
      if (height > collapsibleMinHeight) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
          isCollapsible: true,
          collapsibleContainerWidth: width
        });
      }
    }
  };

  toggleCollapsible = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ isCollapsed: !this.state.isCollapsed });
  };

  render() {
    const { content, expandText, collapseText } = this.props;
    const {
      isCollapsible,
      isCollapsed,
      collapsibleContainerWidth
    } = this.state;
    const isCompressed = isCollapsible && isCollapsed;
    return (
      <View>
        <View
          style={[
            styles.collapsibleContainer,
            isCompressed ? styles.collapsedModeContainer : false
          ]}
          onLayout={this._onLayout}
        >
          <HTMLView
            addLineBreaks={false}
            value={containsHtml(content) ? content : `<div>${content}</div>`}
            stylesheet={constants.htmlStyleSheet}
          />
          {isCompressed ? (
            <LinearGradient
              locations={[0.25, 0.5, 0.8, 1]}
              colors={[
                "rgba(255,255,255,0)",
                "rgba(255,255,255,0)",
                "rgba(255,255,255,0.3)",
                "rgba(255,255,255,0.9)"
              ]}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: collapsibleMinHeight,
                width: collapsibleContainerWidth
              }}
            />
          ) : null}
        </View>
        {isCollapsible ? (
          <TouchableOpacity
            onPress={this.toggleCollapsible}
            style={styles.expandTextWrapper}
          >
            <Text style={styles.expandText}>
              {isCollapsed
                ? expandText || "Read more..."
                : collapseText || "Hide..."}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  collapsibleContainer: {
    overflow: "hidden"
  },
  collapsedModeContainer: {
    height: collapsibleMinHeight
  },
  expandTextWrapper: {
    paddingTop: 8
  },
  expandText: {
    color: constants.firstColor,
    ...constants.fontCustom(constants.primarySemiBold, 15, 17)
  }
});

export default CollapsibleTextSection;
