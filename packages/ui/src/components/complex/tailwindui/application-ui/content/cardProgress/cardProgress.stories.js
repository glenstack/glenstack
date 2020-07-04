import React from "react";
import { storiesOf } from "@storybook/react-native";
import { CardProgress } from "./cardProgress";

export default {
  title: `TailwindUI/Application UI/Content/Card`,
};

// Export to Storybook
export { CardProgress };

// Export to Expo
storiesOf(
  "TailwindUI/Application UI/Content/CardProgress",
  module
).add("CardProgress", () => <CardProgress />);
