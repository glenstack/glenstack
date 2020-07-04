import React, { Context, useContext } from "react";
import { Observable } from "@apollo/client";

export const contextConsumer = <T,>(
  consumableContext: Context<T>,
  hookName: string,
  providerName: string
) => () => {
  const context = useContext(consumableContext);
  if (context === undefined)
    throw new Error(`${hookName} must be used within a ${providerName}.`);
  return context;
};
