import React from "react";
import { storiesOf } from "@storybook/react-native";
import SupportOfflineMessage from "../../Screens/ChatScreen/Components/SupportOfflineMessage";

storiesOf("Chat Screen story", module).add("Support Offline Message", () => {
  return <SupportOfflineMessage />;
});
