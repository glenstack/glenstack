const path = require("path");

module.exports = {
  client: {
    service: {
      name: "administrate-lms",
      localSchemaFile: path.join(__dirname, "schema.json"),
    },
    includes: [path.join(__dirname, "../../src/**/*.{ts,tsx}")],
  },
};
