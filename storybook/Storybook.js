import React from "react";
import { StyleSheet } from "react-native";
import {
  getStorybookUI,
  addDecorator,
  configure
} from "@storybook/react-native";
import { View } from "react-native";

import "./rn-addons";
import constants from "../constants/constants";

addDecorator(story => (
  <View
    style={{
      flex: 1,
      backgroundColor: "white",
      borderColor: constants.shade3,
      borderWidth: StyleSheet.hairlineWidth
    }}
  >
    {story()}
  </View>
));

configure(() => {
  require("./stories/TripFeedStory");
}, module);

const StorybookUIRoot = getStorybookUI({});

export default StorybookUIRoot;
