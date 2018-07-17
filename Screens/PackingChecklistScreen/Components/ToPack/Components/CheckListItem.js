import React from "react";
import { SwipeRow } from "react-native-swipe-list-view";
import CheckListText from "./CheckListText";
import CheckListButtons from "./CheckListButtons";
import AddCheckListItem from "./AddCheckListItem";

const CheckListItem = ({
  index,
  item: data,
  toggleCheckListStatus,
  deleteCheckListItem
}) => {
  const toggle = () => toggleCheckListStatus(data.type, data.key);
  return (
    <SwipeRow
      disableLeftSwipe={true}
      disableRightSwipe={data.type !== "Your list"}
      leftOpenValue={56}
      preview={data.type === "Your list" && index === 0}
      previewOpenValue={75}
      key={data.id}
    >
      {data.type === "Your list" ? (
        <CheckListButtons {...data} deleteCheckListItem={deleteCheckListItem} />
      ) : null}
      {data.type === "user-input" ? (
        <AddCheckListItem />
      ) : (
        <CheckListText {...data} toggleCheckListStatus={toggle} />
      )}
    </SwipeRow>
  );
};

export default CheckListItem;
