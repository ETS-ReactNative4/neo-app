import { getStorybookUI, configure } from "@storybook/react-native";

import "./rn-addons";

// import stories
configure(() => {}, module);

const StorybookUIRoot = getStorybookUI({});

export default StorybookUIRoot;
