import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { loginUser } from "../fetchApi/userApi";
import { login } from "../store/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const handleLogin = async (data) => {
    console.log("Form Data ", data);
    setError("");
    try {
      const response = await loginUser(data);
      // console.log("Response ", response);
      if (response.success) {
        const userData = {};
        userData.name = response.data.user.name;
        userData.email = response.data.user.email;
        userData.accessToken = response.data.accessToken;
        userData.refreshToken = response.data.refreshToken;
        console.log("User Data ", userData);
        dispatch(login({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full my-20">
      <div
        className={`mx-auto w-full max-w-lg bg-slate-900 rounded-xl p-10 border border-black/10`}
      >
        <h2 className="text-center text-2xl text-white font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-white/75">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary text-green-500 transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
