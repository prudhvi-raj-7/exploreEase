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
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const AllDestinations = () => {
  const [trips, setTrips] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fetch all trips from the server
  const getAllTrips = async () => {
    try {
      const { data } = await axios.get(
        "https://exploreease-vzoh.onrender.com/trip/getAllTrips"
      );
      setTrips(data?.allTrips || []);
    } catch (error) {
      console.log("Error fetching trips:", error);
    }
  };

  // Delete a trip by its ID
  const deleteTrip = async (tripId, userId) => {
    try {
      await axios.post(
        `https://exploreease-vzoh.onrender.com/trips/removeTrip`,
        {
          id: tripId,
          userId,
        }
      );
      setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== tripId));
      alert("Trip deleted successfully!");
    } catch (error) {
      console.log("Error deleting trip:", error);
      alert("Failed to delete trip. Please try again.");
    }
  };

  useEffect(() => {
    getAllTrips();
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

      {/* Trips Section */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trips.length > 0 ? (
          trips.map((trip) => (
            <div
              key={trip._id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-3"
            >
              <div className="text-blue-500 flex justify-center">
                <FaMapMarkerAlt size={40} />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  {trip.startingLocation}
                </h3>
                <p className="text-sm text-gray-600">ID: {trip._id}</p>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <FaUsers className="mr-2" />
                <span>Group Size: {trip.groupSize}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <FaMoneyBillWave className="mr-2" />
                <span>Budget: ₹{trip.budget}</span>
              </div>

              <div className="text-sm text-gray-600">
                <p className="font-medium">Preferences:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {trip.travelPreferences.map((pref, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => deleteTrip(trip._id, trip?.user)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
              >
                <FaTrashAlt />
                <span>Delete Trip</span>
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No trips found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AllDestinations;
