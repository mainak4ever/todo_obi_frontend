import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { addTodo } from "../fetchApi/todoApi";
import { useNavigate } from "react-router-dom";

function AddTodo() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const create = async (data) => {
    setError("");
    try {
      const response = await addTodo(data);
      //   console.log(response);
      if (response.data.success) {
        console.log("success");
      }
      navigate("/");
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
          Add Your Todo
        </h2>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Title: "
              placeholder="Title..."
              type="text"
              {...register("title", {
                required: true,
              })}
            />
            <Input
              label="Description: "
              type="textarea"
              placeholder="Description..."
              {...register("description", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Add Todo
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTodo;
