import React from "react";

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  todoText,
  setTodoText,
  todoDeadline,
  setTodoDeadline,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Todo</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Enter todo"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            className="w-full p-2 mb-4 rounded"
          />
          <input
            type="datetime-local"
            value={todoDeadline}
            onChange={(e) => setTodoDeadline(e.target.value)}
            className="w-full p-2 mb-4 rounded"
          />
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 text-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
            >
              Add Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
