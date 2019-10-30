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
import { isIphoneX } from "react-native-iphone-x-helper";

addDecorator(story => (
  <View
    style={{
      flex: 1,
      backgroundColor: constants.white1,
      borderColor: constants.shade3,
      borderWidth: StyleSheet.hairlineWidth,
      marginTop: isIphoneX() ? constants.xNotchHeight : 0
    }}
  >
    {story()}
  </View>
));

configure(() => {
  require("./stories/CommonComponentsStory");
  require("./stories/TripFeedStory");
  require("./stories/PackagesPageStory");
  require("./stories/VouchersStory");
  require("./stories/ForexStory");
  require("./stories/PaymentsStory");
  require("./stories/HelpDeskStory");
  require("./stories/VisaStory");
  require("./stories/SmartImageStory");
}, module);

const StorybookUIRoot = getStorybookUI({});

export const shouldIncludeStoryBook = () => __DEV__ || !isProduction();

export default StorybookUIRoot;
