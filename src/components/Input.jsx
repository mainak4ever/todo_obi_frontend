import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className=" text-left inline-block mb-1 pl-1 text-white"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          rows="6"
          className={`px-3 py-2 rounded-lg bg-slate-900 text-white outline-none focus:bg-slate-800 duration-200 border border-gray-200 w-full ${className}`}
          ref={ref}
          {...props}
          id={id}
        />
      ) : (
        <input
          type={type}
          className={`px-3 py-2 rounded-lg bg-slate-900 text-white outline-none focus:bg-slate-800 duration-200 border border-gray-200 w-full ${className}`}
          ref={ref}
          {...props}
          id={id}
        />
      )}
    </div>
  );
});

export default Input;
