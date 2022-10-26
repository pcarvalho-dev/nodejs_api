const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todoRoutes = require("./src/routes/todo");

main()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect('mongodb://database:27017/node_api', {
      useNewUrlParser: true
    })
    .then((result) => console.log('MongoDB Conectado')
    )
    .catch((error) => console.log(error));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/todos", todoRoutes);

app.listen(8080, () => {
  console.log("listening on port 8080");
});
