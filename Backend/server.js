import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import { videoRoutes } from "./Routes/video.routes.js";
import { userRoutes } from "./Routes/user.routes.js";
import jwt from "jsonwebtoken";
import { channelRoutes } from "./Routes/channel.routes.js";

const app = express();

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 6500;

app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
})

mongoose.connect("mongodb+srv://YoutubeClone:arpit1@cluster0.m5hbv.mongodb.net/")

const db = mongoose.connection

db.on("open", () => {
    console.log("Database connection is successful")
})

db.on("error", () => {
    console.log("Connection is not successful");
})

// Routes of all 
videoRoutes(app)
userRoutes(app)
channelRoutes(app)


// MiddleWare to Authenticate USers
export function authenticateUser(req, res, next) {
    const authHeader = req.headers["authorization"]; // Extract Authorization Header
    if (!authHeader || !authHeader.startsWith("JWT ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; 

    jwt.verify(token, "secretKey", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        req.user = user; // Attach user to request
        next();
    });
}

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.log(err.message);
    
    res.status(500).json({ message: err.message || "Internal Server Error" });
    next();
});