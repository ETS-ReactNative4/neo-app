import React from "react";
import { View, ScrollView, Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import CheckInCheckOut from "../../Screens/VoucherScreens/Components/CheckInCheckOut";
import CollapsibleTextSection from "../../CommonComponents/CollapsibleTextSection/CollapsibleTextSection";

const checkInCheckOutData = {
  checkInTitle: "PICK UP",
  checkInDate: "Feb 20, Wed",
  checkInTime: "02:00 pm",
  checkOutTitle: "DROP",
  checkOutDate: "Thu, 21 Feb",
  checkOutTime: "11:00 am"
};

const htmlData = `
<div>
  Instructions
  <ul>
    <li>Upon arrival, phone 0800 935050 and let us know that you are ready to be picked up (Airport free phones are located near the baggage collection area)</li>
    <li>Upon arrival, phone 0800 935050 and let us know that you are ready to be picked up (Airport free phones are located near the baggage collection area)</li>
    <li>Upon arrival, phone 0800 935050 and let us know that you are ready to be picked up (Airport free phones are located near the baggage collection area)</li>
    <li>Upon arrival, phone 0800 935050 and let us know that you are ready to be picked up (Airport free phones are located near the baggage collection area)</li>
    <li>Upon arrival, phone 0800 935050 and let us know that you are ready to be picked up (Airport free phones are located near the baggage collection area)</li>
  </ul>
</div>
`;

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
  })
  .add("Collapsible Text Section", () => {
    const props = {
      content: htmlData
    };
    console.log(props);
    return (
      <ScrollView>
        <CollapsibleTextSection {...props} />
      </ScrollView>
    );
  })
  .add("Collapsible Text Section short string", () => {
    const props = {
      content: "This is a shorter text and doesn't need to be collapsed"
    };
    console.log(props);
    return (
      <ScrollView>
        <CollapsibleTextSection {...props} />
      </ScrollView>
    );
  })
  .add("Collapsible Text Section custom collapse cta", () => {
    const props = {
      expandText: "Click here to expand content",
      collapseText: "Click here to collapse content",
      content: htmlData
    };
    console.log(props);
    return (
      <ScrollView>
        <CollapsibleTextSection {...props} />
      </ScrollView>
    );
  });
