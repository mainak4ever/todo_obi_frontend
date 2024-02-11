import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { getTodo, updateTodo } from "../fetchApi/todoApi";
import { useNavigate, useParams } from "react-router-dom";

function UpdateTodo() {
  const { todoId } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await getTodo(todoId);
        // console.log(response);
        const todoData = response.data;
        setValue("title", todoData.title);
        setValue("description", todoData.description);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTodo();
  }, [todoId, setValue]);

  const update = async (data) => {
    setError("");
    try {
      const response = await updateTodo(todoId, data);
      console.log(response);
      if (response.success) {
        console.log("success");
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center w-full my-20">
      <div
        className={`mx-auto w-full max-w-lg bg-slate-900 rounded-xl p-10 border border-black/10`}
      >
        <h2 className="text-center text-2xl text-white font-bold leading-tight">
          Update Todo
        </h2>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(update)} className="mt-8">
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
              Update Todo
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateTodo;
