const express = require("express");
const router = express.Router();
const {
  addTrip,
  removeTrip,
  updateTrip,
  getAllTrips,
} = require("../controllers/tripController");

// Add a trip for a specific user
router.post("/addTrip", addTrip);

// Remove a trip for a specific user
router.post("/removeTrip", removeTrip);

// Update a trip for a specific user
router.post("/updateTrip", updateTrip);

router.get("/getAllTrips", getAllTrips);

module.exports = router;
