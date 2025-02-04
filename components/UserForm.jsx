"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const { user } = await resUserExists.json();

      if (user) {
        toast.error("User already exists.");
        return;
      }

      const res = await fetch("api/userRegister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      if (res.ok) {
        setName("");
        setEmail("");
        setPassword("");
        setRole("user");
        toast.success("User registration Successful!");
      } else {
        toast.error("User registration failed!");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }

    //
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(to right, #001f3d, #243b4a)",
      }}
    >
      <div
        className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg"
        style={{
          background: "linear-gradient(to right, #001f3d, #243b4a)",
        }}
      >
        <h2
          className="text-2xl text-center text-[#ff6f61] font-bold mb-1"
          style={{
            background: "linear-gradient(to right, #ff6f61, #f86e4f)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Create User
        </h2>

        {successMessage && (
          <div className="bg-[#d4edda] text-[#155724] p-4 mb-4 rounded-md border border-[#c3e6cb] text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your Name"
            className="w-full px-4 py-2 border-none bg-[#243b4a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6f61]"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email Address"
            className="w-full px-4 py-2 border-none bg-[#243b4a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6f61]"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="w-full px-4 py-2 border-none bg-[#243b4a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6f61]"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full px-4 py-2 border-none bg-[#243b4a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6f61]"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full py-3 bg-[#ff6f61] text-white font-semibold rounded-md hover:bg-[#f86e4f] focus:outline-none focus:ring-2 focus:ring-[#f86e4f]"
          >
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
