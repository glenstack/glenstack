const express = require("express");
const path = require("path");
const fs = require("fs");
const { open } = require("openurl");

const PORT = 0;

const lmsSchema = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../schema.json"))
);

const app = express();

app.use(express.static("./node_modules/graphql-voyager/dist"));
app.get("/", (req, res) => res.redirect("/lms"));
app.get("/lms", (req, res) => res.sendFile("index.html", { root: __dirname }));
app.get("/graphql/lms", async (req, res) => {
  res.json({ data: lmsSchema });
});

app.listen(PORT, function () {
  const { port } = this.address();
  const lmsURL = `http://localhost:${port}/lms`;
  console.log(`🚀 We have liftoff!
LMS API: ${lmsURL}`);
  open(lmsURL);
});
