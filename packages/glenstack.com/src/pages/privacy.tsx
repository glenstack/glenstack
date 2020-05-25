import React from "react";
import { graphql } from "gatsby";

import { Layout } from "../components/Layout";
import { SEO } from "../components/SEO";

const PrivacyPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Privacy" />
      <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg mx-auto lg:max-w-7xl">
          <div>
            <h1 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10 ">
              Privacy
            </h1>
            <p className="mt-3 sm:mt-4 text-xl leading-7 text-gray-500">
              Your privacy is critically important to us.
            </p>
          </div>
          <div className="mt-6 grid gap-16 border-t-2 border-gray-100 pt-10">
            <div className="prose">
              <p>
                It is Glenstack's policy to respect your privacy regarding any
                information we may collect while operating our website. This
                Privacy Policy applies to{" "}
                <a href="https://glenstack.com/">https://glenstack.com/</a>{" "}
                (hereinafter, "us", "we", or "https://glenstack.com/"). We
                respect your privacy and are committed to protecting personally
                identifiable information you may provide us through the Website.
                We have adopted this privacy policy ("Privacy Policy") to
                explain what information may be collected on our Website, how we
                use this information, and under what circumstances we may
                disclose the information to third parties. This Privacy Policy
                applies only to information we collect through the Website and
                does not apply to our collection of information from other
                sources.
              </p>
              <p>
                This Privacy Policy, together with the Terms and conditions
                posted on our Website, set forth the general rules and policies
                governing your use of our Website. Depending on your activities
                when visiting our Website, you may be required to agree to
                additional terms and conditions.
              </p>
              <h2>Website Visitors</h2>
              <p>
                Like most website operators, Glenstack collects
                non-personally-identifying information of the sort that web
                browsers and servers typically make available, such as the
                browser type, language preference, referring site, and the date
                and time of each visitor request. Glenstack's purpose in
                collecting non-personally identifying information is to better
                understand how Glenstack's visitors use its website. From time
                to time, Glenstack may release non-personally-identifying
                information in the aggregate, e.g., by publishing a report on
                trends in the usage of its website.
              </p>
              <p>
                Glenstack also collects potentially personally-identifying
                information like Internet Protocol (IP) addresses for logged in
                users and for users leaving comments on https://glenstack.com/
                blog posts. Glenstack only discloses logged in user and
                commenter IP addresses under the same circumstances that it uses
                and discloses personally-identifying information as described
                below.
              </p>
              <h2>Gathering of Personally-Identifying Information</h2>
              <p>
                Certain visitors to Glenstack's websites choose to interact with
                Glenstack in ways that require Glenstack to gather
                personally-identifying information. The amount and type of
                information that Glenstack gathers depends on the nature of the
                interaction. For example, we ask visitors who sign up for a blog
                at https://glenstack.com/ to provide a username and email
                address.
              </p>
              <h2>Security</h2>
              <p>
                The security of your Personal Information is important to us,
                but remember that no method of transmission over the Internet,
                or method of electronic storage is 100% secure. While we strive
                to use commercially acceptable means to protect your Personal
                Information, we cannot guarantee its absolute security.
              </p>
              <h2>Advertisements</h2>
              <p>
                Ads appearing on our website may be delivered to users by
                advertising partners, who may set cookies. These cookies allow
                the ad server to recognize your computer each time they send you
                an online advertisement to compile information about you or
                others who use your computer. This information allows ad
                networks to, among other things, deliver targeted advertisements
                that they believe will be of most interest to you. This Privacy
                Policy covers the use of cookies by Glenstack and does not cover
                the use of cookies by any advertisers.
              </p>
              <h2>Links To External Sites</h2>
              <p>
                Our Service may contain links to external sites that are not
                operated by us. If you click on a third party link, you will be
                directed to that third party's site. We strongly advise you to
                review the Privacy Policy and terms and conditions of every site
                you visit.
              </p>
              <p>
                We have no control over, and assume no responsibility for the
                content, privacy policies or practices of any third party sites,
                products or services.
              </p>
              <h2>Protection of Certain Personally-Identifying Information</h2>
              <p>
                Glenstack discloses potentially personally-identifying and
                personally-identifying information only to those of its
                employees, contractors and affiliated organizations that (i)
                need to know that information in order to process it on
                Glenstack's behalf or to provide services available at
                Glenstack's website, and (ii) that have agreed not to disclose
                it to others. Some of those employees, contractors and
                affiliated organizations may be located outside of your home
                country; by using Glenstack's website, you consent to the
                transfer of such information to them. Glenstack will not rent or
                sell potentially personally-identifying and
                personally-identifying information to anyone. Other than to its
                employees, contractors and affiliated organizations, as
                described above, Glenstack discloses potentially
                personally-identifying and personally-identifying information
                only in response to a subpoena, court order or other
                governmental request, or when Glenstack believes in good faith
                that disclosure is reasonably necessary to protect the property
                or rights of Glenstack, third parties or the public at large.
              </p>
              <p>
                If you are a registered user of https://glenstack.com/ and have
                supplied your email address, Glenstack may occasionally send you
                an email to tell you about new features, solicit your feedback,
                or just keep you up to date with what's going on with Glenstack
                and our products. We primarily use our blog to communicate this
                type of information, so we expect to keep this type of email to
                a minimum. If you send us a request (for example via a support
                email or via one of our feedback mechanisms), we reserve the
                right to publish it in order to help us clarify or respond to
                your request or to help us support other users. Glenstack takes
                all measures reasonably necessary to protect against the
                unauthorized access, use, alteration or destruction of
                potentially personally-identifying and personally-identifying
                information.
              </p>
              <h2>Aggregated Statistics</h2>
              <p>
                Glenstack may collect statistics about the behavior of visitors
                to its website. Glenstack may display this information publicly
                or provide it to others. However, Glenstack does not disclose
                your personally-identifying information.
              </p>
              <h2>Cookies</h2>
              <p>
                To enrich and perfect your online experience, Glenstack uses
                "Cookies", similar technologies and services provided by others
                to display personalized content, appropriate advertising and
                store your preferences on your computer.
              </p>
              <p>
                A cookie is a string of information that a website stores on a
                visitor's computer, and that the visitor's browser provides to
                the website each time the visitor returns. Glenstack uses
                cookies to help Glenstack identify and track visitors, their
                usage of https://glenstack.com/, and their website access
                preferences. Glenstack visitors who do not wish to have cookies
                placed on their computers should set their browsers to refuse
                cookies before using Glenstack's websites, with the drawback
                that certain features of Glenstack's websites may not function
                properly without the aid of cookies.
              </p>
              <p>
                By continuing to navigate our website without changing your
                cookie settings, you hereby acknowledge and agree to Glenstack's
                use of cookies.
              </p>
              <h2>Privacy Policy Changes</h2>
              <p>
                Although most changes are likely to be minor, Glenstack may
                change its Privacy Policy from time to time, and in Glenstack's
                sole discretion. Glenstack encourages visitors to frequently
                check this page for any changes to its Privacy Policy. Your
                continued use of this site after any change in this Privacy
                Policy will constitute your acceptance of such change.
              </p>
              <h2></h2>
              <p></p>
              <h2>Contact Information</h2>
              <p>
                If you have any questions about this Privacy Policy, please
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
    </Layout>
  );
};

export default PrivacyPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
