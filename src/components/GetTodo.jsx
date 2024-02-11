import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTodo, getTodo, updateTodo } from "../fetchApi/todoApi";

const GetTodo = () => {
  const { todoId } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await getTodo(todoId);
        // console.log(response);
        setTodo(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };

    fetchTodo();
  }, [todoId]);

  const handleUpdate = () => {
    navigate(`/update-todo/${todoId}`);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteTodo(todoId);
      // console.log(response);
      if (response.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  const toggleCompleted = async () => {
    try {
      const response = await updateTodo(todoId, {
        completed: !todo.completed,
      });
      if (response.success) {
        setTodo((prevTodo) => ({
          ...prevTodo,
          completed: !todo.completed,
        }));
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  if (loading) {
    return <div className="max-w-xl mx-auto text-white mt-8">Loading...</div>;
  }

  if (!todo) {
    return (
      <div className="max-w-xl text-white mx-auto mt-8">Todo not found</div>
    ); // Handle if todo is not found
  }

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-white mb-4">Todo Details</h1>
      <div className="bg-slate-900 p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <p className="text-white font-semibold text-xl mb-4">Title</p>
          <div className="bg-gray-800 p-3 rounded-lg">
            <p className="text-white text-lg">{todo.title}</p>
          </div>
        </div>
        <div className="mb-8">
          <p className="text-white font-semibold text-xl mb-4">Description</p>
          <div className="bg-gray-800 p-3 rounded-lg h-32 overflow-y-auto">
            <p className="text-white">{todo.description}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div
            className="flex items-center mr-4 cursor-pointer"
            onClick={() => toggleCompleted()}
          >
            {todo.completed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
            <p className="text-white">
              {todo.completed ? "Mark as incomplete" : "Mark as completed"}
            </p>
          </div>
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
        <div className="mt-8">
          {todo.completed ? (
            <h2 className="text-green-500">Completed</h2>
          ) : (
            <h2 className="text-red-500">Incomplete !</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetTodo;
