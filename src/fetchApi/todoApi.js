import axios from "axios";
import conf from "../conf/conf";
// import conf from "../conf/conf";
// const token = useSelector((state) => state.auth.accessToken);
// const BASE_URL = `/api/v1`;
const BASE_URL = conf.baseUrl + "/api/v1";
export const addTodo = async (todoData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/todos`, todoData, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw new Error("Failed to add todo");
  }
};

export const getTodosByUser = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/todos`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get todos");
  }
};

export const getTodo = async (todoId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/todos/${todoId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get todo");
  }
};

export const updateTodo = async (todoId, todoData, token) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/todos/${todoId}`,
      todoData,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update todo");
  }
};

export const deleteTodo = async (todoId, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/todos/${todoId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete todo");
  }
};
