const express = require("express");
const { Liquid } = require("liquidjs");
const path = require("path");

const app = express();
const engine = new Liquid({
  root: __dirname, // for layouts and partials
  extname: ".liquid",
});

app.use(express.static("assets"));
app.engine("liquid", engine.express()); // register liquid engine
app.set("views", ["./theme", "./partials", "./templates", "./views"]); // specify the views directory
// app.set("views", ["./templates", "./views"]); // specify the views directory
app.set("view engine", "liquid"); // set to default

app.get("/", function (req, res) {
  res.render("index", {
    title: "Homepage",
  });
});

app.get("*", function (req, res) {
  res.render("404", {
    title: "404",
  });
});

app.get("/todos", function (req, res) {
  const todos = ["fork and clone", "make it better", "make a pull request"];
  res.render("todolist", {
    todos: todos,
    title: "Welcome to liquidjs!",
  });
});

module.exports = app;
