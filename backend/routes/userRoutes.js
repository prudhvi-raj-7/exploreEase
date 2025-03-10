const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  removeUser,
} = require("../controllers/userController");

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/allUsers", getAllUsers);
router.post("/singleUser", getSingleUser);
router.post("/removeUser", removeUser);

module.exports = router;
