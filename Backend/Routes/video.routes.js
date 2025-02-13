import { createVideo, fetchVideos, addComment } from "../Controller/video.controller.js";

export function videoRoutes(app) {
    app.post("/api/video", createVideo);  
    app.get("/api/videos", fetchVideos);  
    app.patch("/api/video/:videoId/comment", addComment);
}
