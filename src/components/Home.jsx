import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { getTodosByUser, deleteTodo, updateTodo } from "../fetchApi/todoApi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // Default filter to show all todos
  const [sort, setSort] = useState("titleAsc"); // Default sorting by title ascending
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const response = await deleteTodo(id);
      // console.log(response);
      if (response.success) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getTodosByUser();
        // console.log(response);
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleEdit = (id) => {
    console.log("Editing todo:", id);
    navigate(`/update-todo/${id}`);
  };

  const toggleCompleted = async (todo) => {
    try {
      const response = await updateTodo(todo._id, {
        completed: !todo.completed,
      });
      // console.log(response);
      if (response.success) {
        setTodos((prevTodos) =>
          prevTodos.map((prevTodo) =>
            prevTodo._id === todo._id
              ? { ...prevTodo, completed: !prevTodo.completed }
              : prevTodo
          )
        );
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const filteredTodos =
    filter === "all"
      ? todos
      : todos.filter((todo) =>
          filter === "completed" ? todo.completed : !todo.completed
        );

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sort === "titleAsc") {
      return a.title.localeCompare(b.title);
    } else if (sort === "titleDesc") {
      return b.title.localeCompare(a.title);
    } else if (sort === "createdAtAsc") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sort === "createdAtDesc") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-white mb-5">Todo List</h1>
      <div className="flex justify-between mb-4">
        <div className="mr-4">
          <label htmlFor="filter" className="text-white">
            Filter:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-slate-900 rounded py-1 mx-2 text-white focus:outline-none focus:shadow-outline"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="text-white">
            Sort By:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-slate-900 rounded py-1 mx-2 text-white focus:outline-none focus:shadow-outline"
          >
            <option value="titleAsc">Title A-Z</option>
            <option value="titleDesc">Title Z-A</option>
            <option value="createdAtAsc">Oldest First</option>
            <option value="createdAtDesc">Newest First</option>
          </select>
        </div>
      </div>
      <div>
        {sortedTodos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onEdit={handleEdit}
            onDelete={handleDelete}
            toggleCompleted={toggleCompleted}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
