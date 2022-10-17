const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

main()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/node_api");
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
