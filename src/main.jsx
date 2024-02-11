import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import AddTodo from "./components/AddTodo.jsx";
import UpdateTodo from "./components/UpdateTodo.jsx";
import AuthLayout from "./components/AuthLayout";
import GetTodo from "./components/GetTodo.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication={true}>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/add-todo",
        element: (
          <AuthLayout authentication={true}>
            <AddTodo />
          </AuthLayout>
        ),
      },
      {
        path: "/update-todo/:todoId",
        element: (
          <AuthLayout authentication={true}>
            <UpdateTodo />
          </AuthLayout>
        ),
      },
      {
        path: "/get-todo/:todoId",
        element: (
          <AuthLayout authentication={true}>
            <GetTodo />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
