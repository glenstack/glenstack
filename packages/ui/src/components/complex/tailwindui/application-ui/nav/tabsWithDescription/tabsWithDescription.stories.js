import React from "react";
import { storiesOf } from "@storybook/react-native";
import { TabsWithDescription } from "./tabsWithDescription";

export default {
  title: `TailwindUI/Application UI/Nav/TabsWithDescription`,
};

// Export to Storybook
export { TabsWithDescription };

// Export to Expo
storiesOf(
  "TailwindUI/Application UI/Nav/TabsWithDescription",
  module
).add("TabsWithDescription", () => <TabsWithDescription />);
