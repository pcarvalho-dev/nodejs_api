const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo");

router.get("", todoController.getTodos);
router.post("", todoController.createTodo);
router.get("/:id");

module.exports = router;
