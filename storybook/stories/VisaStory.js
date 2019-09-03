import React from "react";
import { storiesOf } from "@storybook/react-native";
import VisaWelcomeMessage from "../../Screens/VisaScreen/Components/VisaWelcomeMessage";

const userDetails = {
  name: "John",
  message: "Stay updated on your visa applications",
  numOfPax: 4,
  date: "12 July, 2019"
};

storiesOf("Visa Story", module).add("Welcome message", () => {
  const props = userDetails;
  console.log(props);
  return <VisaWelcomeMessage {...props} />;
});
