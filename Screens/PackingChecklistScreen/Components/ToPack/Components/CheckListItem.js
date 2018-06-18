import React from "react";
import { SwipeRow } from "react-native-swipe-list-view";
import CheckListText from "./CheckListText";
import CheckListButtons from "./CheckListButtons";

const CheckListItem = ({
  index,
  item: data,
  toggleCheckListStatus,
  deleteCheckListItem,
  rowMap
}) => {
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
      <CheckListText {...data} toggleCheckListStatus={toggleCheckListStatus} />
    </SwipeRow>
  );
};

export default CheckListItem;
