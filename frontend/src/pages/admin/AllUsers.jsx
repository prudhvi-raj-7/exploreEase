import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaTrashAlt,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaUsers,
  FaMoneyBillWave,
  FaHome,
  FaUserAlt,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fetch all users from the server
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        "https://exploreease-vzoh.onrender.com/user/allUsers"
      );
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete a user by their ID
  const deleteUser = async (userId) => {
    try {
      await axios.post(`http://localhost:8000/user/removeUser`, {
        id: userId,
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      alert("User deleted successfully!");
    } catch (error) {
      console.log("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <Link
                to="/allTrips"
                className="hover:text-blue-300 transition-colors flex items-center"
              >
                <FaMapMarkerAlt className="mr-2" /> All Trips
              </Link>

              <Link
                to="/allUsers"
                className="hover:text-blue-300 transition-colors flex items-center"
              >
                <FaUsers className="mr-2" /> All Users
              </Link>

              <Link
                to="/"
                className="hover:text-blue-300 transition-colors flex items-center"
              >
                <FaHome className="mr-2" /> LogOut
              </Link>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-700 pb-4 px-4">
            <ul className="flex flex-col space-y-3">
              <Link
                to="/allTrips"
                className="hover:text-blue-300 transition-colors flex items-center py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaMapMarkerAlt className="mr-2" /> All Trips
              </Link>

              <Link
                to="/allUsers"
                className="hover:text-blue-300 transition-colors flex items-center py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUsers className="mr-2" /> All Users
              </Link>

              <Link
                to="/"
                className="hover:text-blue-300 transition-colors flex items-center py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaHome className="mr-2" /> LogOut
              </Link>
            </ul>
          </div>
        )}
      </header>

      {/* Users Section */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center space-y-4"
          >
            <div className="text-blue-500">
              <FaUserAlt size={50} />
            </div>
            <h3 className="text-xl font-semibold text-start">{user.name}</h3>
            <p className="text-sm text-gray-600 text-start">
              Email: {user.email}
            </p>
            <p className="text-sm text-gray-600 text-start">
              Joined: {user.createdAt}
            </p>
            <button
              onClick={() => deleteUser(user._id)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors flex items-center space-x-2"
            >
              <FaTrashAlt />
              <span>Delete User</span>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllUsers;
