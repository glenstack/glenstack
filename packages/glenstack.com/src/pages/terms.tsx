import React from "react";
import { graphql } from "gatsby";

import { Layout } from "../components/Layout";
import { SEO } from "../components/SEO";

const TermsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Terms" />
      <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg mx-auto lg:max-w-7xl">
          <div>
            <h1 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10 ">
              Terms
            </h1>
            <p className="mt-3 sm:mt-4 text-xl leading-7 text-gray-500">
              These terms and conditions outline the rules and regulations for
              the use of Glenstack's Website.
            </p>
          </div>
          <div className="mt-6 grid gap-16 border-t-2 border-gray-100 pt-10">
            <div className="prose">
              <p>
                By accessing this website we assume you accept these terms and
                conditions in full. Do not continue to use Glenstack's website
                if you do not accept all of the terms and conditions stated on
                this page.
              </p>
              <p>
                The following terminology applies to these Terms and Conditions,
                Privacy Statement and Disclaimer Notice and any or all
                Agreements: "Client", "You" and "Your" refers to you, the person
                accessing this website and accepting the Company's terms and
                conditions. "The Company", "Ourselves", "We", "Our" and "Us",
                refers to our Company. "Party", "Parties", or "Us", refers to
                both the Client and ourselves, or either the Client or
                ourselves. All terms refer to the offer, acceptance and
                consideration of payment necessary to undertake the process of
                our assistance to the Client in the most appropriate manner,
                whether by formal meetings of a fixed duration, or any other
                means, for the express purpose of meeting the Client's needs in
                respect of provision of the Company's stated services/products,
                in accordance with and subject to, prevailing law of United
                Kingdom. Any use of the above terminology or other words in the
                singular, plural, capitalisation and/or he/she or they, are
                taken as interchangeable and therefore as referring to same.
              </p>
              <h2>Cookies</h2>
              <p>
                We employ the use of cookies. By using Glenstack's website you
                consent to the use of cookies in accordance with Glenstack's
                privacy policy.
              </p>
              <p>
                Most of the modern day interactive web sites use cookies to
                enable us to retrieve user details for each visit. Cookies are
                used in some areas of our site to enable the functionality of
                this area and ease of use for those people visiting. Some of our
                affiliate / advertising partners may also use cookies.
              </p>
              <h2>License</h2>
              <p>
                Unless otherwise stated, Glenstack and/or it's licensors own the
                intellectual property rights for all material on Glenstack. All
                intellectual property rights are reserved. You may view and/or
                print pages from https://glenstack.com/ for your own personal
                use subject to restrictions set in these terms and conditions.
              </p>
              <p>You must not:</p>
              <ol>
                <li>Republish material from https://glenstack.com/</li>
                <li>
                  Sell, rent or sub-license material from https://glenstack.com/
                </li>
                <li>
                  Reproduce, duplicate or copy material from
                  https://glenstack.com/
                </li>
              </ol>
              <p>
                Redistribute content from Glenstack (unless content is
                specifically made for redistribution).
              </p>
              <h2>Hyperlinking to our Content</h2>
              <ol>
                <li>
                  The following organizations may link to our Web site without
                  prior written approval:
                  <ol>
                    <li>Government agencies;</li>
                    <li>Search engines;</li>
                    <li>News organizations;</li>
                    <li>
                      Online directory distributors when they list us in the
                      directory may link to our Web site in the same manner as
                      they hyperlink to the Web sites of other listed
                      businesses; and
                    </li>
                    <li>
                      Systemwide Accredited Businesses except soliciting
                      non-profit organizations, charity shopping malls, and
                      charity fundraising groups which may not hyperlink to our
                      Web site.
                    </li>
                  </ol>
                </li>
              </ol>
              <ol>
                <li>
                  These organizations may link to our home page, to publications
                  or to other Web site information so long as the link: (a) is
                  not in any way misleading; (b) does not falsely imply
                  sponsorship, endorsement or approval of the linking party and
                  its products or services; and (c) fits within the context of
                  the linking party's site.
                </li>
                <li>
                  We may consider and approve in our sole discretion other link
                  requests from the following types of organizations:
                  <ol>
                    <li>
                      commonly-known consumer and/or business information
                      sources such as Chambers of Commerce, American Automobile
                      Association, AARP and Consumers Union;
                    </li>
                    <li>dot.com community sites;</li>
                    <li>
                      associations or other groups representing charities,
                      including charity giving sites,
                    </li>
                    <li>online directory distributors;</li>
                    <li>internet portals;</li>
                    <li>
                      accounting, law and consulting firms whose primary clients
                      are businesses; and
                    </li>
                    <li>educational institutions and trade associations.</li>
                  </ol>
                </li>
              </ol>
              <p>
                We will approve link requests from these organizations if we
                determine that: (a) the link would not reflect unfavorably on us
                or our accredited businesses (for example, trade associations or
                other organizations representing inherently suspect types of
                business, such as work-at-home opportunities, shall not be
                allowed to link); (b)the organization does not have an
                unsatisfactory record with us; (c) the benefit to us from the
                visibility associated with the hyperlink outweighs the absence
                of Glenstack; and (d) where the link is in the context of
                general resource information or is otherwise consistent with
                editorial content in a newsletter or similar product furthering
                the mission of the organization.
              </p>
              <p>
                These organizations may link to our home page, to publications
                or to other Web site information so long as the link: (a) is not
                in any way misleading; (b) does not falsely imply sponsorship,
                endorsement or approval of the linking party and it products or
                services; and (c) fits within the context of the linking party's
                site.
              </p>
              <p>
                If you are among the organizations listed in paragraph 2 above
                and are interested in linking to our website, you must notify us
                by sending an e-mail to{" "}
                <a
                  href="mailto:hello@glenstack.com"
                  title="send an email to hello@glenstack.com"
                >
                  hello@glenstack.com
                </a>
                . Please include your name, your organization name, contact
                information (such as a phone number and/or e-mail address) as
                well as the URL of your site, a list of any URLs from which you
                intend to link to our Web site, and a list of the URL(s) on our
                site to which you would like to link. Allow 2-3 weeks for a
                response.
              </p>
              <p>
                Approved organizations may hyperlink to our Web site as follows:
              </p>
              <ol>
                <li>By use of our corporate name; or</li>
                <li>
                  By use of the uniform resource locator (Web address) being
                  linked to; or
                </li>
                <li>
                  By use of any other description of our Web site or material
                  being linked to that makes sense within the context and format
                  of content on the linking party's site.
                </li>
              </ol>
              <p>
                No use of Glenstack's logo or other artwork will be allowed for
                linking absent a trademark license agreement.
              </p>
              <h2>Iframes</h2>
              <p>
                Without prior approval and express written permission, you may
                not create frames around our Web pages or use other techniques
                that alter in any way the visual presentation or appearance of
                our Web site.
              </p>
              <h2>Reservation of Rights</h2>
              <p>
                We reserve the right at any time and in its sole discretion to
                request that you remove all links or any particular link to our
                Web site. You agree to immediately remove all links to our Web
                site upon such request. We also reserve the right to amend these
                terms and conditions and its linking policy at any time. By
                continuing to link to our Web site, you agree to be bound to and
                abide by these linking terms and conditions.
              </p>
              <h2>Removal of links from our website</h2>
              <p>
                If you find any link on our Web site or any linked web site
                objectionable for any reason, you may contact us about this. We
                will consider requests to remove links but will have no
                obligation to do so or to respond directly to you.
              </p>
              <p>
                Whilst we endeavour to ensure that the information on this
                website is correct, we do not warrant its completeness or
                accuracy; nor do we commit to ensuring that the website remains
                available or that the material on the website is kept up to
                date.
              </p>
              <h2>Content Liability</h2>
              <p>
                We shall have no responsibility or liability for any content
                appearing on your Web site. You agree to indemnify and defend us
                against all claims arising out of or based upon your Website. No
                link(s) may appear on any page on your Web site or within any
                context containing content or materials that may be interpreted
                as libelous, obscene or criminal, or which infringes, otherwise
                violates, or advocates the infringement or other violation of,
                any third party rights.
              </p>
              <h2>Disclaimer</h2>
              <p>
                To the maximum extent permitted by applicable law, we exclude
                all representations, warranties and conditions relating to our
                website and the use of this website (including, without
                limitation, any warranties implied by law in respect of
                satisfactory quality, fitness for purpose and/or the use of
                reasonable care and skill). Nothing in this disclaimer will:
              </p>
              <ol>
                <li>
                  limit or exclude our or your liability for death or personal
                  injury resulting from negligence;
                </li>
                <li>
                  limit or exclude our or your liability for fraud or fraudulent
                  misrepresentation;
                </li>
                <li>
                  limit any of our or your liabilities in any way that is not
                  permitted under applicable law; or
                </li>
                <li>
                  exclude any of our or your liabilities that may not be
                  excluded under applicable law.
                </li>
              </ol>
              <p>
                The limitations and exclusions of liability set out in this
                Section and elsewhere in this disclaimer: (a) are subject to the
                preceding paragraph; and (b) govern all liabilities arising
                under the disclaimer or in relation to the subject matter of
                this disclaimer, including liabilities arising in contract, in
                tort (including negligence) and for breach of statutory duty.
              </p>
              <p>
                To the extent that the website and the information and services
                on the website are provided free of charge, we will not be
                liable for any loss or damage of any nature.
              </p>
              <h2></h2>
              <p></p>
              <h2>Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please
                contact us via <a href="mailto:hello@glenstack.com">email</a>.
              </p>
              <p>
                Glenstack is located at:
                <address>
                  Glenstack
                  <br />
                  International House, 38 Thistle Street
                  <br />
                  Edinburgh
                  <br />
                  EH2 1EN
                  <br />
                  United Kingdom
                </address>
              </p>
            </div>
          </div>
        </div>
      </div>
      <h1>Terms</h1>
      <div></div>
    </Layout>
  );
};

export default TermsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
