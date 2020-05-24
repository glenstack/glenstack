import React, { useState } from "react";
import Transition from "./lib/Transition";
import { Link } from "gatsby";
import { MobileMenu } from "./MobileMenu";

export const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="lg:w-0 lg:flex-1">
            <Link to="/">
              <div className="flex items-center">
                <img
                  className="h-10 w-auto sm:h-12"
                  src="/GlenstackLogoSimple.svg"
                  alt="Glenstack Logo"
                />
                <span className="ml-3 text-2xl tracking-tight font-extrabold text-gray-900">
                  Glenstack
                </span>
              </div>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              onClick={() => setOpen(true)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link
              to="/solutions"
              className="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150"
            >
              Solutions
            </Link>
            <Link
              to="/integrations"
              className="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150"
            >
              Integrations
            </Link>
            <Link
              to="/pricing"
              className="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150"
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150"
            >
              Contact
            </Link>
            <Link
              to="/blog"
              className="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150"
            >
              Blog
            </Link>
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <span className="inline-flex rounded-md shadow-sm">
              <a
                href="https://glenstack.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-glenstack-600 hover:bg-glenstack-500 focus:outline-none focus:border-glenstack-700 focus:shadow-outline-glenstack active:bg-glenstack-700 transition ease-in-out duration-150"
              >
                Login
              </a>
            </span>
          </div>
        </div>
      </div>

      <MobileMenu open={open} setOpen={setOpen} />
    </div>
  );
};
