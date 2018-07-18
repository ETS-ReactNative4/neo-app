import React from "react";
import { SwipeRow } from "react-native-swipe-list-view";
import CheckListText from "./CheckListText";
import CheckListButtons from "./CheckListButtons";
import AddCheckListItem from "./AddCheckListItem";
import constants from "../../../../../constants/constants";

const CheckListItem = ({
  index,
  item: data,
  toggleCheckListStatus,
  deleteCheckListItem,
  addListItem
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
        <CheckListButtons {...data} deleteCheckListItem={deleteCheckListItem} />
      ) : null}
      {data.type === "user-input" ? (
        <AddCheckListItem addListItem={addListItem} />
      ) : (
        <CheckListText {...data} toggleCheckListStatus={toggle} />
      )}
    </SwipeRow>
  );
};

export default CheckListItem;
