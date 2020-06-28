import { useMediaQuery } from "react-responsive";
import { useHover, useFocus, useActive } from "react-native-web-hooks";
import { Ref, MutableRefObject, RefObject } from "react";
// import styles from "css/styles.json";
import tailwind from "tailwind-rn";

export const stylesFromClassName = (
  className: string = "",
  ref: RefObject<any>
): {} => {
  const classNames = className.split(" ");

  // console.log(
  //   classNames
  //     .map((className) =>
  //       Object.entries(styles)
  //         .map(([k, v]: [string, any]) => {
  //           if (k === `.${className}`) return v;
  //         })
  //         .filter((v) => v)
  //     )
  //     .reduce((existing, rest) => ({ ...existing, ...rest }), {})
  // );

  // const isBigScreen = useMediaQuery({ query: "(min-device-width: 1824px)" });

  // const isHover = useHover(ref);
  // const isFocus = useFocus(ref);
  // const isActive = useActive(ref);

  return tailwind(className);

  return {
    // backgroundColor: isBigScreen ? (isHover ? "pink" : "purple") : "blue",
    fontSize: 72,
  };
};
