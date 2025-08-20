import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AuthLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(username, password);
      navigate("/products"); // redirect to home
    } catch {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="shadow-md p-6 rounded-2xl text-2xl capitalize bg-white w-full max-w-150">
        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="font-extrabold text-green-900 text-center p-5">
            <h2 className="text-4xl">
              <span className="lowercase">e</span>GURA Login
            </h2>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 text-sm p-2 rounded">
              {error}
            </div>
          )}

          <div className="text-left">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="enter the username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border focus:outline-none w-full rounded-md p-2"
              required
            />
          </div>

          <div className="text-left">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border focus:outline-none w-full rounded-md p-2"
              required
            />
          </div>

          <div className="w-full text-center border rounded-md bg-green-800 text-white capitalize mb-5">
            <button
              type="submit"
              className="capitalize p-2 w-full"
              disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthLogin;
