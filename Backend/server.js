import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// Import route modules
import { videoRoutes } from "./Routes/video.routes.js";
import { userRoutes } from "./Routes/user.routes.js";
import { channelRoutes } from "./Routes/channel.routes.js";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("open", () => {
  console.log("✅ Database connection successful");
});

db.on("error", (err) => {
  console.log("❌ Database connection failed:", err.message);
});

// ===============================
// 📍 Default Route (For Render Check)
// ===============================
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// ===============================
// 📦 API Routes
// ===============================
videoRoutes(app);
userRoutes(app);
channelRoutes(app);

// ===============================
// 🔒 Authentication Middleware
// ===============================
export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("JWT ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "secretKey", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
}

// ===============================
// ⚠️ Global Error Handler
// ===============================
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

// ===============================
// 🚀 Start Server
// ===============================
const port = process.env.PORT || 6500;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
