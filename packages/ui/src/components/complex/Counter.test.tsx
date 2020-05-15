import React from "react";
import { render, fireEvent } from "react-native-testing-library";
import { Counter } from "./Counter";

describe("Counter", () => {
  it("keep state", () => {
    const { getByText } = render(<Counter />);
    expect(getByText("Count: 0")).toBeTruthy();

    fireEvent.press(getByText("+"));

    expect(getByText("Count: 1")).toBeTruthy();

    fireEvent.press(getByText("-"));

    expect(getByText("Count: 0")).toBeTruthy();
  });

  it("matches snapshot", () => {
    expect(render(<Counter />).toJSON()).toMatchSnapshot();
  });
});
