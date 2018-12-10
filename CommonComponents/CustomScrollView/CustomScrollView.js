import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl
} from "react-native";
import PropTypes from "prop-types";
import { responsiveHeight } from "react-native-responsive-dimensions";

class CustomScrollView extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    onRefresh: PropTypes.func.isRequired
  };
  _refreshControlRef = React.createRef();

  componentWillUpdate() {
    // console.log(this._refreshControlRef);
    console.log(this._refreshControlRef._nativeRef);
  }

  componentDidUpdate() {
    // console.log(this._refreshControlRef);
    console.log(this._refreshControlRef._nativeRef);
  }

  render() {
    const { children, onRefresh, ...otherProps } = this.props;
    return (
      <View style={styles.customScrollContainer}>
        <ScrollView
          {...otherProps}
          refreshControl={
            <RefreshControl
              ref={e => (this._refreshControlRef = e)}
              style={{ backgroundColor: "red", height: 0, width: 0 }}
              refreshing={false}
              tintColor="transparent"
              titleColor="transparent"
              progressBackgroundColor={"transparent"}
              colors={["transparent"]}
              title={"release to refresh!"}
              progressViewOffset={-responsiveHeight(100)}
              onRefresh={onRefresh}
            />
          }
        >
          {children}
        </ScrollView>
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
