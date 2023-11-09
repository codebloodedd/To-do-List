import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import Todo from "./Todo";
import Modal from "./Modal";
import './Todolist.css'

const TodoList = () => {

  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [newTodoDeadline, setNewTodoDeadline] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/todos/");
      const sortedTodos = response.data.sort((a, b) => {
        return new Date(a.deadline) - new Date(b.deadline);
      });

      const formattedTodos = sortedTodos.map((todo) => {
        const deadlineDate = new Date(todo.deadline);
        const options = {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        };

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const nextSunday = new Date(today);
        nextSunday.setDate(today.getDate() + ((7 - today.getDay()) % 7));

        if (deadlineDate >= today && deadlineDate < tomorrow) {
          todo.formattedDeadline = "today";
        } else if (deadlineDate >= tomorrow && deadlineDate < nextSunday) {
          todo.formattedDeadline = "tomorrow";
        } else if (
          deadlineDate >= nextSunday &&
          deadlineDate <
            new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
        ) {
          todo.formattedDeadline = `this ${new Intl.DateTimeFormat("en-US", {
            weekday: "long",
          }).format(deadlineDate)}`;
        } else {
          todo.formattedDeadline = deadlineDate.toLocaleDateString(
            undefined,
            options
          );
        }

        return todo;
      });

      setTodos(formattedTodos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleUpdate = async (todo) => {
    try {
      await axios.put(`http://localhost:8000/todos/${todo.id}`, {
        text: todo.text,
        completed: !todo.completed,
        deadline: todo.deadline,
      });
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/todos/", {
        text: newTodoText,
        completed: false,
        deadline: newTodoDeadline,
      });
      setNewTodoText("");
      setNewTodoDeadline("");
      fetchTodos();
      closePopup();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const openPopup = () => {
    setIsModalOpen(true);
  };

  const closePopup = () => {
    setIsModalOpen(false);
    setNewTodoText("");
    setNewTodoDeadline("");
  };

  return (
    <div className="MainContainer m-auto items-center justify-between">
      <div className="flex justify-between items-center gap-10 mt-10 mb-4">
        <h1 className="text-4xl font-bold">My Tasks</h1>
        <button
          onClick={openPopup}
          className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded"
        >
          <FaPlus />
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closePopup}
        onSubmit={handleFormSubmit}
        todoText={newTodoText}
        setTodoText={setNewTodoText}
        todoDeadline={newTodoDeadline}
        setTodoDeadline={setNewTodoDeadline}
      />
      {todos.length === 0 ? (
        <p className="text-gray-400 text-4xl text-center mt-40">
          All tasks completed. Good job! :)
        </p>
      ) : (
        todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
