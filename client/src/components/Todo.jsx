import React from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const Todo = ({ todo, onDelete, onUpdate }) => {
  return (
    <div className="flex items-center justify-between p-4 border mb-2">
      <div>
        <h2
          className={`text-xl ${
            todo.completed ? "line-through text-gray-500" : "text-white"
          }`}
        >
          {todo.text}
        </h2>
        <p className="text-gray-400">{todo.formattedDeadline}</p>
      </div>
      <div>
        <button
          className="mr-2 text-yellow-500 hover:text-yellow-600"
          onClick={() => onUpdate(todo)}
        >
          {todo.completed ? "Mark Complete" : "Mark Incomplete"}
        </button>
        <button
          className="text-red-500 hover:text-red-600"
          onClick={() => onDelete(todo.id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Todo;
