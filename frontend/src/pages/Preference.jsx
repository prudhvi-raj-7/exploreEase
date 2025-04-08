import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import {
  FaPlus,
  FaSpinner,
  FaMapMarkerAlt,
  FaUsers,
  FaRupeeSign,
  FaHotel,
  FaRoad,
} from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa6";
import { GiDuration } from "react-icons/gi";

const Preference = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    groupSize: "",
    budget: "",
    startingLocation: "",
    travelPreferences: [],
    userId,
  });
  const [isLoading, setLoading] = useState(false);
  const [loading, setisLoading] = useState(false);
  const [trips, setTrips] = useState([]);
  const [mlResponse, setMlResponse] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const travelOptions = [
    "Beaches",
    "Waterfalls",
    "Mountains",
    "Temples",
    "Forests",
    "Historical Sites",
    "Deserts",
    "Wildlife Safaris",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (option) => {
    setFormData((prev) => {
      const isSelected = prev.travelPreferences.includes(option);
      return {
        ...prev,
        travelPreferences: isSelected
          ? prev.travelPreferences.filter((item) => item !== option)
          : [...prev.travelPreferences, option],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "https://exploreease-vzoh.onrender.com/trip/addTrip",
        formData
      );
      alert("Preferences saved successfully!");
      setFormData({
        groupSize: "",
        budget: "",
        startingLocation: "",
        travelPreferences: [],
      });
      setModalOpen(false);
      getUser();
    } catch (error) {
      console.error("Error submitting preferences:", error);
      alert("Failed to save preferences. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (trip) => {
    try {
      setLoading(true);

      const requestData = {
        budget: trip.budget.toString(),
        starting_location: trip.startingLocation,
        group_size: trip.groupSize,
        preference_type: trip.travelPreferences.join(", "),
      };

      const response = await axios.post(
        "https://exploreeasebackend.onrender.com/docs/recommend_travel",
        requestData
      );

      // Remove the triple backticks before parsing the JSON response
      const cleanedResponse = response.data.recommendation.replace(/```/g, "");
      const jsonResponse = JSON.parse(cleanedResponse); // Parse the cleaned response
      console.log("Parsed Response:", jsonResponse);
      setMlResponse(jsonResponse);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ML response:", error);
      alert("Failed to fetch details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTrip = async (tripId) => {
    console.log(tripId);
    try {
      setisLoading(true);
      await axios.post(
        "https://exploreease-vzoh.onrender.com/trip/removeTrip",
        {
          tripId,
          userId,
        }
      );
      setisLoading(false);
      setMlResponse("");
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await axios.post(
        "https://exploreease-vzoh.onrender.com/user/singleUser",
        {
          id: userId,
        }
      );
      setTrips(data?.trips);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Header />
      <div className="p-4">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
        >
          <FaPlus className="mr-2" />
          Add Trip
        </button>

        {/* Add Trip Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-11/12 max-w-lg p-6 rounded-lg shadow-lg relative">
              <h2 className="text-2xl font-bold mb-4">User Preferences</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">Group Size</label>
                  <input
                    type="number"
                    name="groupSize"
                    value={formData.groupSize}
                    onChange={handleInputChange}
                    placeholder="Enter group size"
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">Budget</label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="Enter budget"
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    Starting Location
                  </label>
                  <input
                    type="text"
                    name="startingLocation"
                    value={formData.startingLocation}
                    onChange={handleInputChange}
                    placeholder="Enter starting location"
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    Travel Preferences
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {travelOptions.map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          checked={formData.travelPreferences.includes(option)}
                          onChange={() => handleCheckboxChange(option)}
                          className="w-4 h-4 text-blue-500 focus:ring focus:ring-blue-300"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded shadow hover:bg-blue-600 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <FaSpinner className="animate-spin mx-auto" />
                  ) : (
                    "Submit Preferences"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Trips Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform "
            >
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="text-blue-500 text-lg mr-2" />
                <h3 className="text-xl font-bold">{trip.startingLocation}</h3>
              </div>
              <div className="mb-2 flex items-center">
                <FaUsers className="text-gray-500 mr-2" />
                <span className="text-sm">Group Size: {trip.groupSize}</span>
              </div>
              <div className="mb-4 flex items-center">
                <FaRupeeSign className="text-green-500 mr-2" />
                <span className="text-sm">Budget: ₹{trip.budget}</span>
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-semibold">Preferences:</h4>
                <ul className="text-sm text-gray-700 list-disc ml-6 mt-2">
                  {trip.travelPreferences.map((pref, index) => (
                    <li key={index}>{pref}</li>
                  ))}
                </ul>
              </div>
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => handleViewDetails(trip)}
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin mx-auto" />
                ) : (
                  " View Details"
                )}
              </button>
              <button
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors mt-2"
                onClick={() => handleRemoveTrip(trip?._id)}
              >
                {loading ? (
                  <FaSpinner className="animate-spin mx-auto" />
                ) : (
                  "Remove Trip"
                )}
              </button>
            </div>
          ))}
        </div>

        {/* ML Response Section */}
        {mlResponse && (
          <div className="mt-8">
            <h2 className="text-2xl font-extrabold text-center mb-8">
              Recommended Travel Destinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mlResponse.map((destination, idx) => (
                <div
                  key={`${destination.recommended_destinations.name}-${idx}`}
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform"
                >
                  {/* Destination Name */}
                  <div className="flex items-center mb-4">
                    <FaMapMarkerAlt className="text-blue-500 text-2xl mr-2" />
                    <h3 className="text-xl font-bold">
                      {destination.recommended_destinations.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="mb-4 text-gray-700">
                    <h4 className="text-lg font-semibold">Description</h4>
                    <p>{destination.recommended_destinations.description}</p>
                  </div>

                  {/* Best Time to Visit */}
                  <div className="mb-4 text-gray-700">
                    <h4 className="text-lg font-semibold">
                      Best Time to Visit
                    </h4>
                    <p>
                      Off-Peak Season:{" "}
                      {destination.best_time_to_visit.off_peak_season}
                    </p>
                    <p>
                      Peak Season: {destination.best_time_to_visit.peak_season}
                    </p>
                    <p>
                      Recommended Months:{" "}
                      {destination.best_time_to_visit.recommended_months.join(
                        ", "
                      )}
                    </p>
                    <p>Weather: {destination.best_time_to_visit.weather}</p>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold">Highlights</h4>
                    <ul className="text-sm text-gray-700 list-disc ml-6 mt-2">
                      {destination.recommended_destinations.highlights.map(
                        (highlight, index) => (
                          <li key={index}>{highlight}</li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Estimated Costs */}
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold">Estimated Costs</h4>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center">
                        <FaRupeeSign className="text-green-500 mr-2" />
                        <span>
                          Flights: ₹{destination.estimated_costs.flights}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaRupeeSign className="text-green-500 mr-2" />
                        <span>
                          Accommodation: ₹
                          {destination.estimated_costs.accommodation}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaRupeeSign className="text-green-500 mr-2" />
                        <span>
                          Daily Expenses: ₹
                          {destination.estimated_costs.daily_expenses}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaRupeeSign className="text-green-500 mr-2" />
                        <span>
                          Total Cost: ₹{destination.estimated_costs.total_cost}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Accommodation */}
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold">Accommodation</h4>
                    {destination.accommodation.map((acc, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex items-center">
                          <FaHotel className="mr-2 text-gray-500" />
                          <span>
                            {acc.type} - {acc.price_range}
                          </span>
                        </div>
                        <div className="text-sm text-blue-600">
                          {acc.suggested_options.map((option, idx) => (
                            <a
                              key={idx}
                              href={`https://www.google.com/maps/search/?q=${option}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {option}
                              {idx < acc.suggested_options.length - 1
                                ? ", "
                                : ""}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Travel Logistics */}
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold">Travel Logistics</h4>
                    <div className="text-sm text-gray-700">
                      <p>
                        <FaRoad className="mr-2 inline text-gray-500" />
                        Recommended Transport:{" "}
                        {destination.travel_logistics.recommended_transport}
                      </p>
                      <p>
                        <FaRoad className="mr-2 inline text-gray-500" />
                        Local Transportation:{" "}
                        {destination.travel_logistics.local_transportation}
                      </p>
                      <p>
                        <GiDuration className="mr-2 inline text-gray-500" />
                        Travel Duration:{" "}
                        {destination.travel_logistics.travel_duration}
                      </p>
                      <p>
                        <FaCcVisa className="mr-2 inline text-gray-500" />
                        Visa Requirements:{" "}
                        {destination.travel_logistics.visa_requirements}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Preference;
