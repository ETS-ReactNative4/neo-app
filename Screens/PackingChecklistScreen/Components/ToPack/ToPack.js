import React, { Component } from "react";
import PropTypes from "prop-types";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import CheckListItem from "./Components/CheckListItem";
import CheckListSection from "./Components/CheckListSection";

class ToPack extends Component {
  static propTypes = {
    listItems: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            item: PropTypes.string.isRequired,
            isComplete: PropTypes.bool.isRequired
          })
        ).isRequired
      })
    ).isRequired
  };

  render() {
    const { listItems } = this.props;
    return (
      <SwipeListView
        useSectionList
        sections={listItems}
        renderItem={CheckListItem}
        renderSectionHeader={CheckListSection}
      />
    );
  }
}

export default ToPack;
