import React from "react";
import { Link } from "gatsby";

import "../css/index.css";
import { Hero } from "./Hero";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__ as any}/`;
  let header;

  if (location.pathname === rootPath) {
    header = <Hero />;
  } else {
    header = <Header />;
  }
  return (
    <>
      <header>{header}</header>
      <main>{children}</main>
      <Footer />
    </>
  );
};
