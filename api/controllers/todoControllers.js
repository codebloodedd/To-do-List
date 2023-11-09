// const mongoose = require('mongoose')
// const Todos = require('../dbTodo')
// const dbTodo = require('../dbTodo')

// const getTodos = async (req,res)=>{
//     try {
//         const allTodos = await Todos.find({}).sort({createdAT: -1})
//         res.status(200).send(allTodos)
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const createTodo = async (req, res) => {
//     const dbTodo = req.body;
//     try {
//         const newTodo = await Todos.create(dbTodo);
//         res.status(201).send(newTodo);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };

// const updateTodo = async (req, res) => {
//     const {id} = req.params
//     try {
//         if(!mongoose.Types.ObjectId.isValid(id)){
//             return res.status(404).send(`There is no todo with the id: ${id}`)
//         }
//         const todoID = {_id: id}
//         const update = {completed: true}
//         const updateTodo = await Todos.findOneAndUpdate(todoID, update);
//         if (!updateTodo){
//             return res.status(404).send(`There is no todo with the id: ${id}`);
//         }
//         res.status(200).send(updateTodo);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };

// const deleteTodo = async (req, res) => {
//   const { id } = req.params;
//   try {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).send(`There is no todo with the id: ${id}`);
//     }
//     const deleteTodo = await Todos.findOneAndDelete({_id: id});
//     res.status(200).send(deleteTodo);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// module.exports = {
//     getTodos, createTodo, updateTodo, deleteTodo
// };

const db = require("../db"); // Import the PostgreSQL connection

const getTodos = async (req, res) => {
  try {
    const todos = await db.any("SELECT * FROM todo");
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createTodo = async (req, res) => {
  const { text, completed, deadline } = req.body;
  try {
    const newTodo = await db.one(
      "INSERT INTO todo (text, completed, deadline) VALUES ($1, $2, $3) RETURNING *",
      [text, completed, deadline]
    );
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTodo = await db.one(
      "UPDATE todo SET completed = true WHERE id = $1 RETURNING *",
      [id]
    );
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await db.none("DELETE FROM todo WHERE id = $1", [id]);
    res.status(200).send("Todo deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
