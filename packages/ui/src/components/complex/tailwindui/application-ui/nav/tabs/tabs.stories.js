import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Tabs } from "./tabs";

export default {
  title: `TailwindUI/Application UI/Nav/Tabs`,
};

// Export to Storybook
export { Tabs };

// Export to Expo
storiesOf(
  "TailwindUI/Application UI/Nav/Tabs",
  module
).add("Tabs", () => <Tabs />);
