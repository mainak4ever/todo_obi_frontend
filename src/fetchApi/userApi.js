import axios from "axios";
import conf from "../conf/conf";

// const BASE_URL = `/api/v1`;
const BASE_URL = conf.baseUrl + "/api/v1";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/register`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to register user");
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to login user");
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/users/logout`, null, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to logout user");
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/refresh-access-token`,
      null,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to refresh access token");
  }
};
