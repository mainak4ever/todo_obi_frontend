import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import { getUser } from "./fetchApi/userApi";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser(token);
        // console.log(response);
        // const userData = response.data;

        const userData = {};
        userData.name = response.data.user.name;
        userData.email = response.data.user.email;
        userData.accessToken = response.data.accessToken;
        userData.refreshToken = response.data.refreshToken;

        console.log(userData);
        dispatch(login({ userData }));
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // You can render a loader while fetching data
  }

  return (
    <>
      <div className="min-h-screen flex flex-wrap border border-white content-between bg-slate-700">
        <div className="w-full block">
          <Header />
          <main>
            <Outlet />
          </main>
          {/* <Login /> */}
          {/* <Signup /> */}
          {/* <Home /> */}
          {/* <AddTodo /> */}
          {/* <UpdateTodo /> */}
        </div>
      </div>
    </>
  );
}

export default App;
