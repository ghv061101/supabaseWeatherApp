import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signUpNewUser(email, password);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.error.message || "Sign up failed.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <form
        onSubmit={handleSignUp}
        className="bg-white shadow-lg rounded-lg max-w-md w-full p-8 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-700">
          Sign Up Today!
        </h2>
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Sign in
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
          disabled={loading}
          className={`w-full py-3 rounded-md font-semibold text-white transition ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
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

export default Signup;
