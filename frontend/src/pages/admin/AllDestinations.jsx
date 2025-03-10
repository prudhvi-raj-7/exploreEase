import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt, FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";

const AllDestinations = () => {
  const [trips, setTrips] = useState([]);

  // Fetch all trips from the server
  const getAllTrips = async () => {
    try {
      const { data } = await axios.get(
        "https://exploreease-vzoh.onrender.com/trip/getAllTrips"
      );
      setTrips(data?.allTrips);
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
          <nav>
            <ul className="flex space-x-6">
              <Link
                to="/allTrips"
                className="hover:text-blue-300 transition-colors"
              >
                All Trips
              </Link>

              <Link
                to="/allUsers"
                className="hover:text-blue-300 transition-colors"
              >
                All Users
              </Link>

              <Link to="/" className="hover:text-blue-300 transition-colors">
                LogOut
              </Link>
            </ul>
          </nav>
        </div>
      </header>

      {/* Trips Section */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trips?.map((trip) => (
          <div
            key={trip._id}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4"
          >
            <div className="text-blue-500">
              <FaMapMarkerAlt size={50} />
            </div>
            <h3 className="text-xl font-semibold">{trip.name}</h3>
            <p className="text-sm text-gray-600">
              <FaRegCalendarAlt className="inline mr-2" />
              {new Date(trip.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">{trip.location}</p>
            <button
              onClick={() => deleteTrip(trip._id, trip?.user)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors flex items-center space-x-2"
            >
              <FaTrashAlt />
              <span>Delete Trip</span>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllDestinations;
