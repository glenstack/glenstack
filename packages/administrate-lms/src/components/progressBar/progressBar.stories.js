import React from "react";
import { storiesOf } from "@storybook/react-native";
import { ProgressBar } from "./progressBar";

export default {
  title: `TailwindUI/Application UI/Content/progressBar`,
};

// Export to Storybook
export { ProgressBar };

// Export to Expo
storiesOf(
  "TailwindUI/Application UI/Content/ProgressBar",
  module
).add("ProgressBar", () => <ProgressBar />);
