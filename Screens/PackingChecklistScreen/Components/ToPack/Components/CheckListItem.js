import React from "react";
import { SwipeRow } from "react-native-swipe-list-view";
import CheckListText from "./CheckListText";
import CheckListButtons from "./CheckListButtons";

const CheckListItem = ({ index, item: data }, rowMap) => {
  return (
    <SwipeRow
      disableRightSwipe={false}
      disableLeftSwipe={false}
      leftOpenValue={20}
      rightOpenValue={-150}
      preview={true}
      previewOpenValue={75}
      key={data.id}
    >
      <CheckListButtons />
      <CheckListText {...data} />
    </SwipeRow>
  );
};

export default CheckListItem;
