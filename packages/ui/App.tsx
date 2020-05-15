import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { configure, getStorybookUI } from "@storybook/react-native";

import "./rn-addons";

configure(() => {
  require("./src/components/index.stories");
}, module);

const StorybookUIRoot = getStorybookUI({
  asyncStorage: null,
});

export default () => (
  <SafeAreaProvider>
    <StorybookUIRoot />
  </SafeAreaProvider>
);
