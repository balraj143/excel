import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      // alert("✅ User Registered!");
      navigate("/login"); // Redirect after registration
    } catch (err) {
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center p-20 ">
      <div className="w-full max-w-md bg-cyan-200 p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
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
            className="form-button bg-green-600 hover:bg-green-700"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
