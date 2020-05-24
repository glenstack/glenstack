import React, { useState } from "react";

import Transition from "./lib/Transition";
import { Link } from "gatsby";
import { MobileMenu } from "./MobileMenu";

export const Hero = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="relative pt-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
            <nav className="relative flex items-center justify-between h-10 sm:h-12 md:justify-center">
              <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                <div className="flex items-center justify-between w-full md:w-auto">
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
                  <div className="-mr-2 flex items-center md:hidden">
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
                </div>
              </div>
              <div className="hidden md:block">
                <Link
                  to="/solutions"
                  className="font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                >
                  Solutions
                </Link>
                <Link
                  to="/integrations"
                  className="ml-10 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                >
                  Integrations
                </Link>
                <Link
                  to="/pricing"
                  className="ml-10 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                >
                  Pricing
                </Link>
                <Link
                  to="/about"
                  className="ml-10 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="ml-10 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                >
                  Contact
                </Link>
                <Link
                  to="/blog"
                  className="ml-10 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                >
                  Blog
                </Link>
              </div>
              <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                <span className="inline-flex rounded-md shadow">
                  <a
                    href="https://glenstack.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-glenstack-600 bg-white hover:text-glenstack-500 focus:outline-none focus:shadow-outline-glenstack active:bg-gray-50 active:text-glenstack-700 transition duration-150 ease-in-out"
                  >
                    Login
                  </a>
                </span>
              </div>
            </nav>
          </div>

          <MobileMenu open={open} setOpen={setOpen} />

          <div className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="text-center">
              <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                A whole new approach to <br className="xl:hidden" />
                <span className="text-glenstack-600">applications</span>
              </h2>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-15 md:text-xl md:max-w-3xl">
                Whether you're looking to improve your relationship with
                clients, automate internal processes, or make something
                completely new, Glenstack can create a bespoke solution fitted
                perfectly to your needs.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link
                    to="/contact"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-glenstack-600 hover:bg-glenstack-500 focus:outline-none focus:shadow-outline-glenstack transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
