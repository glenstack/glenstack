import React from "react";

import "../css/index.css";
import { Hero } from "./Hero";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = ({ location, title, children }) => {
  let header;

  if (location.pathname === "/") {
    header = <Hero />;
  } else {
    header = <Header />;
  }
  return (
    <>
      <header>{header}</header>
      <main>{children}</main>
      <Footer location={location} />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
      />
    </>
  );
};
