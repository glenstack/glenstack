import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Counter } from "./Counter";

export default {
  title: `Complex/Counter`,
};

// Export to Storybook
export { Counter };

// Export to Expo
storiesOf("Complex", module).add("Counter", () => <Counter />);
