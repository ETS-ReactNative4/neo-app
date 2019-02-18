import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import CheckInCheckOut from "../../Screens/VoucherScreens/Components/CheckInCheckOut";

const checkInCheckOutData = {
  checkInTitle: "PICK UP",
  checkInDate: "Feb 20, Wed",
  checkInTime: "02:00 pm",
  checkOutTitle: "DROP",
  checkOutDate: "Thu, 21 Feb",
  checkOutTime: "11:00 am"
};

storiesOf("Vouchers", module)
  .add("Check-in Check-out", () => {
    const props = {
      checkInDate: checkInCheckOutData.checkInDate,
      checkInTime: checkInCheckOutData.checkInTime,
      checkOutDate: checkInCheckOutData.checkOutDate,
      checkOutTime: checkInCheckOutData.checkOutTime
    };
    console.log(props);
    return <CheckInCheckOut {...props} />;
  })
  .add("Check-in Check-out with custom titles", () => {
    const props = { ...checkInCheckOutData };
    console.log(props);
    return <CheckInCheckOut {...props} />;
  });
