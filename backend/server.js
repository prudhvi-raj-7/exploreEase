// Import necessary modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer"); // Import nodemailer
const userRoutes = require("./routes/userRoutes");
const tripRoutes = require("./routes/tripRoutes");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");

connectDB();
// Initialize the Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const chatHistory = [];
const activeUsers = {}; // Store active users with their socket IDs

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("addUser", (username) => {
    activeUsers[socket.id] = username;
    io.emit("activeUsers", Object.values(activeUsers));
  });

  socket.emit("chatHistory", chatHistory);

  socket.on("sendMessage", (msg) => {
    const message = { ...msg, sender: msg.username };
    chatHistory.push(message);
    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    delete activeUsers[socket.id];
    io.emit("activeUsers", Object.values(activeUsers));
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Define Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "exploreease678@gmail.com", // Replace with your email
    pass: "pcqr idsb xnmv aubk", // Replace with your email password or app password
  },
});

// Route to send OTP email
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: "exploreease678@gmail.com", // Replace with your email
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);

    // Store OTP in local storage (replace this with a database in production)
    res
      .status(200)
      .json({ success: true, message: "OTP sent successfully", otp });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send OTP. Please try again." });
  }
});

// Define a sample route
app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

app.use("/user", userRoutes);
app.use("/trip", tripRoutes);

// Start the server
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
