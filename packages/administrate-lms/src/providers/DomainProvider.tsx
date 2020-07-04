import React, { createContext, FC, useState, useContext } from "react";
import { contextConsumer } from "./utils";

export type Domain = string;

const DEFAULT_DOMAIN = "google.com";

const DomainContext = createContext<Domain>(DEFAULT_DOMAIN);

export const DomainProvider: FC = ({ children }) => {
  const [domain, setDomain] = useState<Domain>(
    "d5a76d445c61e1-lms.administratelms.com"
  );

  return (
    <DomainContext.Provider value={domain}>{children}</DomainContext.Provider>
  );
};

export const useDomain = contextConsumer(
  DomainContext,
  "useDomain",
  "DomainProvider"
);
