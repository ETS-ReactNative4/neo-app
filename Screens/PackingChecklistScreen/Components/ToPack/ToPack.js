import React, { Component } from "react";
import PropTypes from "prop-types";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import CheckListItem from "./Components/CheckListItem";
import CheckListSection from "./Components/CheckListSection";
import { View } from "react-native";
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
            type: PropTypes.string.isRequired
          })
        ).isRequired
      })
    ).isRequired,
    toggleCheckListStatus: PropTypes.func.isRequired,
    deleteCheckListItem: PropTypes.func.isRequired
  };

  render() {
    const { listItems } = this.props;
    const CheckListComponent = props => (
      <CheckListItem
        {...props}
        toggleCheckListStatus={this.props.toggleCheckListStatus}
        deleteCheckListItem={this.props.deleteCheckListItem}
      />
    );

    return (
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
    );
  }
}

export default ToPack;
