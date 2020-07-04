import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Card } from "./card";

export default {
  title: `TailwindUI/Application UI/Content/Card`,
};

// Export to Storybook
export { Card };

// Export to Expo
storiesOf(
  "TailwindUI/Application UI/Content/Card",
  module
).add("Card", () => <Card />);
