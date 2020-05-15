import React, { useReducer } from "react";
import { Text, Button, View } from "react-native";
const initialState = { count: 0 };
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
  }
};
export const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <View>
      <Text>Count: {state.count}</Text>
      <Button onPress={() => dispatch({ type: "increment" })} title="+" />
      <Button onPress={() => dispatch({ type: "decrement" })} title="-" />
    </View>
  );
};
