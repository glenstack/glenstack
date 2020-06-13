import { useMediaQuery } from "react-responsive";
import { useHover, useFocus, useActive } from "react-native-web-hooks";
import { Ref, MutableRefObject, RefObject } from "react";

export const stylesFromClassName = (
  className: string = "",
  ref: RefObject<any>
): {} => {
  const classes = className.split(" ");

  // const isBigScreen = useMediaQuery({ query: "(min-device-width: 1824px)" });

  // const isHover = useHover(ref);
  // const isFocus = useFocus(ref);
  // const isActive = useActive(ref);

  return {
    // backgroundColor: isBigScreen ? (isHover ? "pink" : "purple") : "blue",
    fontSize: 72,
  };
};
