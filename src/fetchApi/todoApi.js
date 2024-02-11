import axios from "axios";
import conf from "../conf/conf";
// import conf from "../conf/conf";

// const BASE_URL = `/api/v1`;
const BASE_URL = conf.baseUrl + "/api/v1";
export const addTodo = async (todoData) => {
  try {
    const response = await axios.post(`${BASE_URL}/todos`, todoData, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to add todo");
  }
};

export const getTodosByUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/todos`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get todos");
  }
};

export const getTodo = async (todoId) => {
  try {
    const response = await axios.get(`${BASE_URL}/todos/${todoId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get todo");
  }
};

export const updateTodo = async (todoId, todoData) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/todos/${todoId}`,
      todoData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update todo");
  }
};

export const deleteTodo = async (todoId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/todos/${todoId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete todo");
  }
};
