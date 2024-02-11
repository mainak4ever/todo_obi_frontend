import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { getTodosByUser, deleteTodo, updateTodo } from "../fetchApi/todoApi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [todos, setTodos] = useState([]);
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

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold  text-white mb-10">Todo List</h1>
      <div>
        {todos?.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onEdit={handleEdit}
            onDelete={handleDelete}
            toggleCompleted={toggleCompleted} // Pass toggleCompleted function as onUpdate prop
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
