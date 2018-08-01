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
    toggleCheckListStatus: PropTypes.func.isRequired,
    addListItem: PropTypes.func.isRequired,
    deleteListItem: PropTypes.func.isRequired
  };

  state = {
    keyboardSpace: 0
  };
  keyboardDidShowListener = {};
  keyboardDidHideListener = {};

  componentDidMount() {
    if (Platform.OS === "ios") {
      this.keyboardDidShowListener = Keyboard.addListener(
        "keyboardWillChangeFrame",
        this.keyboardDidShow
      );
      this.keyboardDidHideListener = Keyboard.addListener(
        "keyboardWillHide",
        this.keyboardDidHide
      );
    }
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
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {
    const { listItems, deleteListItem } = this.props;
    const CheckListComponent = ({ index, item, section, separators }) => (
      <CheckListItem
        index={index}
        item={item}
        toggleCheckListStatus={this.props.toggleCheckListStatus}
        deleteListItem={deleteListItem}
        addListItem={this.props.addListItem}
      />
    );

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <SwipeListView
            useSectionList
            sections={listItems}
            renderItem={CheckListComponent}
            renderSectionHeader={CheckListSection}
            renderSectionFooter={({ section }) => {
              if (!section.data.length) {
                return (
                  <EmptyListPlaceholder
                    text={`No Items in this Section`}
                    containerStyle={{ marginVertical: 24 }}
                  />
                );
              }
              return null;
            }}
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
