import React, { Component, ReactNode } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  FlatList,
  ScrollViewProps,
  StyleProp,
  ViewStyle
} from "react-native";
import LineProgressBar from "../LineProgressBar/LineProgressBar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CONSTANT_firstColor } from "../../constants/colorPallete";

export interface ICustomScrollViewProps extends ScrollViewProps {
  children?: ReactNode;
  onRefresh?: () => any;
  refreshing?: boolean;
  horizontalPadding?: number;
  scrollComponent?: "ScrollView" | "FlatList" | "KeyboardAvoidingScroll";
  containerStyle?: StyleProp<ViewStyle>;
  scrollRef?: object;
}

class CustomScrollView extends Component<ICustomScrollViewProps> {
  _refreshControlRef = React.createRef();

  render() {
    const {
      onRefresh = () => null,
      refreshing = false,
      horizontalPadding = 0,
      scrollComponent = "ScrollView",
      containerStyle = {},
      scrollRef = React.createRef(),
      ...otherProps
    } = this.props;
    otherProps.refreshControl = (
      <RefreshControl
        // @ts-ignore
        ref={e => (this._refreshControlRef = e)}
        refreshing={false}
        tintColor={CONSTANT_firstColor}
        progressBackgroundColor={"white"}
        colors={[CONSTANT_firstColor]}
        onRefresh={onRefresh}
      />
    );
    let ScrollComponent = null;
    switch (scrollComponent) {
      case "ScrollView":
        // @ts-ignore
        ScrollComponent = <ScrollView ref={scrollRef} {...otherProps} />;
        break;
      case "FlatList":
        // @ts-ignore
        ScrollComponent = <FlatList ref={scrollRef} {...otherProps} />;
        break;
      case "KeyboardAvoidingScroll":
        ScrollComponent = (
          // @ts-ignore
          <KeyboardAwareScrollView ref={scrollRef} {...otherProps} />
        );
        break;
      default:
        // @ts-ignore
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
