import React from "react";
import { Link } from "react-router-dom";

const TodoItem = ({ todo, onEdit, onDelete, toggleCompleted }) => {
  return (
    <div className="flex items-center justify-between my-2 px-4 py-4 bg-slate-900 hover:bg-slate-800 transition duration-300 ease-in-out">
      <div className="flex items-center flex-1">
        <input
          type="checkbox"
          className="rounded-full mr-4 cursor-pointer"
          checked={todo.completed}
          onChange={() => toggleCompleted(todo)} // Handle checkbox click
        />
        <Link to={`/get-todo/${todo._id}`}>
          <span
            className={`${
              todo.completed ? "line-through text-gray-400" : "text-white"
            }`}
          >
            {todo.title}
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onEdit(todo._id)}
          className="text-gray-500 hover:text-white transition duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM19 21a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h7l2 2h3a2 2 0 012 2v14z"
            />
          </svg>
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
