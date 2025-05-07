import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      role === "admin" &&
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {
      navigate("/allTrips");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://exploreease-vzoh.onrender.com/user/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/home");
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center md:justify-end bg-[url('https://img.freepik.com/free-photo/hat-map-notebook-camera-watch-keds-lie-travel-map_8353-1347.jpg?t=st=1737010664~exp=1737014264~hmac=d130f17cca24e41bc5d0c340985f19d124ce86e82f1809d985f9e40d35f21058&w=1060')] bg-cover bg-center">
      <div className="w-full h-full flex items-center justify-center md:justify-end">
        <div className="bg-opacity-65 bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-md mx-4 md:mr-10 font-serif">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
            LOGIN
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="role"
              >
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                id="role"
                className="shadow appearance-none border rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option hidden>Select your role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-purple-500 text-center hover:bg-purple-600 text-white font-bold py-2 md:py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                {loading ? "Please wait...." : "Sign In"}
              </button>
            </div>

            <p className="text-center text-gray-600 text-sm md:text-[16px] mt-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-purple-500 hover:text-purple-700 font-bold"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
