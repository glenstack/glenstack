import React, { createRef } from "react";
import { storiesOf } from "@storybook/react-native";
import { default as MagicText } from "./Text";
import { useHover } from "react-native-web-hooks";

export default {
  title: `Base/Text`,
};

const Text = () => <MagicText>Hello, world!</MagicText>;

const TextWithRef = () => {
  const ref = createRef();
  if (useHover(ref)) alert("Custom ref action!");

  return (
    <MagicText
      ref={ref}
      onPress={() => alert("You touched... (Try hovering on desktop instead).")}
    >
      Hello, world! (Hover over me!)
    </MagicText>
  );
};

// Export to Storybook
export { Text, TextWithRef };

// Export to Expo
storiesOf("Base", module).add("Text", Text).add("TextWithRef", TextWithRef);
