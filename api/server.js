// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv')

// dotenv.config();

// const {
//     getTodos,
//     createTodo,
//     updateTodo,
//     deleteTodo
// } = require("./controllers/todoControllers");

// const app = express();

// const port = process.env.PORT||8000

// const connectionURL = process.env.MONGO_URI

// app.use(express.json());
// app.use(cors());

// mongoose.connect(connectionURL)
// .then(()=>{
//     app.listen(port,()=>console.log(`Running on port: ${port}`))
// })
// .catch((err)=>{
//     console.log(err)
// })

// //Get todo list
// app.get('/todos', getTodos)

// //Create a new todo
// app.post('/todos', createTodo)

// //Update a todo
// app.put('/todos/:id', updateTodo)

// //Delete a todo
// app.delete('/todos/:id', deleteTodo)

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("./controllers/todoControllers");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get("/todos", getTodos);
app.post("/todos", createTodo);
app.put("/todos/:id", updateTodo);
app.delete("/todos/:id", deleteTodo);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});



