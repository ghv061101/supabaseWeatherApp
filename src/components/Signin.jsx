import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { signInUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { session, error } = await signInUser(email, password);

    if (error) {
      setError(error);
      setTimeout(() => setError(""), 3000);
    } else {
      navigate("/dashboard");
    }

    if (session) {
      setError("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <form
        onSubmit={handleSignIn}
        className="bg-white shadow-lg rounded-lg max-w-md w-full p-8 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-700">
          Sign In
        </h2>
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Sign up
          </Link>
        </p>

        <div className="flex flex-col">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        <div className="flex flex-col">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition"
        >
          Sign In
        </button>

        {error && (
          <p className="text-red-600 text-center font-medium mt-2 animate-pulse">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default Signin;
