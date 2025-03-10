const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  groupSize: Number,
  budget: Number,
  startingLocation: String,
  travelPreferences: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
