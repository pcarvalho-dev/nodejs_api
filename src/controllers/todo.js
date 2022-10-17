const Todo = require("../models/todo");

exports.createTodo = (req, res, next) => {
  const todo = new Todo({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
  });
  todo
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Item added succesfully",
        post: {
          ...result,
          id: result._id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fail to create item",
      });
    });
};

exports.getTodos = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currPage = +req.query.page;
  const todoQuery = Todo.find();
  let fetchedTodo;
  if (pageSize && currPage) {
    todoQuery.skip(pageSize * (currPage - 1)).limit(pageSize);
  }
  todoQuery
    .then((doc) => {
      fetchedTodo = doc;
      return Todo.countDocuments();
    })
    .then((count) => {
      res
        .status(200)
        .json({
          message: "All items fetched 200",
          posts: fetchedTodo,
          maxPosts: count,
        })
        .catch((error) => {
          res.status(500).json({
            message: "Fetching items failed",
          });
        });
    });
};
