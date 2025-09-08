import React, { useState } from "react";

import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axiosInstance.post("/api/auth/login", formData);
    
    // Debugging output to verify backend response structure
    console.log("Login Response:", res.data); 
    
    // Check if user object and role exist
    if (res.data.token && res.data.user && res.data.user.role) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      // alert("✅ Login successful");
     navigate(res.data.user.role === "admin" ? "/admin/dashboard" : "/dashboard");

    } else {
      alert("Unexpected response from server");
    }
  } catch (err) {
    console.error("Login Error:", err.response?.data || err.message);
    alert(err?.response?.data?.message || "Login failed");
  }
};


  return (
    

    <div className="flex items-center justify-center pt-20 m-15 ">
      <div className="w-full max-w-md bg-cyan-200 p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
          <PasswordInput
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
          <button
            type="submit"
            className="form-button bg-blue-600 hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
