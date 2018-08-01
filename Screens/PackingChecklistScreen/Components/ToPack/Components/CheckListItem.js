import React from "react";
import { SwipeRow } from "react-native-swipe-list-view";
import CheckListText from "./CheckListText";
import CheckListButtons from "./CheckListButtons";
import AddCheckListItem from "./AddCheckListItem";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";

const CheckListItem = ({
  index,
  item: data,
  toggleCheckListStatus,
  addListItem,
  deleteListItem
}) => {
  const toggle = () => toggleCheckListStatus(data.type, data.key);
  return (
    <SwipeRow
      disableLeftSwipe={true}
      disableRightSwipe={data.type !== constants.customCheckListName}
      leftOpenValue={56}
      preview={data.type === constants.customCheckListName && index === 0}
      previewOpenValue={75}
      key={data.id}
    >
      {data.type === constants.customCheckListName ? (
        <CheckListButtons {...data} deleteListItem={deleteListItem} />
      ) : null}
      {data.type === "user-input" ? (
        <AddCheckListItem addListItem={addListItem} />
      ) : (
        <CheckListText {...data} toggleCheckListStatus={toggle} />
      )}
    </SwipeRow>
  );
};

CheckListItem.propTypes = forbidExtraProps({
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  toggleCheckListStatus: PropTypes.func.isRequired,
  addListItem: PropTypes.func.isRequired,
  deleteListItem: PropTypes.func.isRequired
});

export default CheckListItem;
