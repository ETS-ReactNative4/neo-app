const React = require("react");
const PropTypes = require("prop-types");
const createReactClass = require("create-react-class");
import { StyleSheet, Text, View, Animated, ViewPropTypes } from "react-native";
const Button = require("react-native-scrollable-tab-view/Button.ios");
import { responsiveWidth } from "react-native-responsive-dimensions";

const YourBookingsTabBar = createReactClass({
  propTypes: {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: PropTypes.object,
    tabStyle: ViewPropTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style
  },

  getDefaultProps() {
    return {
      activeTextColor: "navy",
      inactiveTextColor: "black",
      backgroundColor: null
    };
  },

  renderTabOption(name, page) {},

  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? "bold" : "normal";

    return (
      <Button
        style={{ flex: 1 }}
        key={name}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}
      >
        <View style={[styles.tab, this.props.tabStyle]}>
          <Text style={[{ color: textColor, fontWeight }, textStyle]}>
            {name}
          </Text>
        </View>
      </Button>
    );
  },

  render() {
    // const containerWidth = this.props.containerWidth;
    const containerWidth = 200;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: "absolute",
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: "navy",
      bottom: 0
    };

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs]
    });
    return (
      <View
        style={[
          styles.tabs,
          { backgroundColor: this.props.backgroundColor },
          this.props.style
        ]}
      >
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        <Animated.View
          style={[
            tabUnderlineStyle,
            {
              transform: [{ translateX }]
            },
            this.props.underlineStyle
          ]}
        />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10
  },
  tabs: {
    height: 50,
    width: 200,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: "#ccc"
  }
});

export default YourBookingsTabBar;
