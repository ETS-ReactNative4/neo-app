import React from "react";
import { StyleSheet } from "react-native";
import {
  getStorybookUI,
  addDecorator,
  configure
} from "@storybook/react-native";
import { View, Platform } from "react-native";

import "./rn-addons";
import constants from "../constants/constants";
import { isProduction } from "../Services/getEnvironmentDetails/getEnvironmentDetails";

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
  require("./stories/PackagesPageStory");
  require("./stories/VouchersStory");
}, module);

const StorybookUIRoot = getStorybookUI({});

export const shouldIncludeStoryBook = () => __DEV__ || !isProduction();

export default StorybookUIRoot;
