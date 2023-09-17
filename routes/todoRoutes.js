const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const TODOS_FILE_PATH = "./data/todos.json";

// Create a new todo
router.post("/", (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    // Read existing todos from the JSON file
    const todosData = fs.readFileSync(TODOS_FILE_PATH, "utf-8");
    const todos = JSON.parse(todosData);

    // Create a new todo object
    const newTodo = {
      id: uuidv4(),
      title,
      description,
      completed: false,
    };

    // Add the new todo to the list
    todos.push(newTodo);

    // Write the updated list back to the JSON file
    fs.writeFileSync(TODOS_FILE_PATH, JSON.stringify(todos, null, 2));

    return res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Retrieve all todos
router.get("/", (req, res) => {
  try {
    // Read existing todos from the JSON file
    const todosData = fs.readFileSync(TODOS_FILE_PATH, "utf-8");
    const todos = JSON.parse(todosData);

    return res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Update a todo by ID
router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // Read existing todos from the JSON file
    let todosData = fs.readFileSync(TODOS_FILE_PATH, "utf-8");
    let todos = JSON.parse(todosData);

    // Find the todo to update by ID
    const todoToUpdate = todos.find((todo) => todo.id === id);

    if (!todoToUpdate) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Update todo properties
    if (title) {
      todoToUpdate.title = title;
    }
    if (description) {
      todoToUpdate.description = description;
    }
    if (completed !== undefined) {
      todoToUpdate.completed = completed;
    }

    // Write the updated list back to the JSON file
    fs.writeFileSync(TODOS_FILE_PATH, JSON.stringify(todos, null, 2));

    return res.status(200).json(todoToUpdate);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a todo by ID
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;

    // Read existing todos from the JSON file
    let todosData = fs.readFileSync(TODOS_FILE_PATH, "utf-8");
    let todos = JSON.parse(todosData);

    // Find the index of the todo to delete by ID
    const todoIndexToDelete = todos.findIndex((todo) => todo.id === id);

    if (todoIndexToDelete === -1) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Remove the todo from the list
    todos.splice(todoIndexToDelete, 1);

    // Write the updated list back to the JSON file
    fs.writeFileSync(TODOS_FILE_PATH, JSON.stringify(todos, null, 2));

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
