// src/components/ui/input.jsx
import React from "react";

export const Input = ({ value, onChange, placeholder, className = "", ...props }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border px-4 py-2 rounded-md w-full ${className}`}
      {...props}
    />
  );
};
