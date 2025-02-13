import { createVideo, fetchVideos } from "../Controller/video.controller.js";


export function videoRoutes(app){
    app.post("/api/video",createVideo)
    app.get("/api/videos",fetchVideos)
}