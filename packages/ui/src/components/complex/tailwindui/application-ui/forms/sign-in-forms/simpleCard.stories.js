import React from "react";
import { storiesOf } from "@storybook/react-native";
import { SimpleCard } from "./simpleCard";

export default {
  title: `TailwindUI/Application UI/Forms/Sign-in and Registration`,
};

// Export to Storybook
export { SimpleCard };

// Export to Expo
storiesOf(
  "TailwindUI/Application UI/Forms/Sign-in and Registration",
  module
).add("Simple card", () => <SimpleCard />);
