const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const Todo = require("./models/Todo.js");

app.use(express.json()); //Body parser to parse incoming req
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/to_do_list")
  .then(() => console.log("Connected to DB "))
  .catch(console.error);

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

app.post("/todo/new", async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  todo.save();

  res.json(todo);
});

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);

  res.json(result);
});

app.get("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;
  todo.save();
  res.json(todo);
});

app.listen(8080, () => console.log("app is listening"));
