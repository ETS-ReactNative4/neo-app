import React from "react";
import { inject, observer } from "mobx-react/custom";
import { Image, View } from "react-native";
import constants from "../../constants/constants";
import BookingHomeTitle from "../BookingHomeTitle/BookingHomeTitle";

const HomeTitle = inject("appState")(
  observer(({ appState, action }) => {
    const { isTripModeOn } = appState;

    if (isTripModeOn) return <BookingHomeTitle action={action} />;
    return (
      <Image
        style={{ height: 22, width: 177 }}
        resizeMode={"contain"}
        source={constants.pytLogo}
      />
    );
  })
);

export default HomeTitle;
