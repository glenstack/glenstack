require("cross-fetch/polyfill");
const fs = require("fs");

const PORTAL_HOST = "d5a76d445c61e1-lms.administratelms.com";
const INTROSPECTION_QUERY = `query IntrospectionQuery { __schema { queryType { name } mutationType { name } subscriptionType { name } types { ...FullType } directives { name description locations args { ...InputValue } } } } fragment FullType on __Type { kind name description fields(includeDeprecated: true) { name description args { ...InputValue } type { ...TypeRef } isDeprecated deprecationReason } inputFields { ...InputValue } interfaces { ...TypeRef } enumValues(includeDeprecated: true) { name description isDeprecated deprecationReason } possibleTypes { ...TypeRef } } fragment InputValue on __InputValue { name description type { ...TypeRef } defaultValue } fragment TypeRef on __Type { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name } } } } } } } }`;
const PORTAL_AUTHENTICATION_ENDPOINT =
  "https://portal-auth.administratehq.com/portal/guest";
const LMS_API_ENDPOINT = "https://lms-api.administratehq.com/graphql";

module.exports = {
  lms: new Promise((resolve, reject) => {
    console.log("Fetching authentication token...");
    fetch(PORTAL_AUTHENTICATION_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ domain: PORTAL_HOST }),
    })
      .then((response) => {
        console.log("Done! Decoding authentication token...");
        response
          .json()
          .then(({ portal_token: portalToken }) => {
            console.log("Done! Introspecting LMS API...");
            fetch(LMS_API_ENDPOINT, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${portalToken}`,
              },
              body: JSON.stringify({ query: INTROSPECTION_QUERY }),
            })
              .then((response) => {
                console.log("Done! Decoding introspection result...");
                response
                  .json()
                  .then((data) => {
                    console.log("Done!");
                    resolve(data);
                  })
                  .catch((error) => {
                    console.error(
                      `Could not decode the LMS API introspection result: ${error}`
                    );
                    reject(error);
                  });
              })
              .catch((error) => {
                console.error(`Could not introspect LMS API: ${error}`);
                reject(error);
              });
          })
          .catch((error) => {
            console.error(
              `Could not decode LMS API authentication token: ${error}`
            );
            reject(error);
          });
      })
      .catch((error) => {
        console.error(`Could not fetch guest authentication token: ${error}`);
        reject(error);
      });
  }),
};
