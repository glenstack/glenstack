const path = require("path");

module.exports = {
  client: {
    service: {
      name: "administrate-lms",
      localSchemaFile: path.join(__dirname, "dx/graphql/schema.json"),
    },
  },
};
