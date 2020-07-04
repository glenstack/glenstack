require("cross-fetch/polyfill");
const { exec } = require("child_process");

const PORTAL_HOST = "d5a76d445c61e1-lms.administratelms.com";
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
            exec(
              `apollo schema:download --endpoint=\"https://lms-api.administratehq.com/graphql\" --header=\"Authorization: Bearer oI2FtNJZWGihfv6SAYcNNORJnmwGICBeqK5G6meREC4\"`,
              (err, stdout, stderr) => {
                if (err) {
                  console.error("Failed!", stderr);
                }

                console.log(stdout);
              }
            );
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
