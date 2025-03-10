const Trip = require("../models/tripModel");
const User = require("../models/userModel");

// Add a Trip for a Specific User
const addTrip = async (req, res) => {
  try {
    const { userId, groupSize, budget, startingLocation, travelPreferences } =
      req.body;

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new trip
    const trip = new Trip({
      groupSize,
      budget,
      startingLocation,
      travelPreferences,
      user: userId,
    });

    // Save trip and update user's trip list
    const savedTrip = await trip.save();
    user.trips.push(savedTrip._id);
    await user.save();

    res
      .status(201)
      .json({ message: "Trip added successfully", trip: savedTrip });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Remove a Trip for a Specific User
const removeTrip = async (req, res) => {
  try {
    const { userId, tripId } = req.body;

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove trip from user's trip list
    user.trips = user.trips.filter((trip) => trip.toString() !== tripId);
    await user.save();

    // Delete the trip
    const deletedTrip = await Trip.findByIdAndDelete(tripId);
    if (!deletedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res
      .status(200)
      .json({ message: "Trip removed successfully", trip: deletedTrip });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a Trip for a Specific User
const updateTrip = async (req, res) => {
  try {
    const {
      userId,
      tripId,
      groupSize,
      budget,
      startingLocation,
      travelPreferences,
    } = req.body;

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the trip belongs to the user
    if (!user.trips.includes(tripId)) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to this trip" });
    }

    // Update the trip
    const updatedTrip = await Trip.findByIdAndUpdate(
      tripId,
      { groupSize, budget, startingLocation, travelPreferences },
      { new: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res
      .status(200)
      .json({ message: "Trip updated successfully", trip: updatedTrip });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllTrips = async (req, res) => {
  try {
    const allTrips = await Trip.find({});
    return res.status(200).send({
      allTrips,
    });
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  addTrip,
  removeTrip,
  updateTrip,
  getAllTrips,
};
