import React from "react";
import { SwipeRow } from "react-native-swipe-list-view";
import CheckListText from "./CheckListText";
import CheckListButtons from "./CheckListButtons";

const CheckListItem = ({
  index,
  item: data,
  toggleCheckListStatus,
  rowMap
}) => {
  return (
    <SwipeRow
      disableLeftSwipe={true}
      leftOpenValue={20}
      rightOpenValue={-150}
      preview={true}
      previewOpenValue={75}
      key={data.id}
    >
      <CheckListButtons />
      <CheckListText {...data} toggleCheckListStatus={toggleCheckListStatus} />
    </SwipeRow>
  );
};

export default CheckListItem;
