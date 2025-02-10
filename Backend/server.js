import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import { routes } from "./Routes/video.routes.js";

const app = express();

app.use(cors())
app.use(express.json())

const port = 6500;

app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
})

mongoose.connect("mongodb://localhost:27017")

const db = mongoose.connection

db.on("open",() => {
    console.log("Database connection is successful")
})

db.on("error", () => {
    console.log("Connection is not successful");
})

routes(app)