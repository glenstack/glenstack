const express = require("express");
const { open } = require("openurl");
const { lms } = require("./schemas.js");

const PORT = 0;

const app = express();

app.use(express.static("./node_modules/graphql-voyager/dist"));
app.get("/", (req, res) => res.redirect("/lms"));
app.get("/lms", (req, res) => res.sendFile("index.html", { root: __dirname }));
app.get("/graphql/lms", async (req, res) => {
  res.json(await lms);
});

lms.then(() =>
  app.listen(PORT, function () {
    const { port } = this.address();
    const lmsURL = `http://localhost:${port}/lms`;
    console.log(`🚀 We have liftoff!
LMS API: ${lmsURL}`);
    open(lmsURL);
  })
);
