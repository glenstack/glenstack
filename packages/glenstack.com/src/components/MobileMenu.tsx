import React from "react";
import Transition from "./lib/Transition";
import { Link } from "gatsby";

export const MobileMenu = ({ open, setOpen }) => {
  return (
    <Transition
      show={open}
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
        <div className="rounded-lg shadow-lg">
          <div className="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    className="h-8 w-auto"
                    src="/GlenstackLogoSimple.svg"
                    alt="Glenstack Logo"
                  />
                  <span className="ml-2 text-xl tracking-tight font-extrabold text-gray-900">
                    Glenstack
                  </span>
                </div>
                <div className="-mr-2">
                  <button
                    onClick={() => setOpen(false)}
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <nav className="grid row-gap-8">
                  <Link
                    to="/solutions"
                    className="-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
                  >
                    <svg
                      className="flex-shrink-0 h-6 w-6 text-glenstack-600"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <div className="text-base leading-6 font-medium text-gray-900">
                      Solutions
                    </div>
                  </Link>
                  <Link
                    to="/integrations"
                    className="-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
                  >
                    <svg
                      className="flex-shrink-0 h-6 w-6 text-glenstack-600"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                    </svg>
                    <div className="text-base leading-6 font-medium text-gray-900">
                      Integrations
                    </div>
                  </Link>
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-2 row-gap-4 col-gap-8">
                <Link
                  to="/"
                  className="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150"
                >
                  Pricing
                </Link>
                <Link
                  to="/"
                  className="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150"
                >
                  About
                </Link>
                <Link
                  to="/"
                  className="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150"
                >
                  Careers
                </Link>
                <Link
                  to="/"
                  className="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150"
                >
                  Blog
                </Link>
              </div>
              <div className="space-y-6">
                <span className="w-full flex rounded-md shadow-sm">
                  <a
                    href="/"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-glenstack-600 hover:bg-glenstack-500 focus:outline-none focus:border-glenstack-700 focus:shadow-outline-glenstack active:bg-glenstack-700 transition ease-in-out duration-150"
                  >
                    Contact us
                  </a>
                </span>
                <p className="text-center text-base leading-6 font-medium text-gray-500">
                  Existing customer?{" "}
                  <Link
                    to="/contact"
                    className="text-glenstack-600 hover:text-glenstack-500 transition ease-in-out duration-150"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};
