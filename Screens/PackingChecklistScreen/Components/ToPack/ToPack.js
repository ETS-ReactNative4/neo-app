import React, { Component } from "react";
import PropTypes from "prop-types";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import CheckListItem from "./Components/CheckListItem";
import CheckListSection from "./Components/CheckListSection";
import { Keyboard, View, Platform } from "react-native";
import EmptyListPlaceholder from "../../../../CommonComponents/EmptyListPlaceholder/EmptyListPlaceholder";

class ToPack extends Component {
  static propTypes = {
    listItems: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            item: PropTypes.string.isRequired,
            isComplete: PropTypes.bool.isRequired,
            type: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired
          })
        ).isRequired
      })
    ).isRequired,
    navigation: PropTypes.object.isRequired,
    toggleCheckListStatus: PropTypes.func.isRequired,
    addListItem: PropTypes.func.isRequired,
    deleteListItem: PropTypes.func.isRequired,
    enableKeyboardListener: PropTypes.bool,
    isPackedEmpty: PropTypes.bool.isRequired,
    tabLabel: PropTypes.string.isRequired
  };

  state = {
    keyboardSpace: 0
  };
  _didFocusSubscription;
  _willBlurSubscription;
  _keyboardDidShowListener;
  _keyboardDidHideListener;

  constructor(props) {
    super(props);

    if (Platform.OS === "ios" && this.props.enableKeyboardListener) {
      this._didFocusSubscription = props.navigation.addListener(
        "didFocus",
        () => {
          this._keyboardDidShowListener = Keyboard.addListener(
            "keyboardWillChangeFrame",
            this.keyboardDidShow
          );
          this._keyboardDidHideListener = Keyboard.addListener(
            "keyboardWillHide",
            this.keyboardDidHide
          );
        }
      );
    }
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () => {
        this._keyboardDidShowListener && this._keyboardDidShowListener.remove();
        this._keyboardDidHideListener && this._keyboardDidHideListener.remove();
      }
    );
  }

  keyboardDidShow = e => {
    this.setState({
      keyboardSpace: e.endCoordinates.height
    });
  };

  keyboardDidHide = () => {
    this.setState({
      keyboardSpace: 0
    });
  };

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  render() {
    const { listItems, deleteListItem, isPackedEmpty, tabLabel } = this.props;

    const isPackedTab = tabLabel === "PACKED";

    if (isPackedEmpty)
      return (
        <EmptyListPlaceholder
          text={"Looks like you haven't started packing yet!"}
        />
      );

    const CheckListComponent = ({ index, item, section, separators }) => (
      <CheckListItem
        index={index}
        item={item}
        toggleCheckListStatus={this.props.toggleCheckListStatus}
        deleteListItem={deleteListItem}
        addListItem={this.props.addListItem}
        isPackedTab={isPackedTab}
      />
    );

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <SwipeListView
            useSectionList
            sections={listItems}
            renderItem={CheckListComponent}
            stickySectionHeadersEnabled={true}
            renderSectionHeader={CheckListSection}
          />
        </View>
        {this.state.keyboardSpace ? (
          <View
            style={{ flex: 0, height: this.state.keyboardSpace, width: 200 }}
          />
        ) : null}
      </View>
    );
  }
}

export default ToPack;
