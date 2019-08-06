import React from "react";
import { storiesOf } from "@storybook/react-native";
import HelpSectionTile from "../../Screens/SupportCenterScreen/Components/HelpSectionTile";
import constants from "../../constants/constants";

const helpDeskSectionTitle = "";

const helpDeskOptions = [
  {
    icon: constants.busIcon,
    title: "Payment Related",
    action: () => null
  },
  {
    icon: constants.busIcon,
    title: "Visa Related",
    action: () => null
  },
  {
    icon: constants.busIcon,
    title: "Itinerary Related",
    action: () => null
  },
  {
    icon: constants.busIcon,
    title: "Vouchers",
    action: () => null
  }
];

storiesOf("Help Desk Story", module)
  .add("Help Section Tile", () => {
    const props = helpDeskOptions[0];
    console.log(props);
    return <HelpSectionTile {...props} />;
  })
  .add("Help Section Group", () => {});
