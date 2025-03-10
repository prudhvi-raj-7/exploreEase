import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // First, register the user
      const registerResponse = await axios.post(
        "https://exploreease-vzoh.onrender.com/user/register",
        {
          name,
          email,
          password,
          phone,
        }
      );

      // Trigger OTP sending
      const otpResponse = await axios.post(
        "https://exploreease-vzoh.onrender.com/send-otp",
        {
          email,
        }
      );

      if (otpResponse.data.success) {
        // Save the OTP in localStorage
        localStorage.setItem("otp", otpResponse.data.otp);

        // Show success message
        alert("We have sent an OTP to your email address.");

        // Redirect to the OTP page
        navigate("/otp");
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-end bg-[url('https://img.freepik.com/free-photo/hat-map-notebook-camera-watch-keds-lie-travel-map_8353-1347.jpg?t=st=1737010664~exp=1737014264~hmac=d130f17cca24e41bc5d0c340985f19d124ce86e82f1809d985f9e40d35f21058&w=1060')] bg-cover">
      <div className="h-full w-full backdrop-blur-sm flex items-center justify-end">
        <div className="bg-opacity-65 bg-white shadow-lg rounded-lg p-8 max-w-md w-full mr-10 font-serif">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Register
          </h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-purple-500 text-center hover:bg-purple-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </div>
            <p className="text-center text-gray-600 text-[16px] mt-4">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-purple-500 hover:text-purple-700 font-bold"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
