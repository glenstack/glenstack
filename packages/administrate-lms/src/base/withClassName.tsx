import React, {
  Component,
  Ref,
  forwardRef,
  ComponentType,
  ForwardRefRenderFunction,
  RefAttributes,
  createRef,
  MutableRefObject,
  RefObject,
} from "react";
import { stylesFromClassName } from "./stylesFromClassName";

type ClassNameProps = {
  className?: string;
};

// TODO: Tidy and remove any's
export const withClassName = <T extends Component, P extends Pick<P, "style">>(
  Component: ComponentType<P>
): ComponentType<P & ClassNameProps & RefAttributes<T>> => {
  type WithClassNameProps = P & ClassNameProps;
  type Props = WithClassNameProps & { forwardedRef: Ref<T> };

  const WithClassName = ({ forwardedRef, className, ...rest }: Props) => {
    const ref = (forwardedRef || createRef<T>()) as RefObject<T>;
    const style = {
      ...stylesFromClassName(className, ref),
      ...rest.style,
    };
    const props = ({
      ...rest,
      style,
    } as unknown) as P;

    return <Component ref={ref} {...props} />;
  };

  const RefForwardingFactory: ForwardRefRenderFunction<T, any> = (
    props: WithClassNameProps,
    ref: Ref<T>
  ) => <WithClassName {...props} forwardedRef={ref} />;

  return forwardRef<T, WithClassNameProps>(RefForwardingFactory) as any;
};
