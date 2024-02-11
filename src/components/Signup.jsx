import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { registerUser } from "../fetchApi/userApi";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const response = await registerUser(data);
      console.log(response);
      if (response.success) {
        // console.log(response.success);
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
          Already have any account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary text-green-500 transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
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
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
