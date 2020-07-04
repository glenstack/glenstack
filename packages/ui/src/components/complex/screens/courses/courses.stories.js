import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Courses } from "./courses";

export default {
  title: `TailwindUI/Application UI/Screens/Courses`,
};

// Export to Storybook
export { Courses };

// Export to Expo
storiesOf(
  "TailwindUI/Application UI/Screens/Courses",
  module
).add("Courses", () => <Courses />);
