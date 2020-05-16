import React from "react";
import { Link } from "gatsby";

import "../css/index.css";
import { Hero } from "./Hero";
import { Footer } from "./Footer";

export const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  if (location.pathname === rootPath) {
    header = <Hero />;
  } else {
    header = (
      <h3>
        <Link to={`/`}>{title}</Link>
      </h3>
    );
  }
  return (
    <div>
      <header>{header}</header>
      <main>{children}</main>
      <Footer />
    </div>
  );
};
