import React from "react";
import { PageProps, Link, graphql } from "gatsby";

import { Layout } from "../components/Layout";
import { SEO } from "../components/SEO";

type Data = {
  site: {
    siteMetadata: {
      title: string;
    };
  };
};

const BlogIndex = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Homepage" />
      <div id="solutions" className="bg-gray-50">
        <div className="py-16 overflow-hidden lg:py-24">
          <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
            <div>
              <img
                className="hidden lg:block absolute left-full transform -translate-x-3/5 -translate-y-2/5 opacity-50"
                width="800"
                src="GlenstackHeroSide.svg"
              />
              <img
                className="hidden lg:block absolute left-3/4 transform -translate-x-5/6 mr-16"
                width="300"
                src="mobileexample.png"
              />
              <div className="relative lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                <div className="relative">
                  <h4 className="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
                    Beautiful web apps and native mobile applications
                  </h4>
                  <p className="mt-3 text-lg leading-7 text-gray-500">
                    Powered by React Native, we only write code once. This means
                    that we can build your application and have it running on
                    web, android and ios in a fraction of the time it takes the
                    competition.
                  </p>

                  <ul className="mt-10">
                    <li>
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-glenstack-500 text-white">
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
                                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h5 className="text-lg leading-6 font-medium text-gray-900">
                            Mobile first
                          </h5>
                          <p className="mt-2 text-base leading-6 text-gray-500">
                            The future is mobile. We build solutions with a
                            mobile first mindset so your application will look
                            beautiful and run smoothly for your customers on any
                            device.
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="mt-10">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-glenstack-500 text-white">
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
                                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h5 className="text-lg leading-6 font-medium text-gray-900">
                            Beautiful design
                          </h5>
                          <p className="mt-2 text-base leading-6 text-gray-500">
                            We know how important intelligent and charming
                            design is to you and your customers. We've built a
                            powerful library of gorgeous visual components to
                            speed the creation of your site. We'll then
                            handcraft them into solutions that work for you.
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="mt-10">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-glenstack-500 text-white">
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
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h5 className="text-lg leading-6 font-medium text-gray-900">
                            Cost?
                          </h5>
                          <p className="mt-2 text-base leading-6 text-gray-500">
                            ...
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="mt-10 -mx-4 relative lg:mt-0">
                  <svg
                    className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
                    width="784"
                    height="404"
                    fill="none"
                    viewBox="0 0 784 404"
                  >
                    <defs>
                      <pattern
                        id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <rect
                          x="0"
                          y="0"
                          width="4"
                          height="4"
                          className="text-gray-200"
                          fill="currentColor"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width="784"
                      height="404"
                      fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)"
                    />
                  </svg>
                  {/* <img
                    className="relative mx-auto"
                    width="490"
                    src="/exampleSite.png"
                    alt=""
                  /> */}
                </div>
              </div>
            </div>

            <div>
              <img
                className="hidden lg:block absolute right-full transform translate-x-1/2 -translate-y-1/5 opacity-50"
                height="700"
                width="700"
                src="GlenstackHeroSide2.svg"
              ></img>

              <div className="relative mt-12 sm:mt-16 lg:mt-24">
                <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
                  <div className="lg:col-start-2">
                    <h4 className="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
                      Integrated services
                    </h4>
                    <p className="mt-3 text-lg leading-7 text-gray-500">
                      We have standardised services, which can be customised for
                      your needs and hosted by us.
                    </p>

                    <ul className="mt-10">
                      <li>
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-glenstack-500 text-white">
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
                                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h5 className="text-lg leading-6 font-medium text-gray-900">
                              Mobile notifications
                            </h5>
                            <p className="mt-2 text-base leading-6 text-gray-500">
                              Lorem ipsum, dolor sit amet consectetur
                              adipisicing elit. Maiores impedit perferendis
                              suscipit eaque, iste dolor cupiditate blanditiis
                              ratione.
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="mt-10">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-glenstack-500 text-white">
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
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h5 className="text-lg leading-6 font-medium text-gray-900">
                              Reminder emails
                            </h5>
                            <p className="mt-2 text-base leading-6 text-gray-500">
                              Lorem ipsum, dolor sit amet consectetur
                              adipisicing elit. Maiores impedit perferendis
                              suscipit eaque, iste dolor cupiditate blanditiis
                              ratione.
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
                    <svg
                      className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
                      width="784"
                      height="404"
                      fill="none"
                      viewBox="0 0 784 404"
                    >
                      <defs>
                        <pattern
                          id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
                          x="0"
                          y="0"
                          width="20"
                          height="20"
                          patternUnits="userSpaceOnUse"
                        >
                          <rect
                            x="0"
                            y="0"
                            width="4"
                            height="4"
                            className="text-gray-200"
                            fill="currentColor"
                          />
                        </pattern>
                      </defs>
                      <rect
                        width="784"
                        height="404"
                        fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)"
                      />
                    </svg>
                    <img
                      className="relative mx-auto"
                      width="490"
                      src="https://tailwindui.com/img/features/feature-example-2.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="other" className="overflow-hidden">
          <div className="relative max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="relative lg:grid lg:grid-cols-3 lg:col-gap-8">
              <div className="lg:col-span-1">
                <h3 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                  And anything else you might need
                </h3>
              </div>
              <div className="mt-10 sm:grid sm:grid-cols-2 sm:col-gap-8 sm:row-gap-10 lg:col-span-2 lg:mt-0">
                <div>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-glenstack-500 text-white">
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
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                  <div className="mt-5">
                    <h5 className="text-lg leading-6 font-medium text-gray-900">
                      APIs
                    </h5>
                    <p className="mt-2 text-base leading-6 text-gray-500">
                      Consequuntur omnis dicta cumque, inventore atque ab
                      dolores aspernatur tempora ab doloremque.
                    </p>
                  </div>
                </div>
                <div className="mt-10 sm:mt-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-glenstack-500 text-white">
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
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                  </div>
                  <div className="mt-5">
                    <h5 className="text-lg leading-6 font-medium text-gray-900">
                      Backups
                    </h5>
                    <p className="mt-2 text-base leading-6 text-gray-500">
                      Corporis quisquam nostrum nulla veniam recusandae
                      temporibus aperiam officia incidunt at distinctio ratione.
                    </p>
                  </div>
                </div>
                <div className="mt-10 sm:mt-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-glenstack-500 text-white">
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="mt-5">
                    <h5 className="text-lg leading-6 font-medium text-gray-900">
                      Databases
                    </h5>
                    <p className="mt-2 text-base leading-6 text-gray-500">
                      Omnis, illo delectus? Libero, possimus nulla nemo tenetur
                      adipisci repellat dolore eligendi velit doloribus
                      mollitia.
                    </p>
                  </div>
                </div>
                <div className="mt-10 sm:mt-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-glenstack-500 text-white">
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="mt-5">
                    <h5 className="text-lg leading-6 font-medium text-gray-900">
                      Emails
                    </h5>
                    <p className="mt-2 text-base leading-6 text-gray-500">
                      Veniam necessitatibus reiciendis fugit explicabo dolorem
                      nihil et omnis assumenda odit? Quisquam unde accusantium.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
