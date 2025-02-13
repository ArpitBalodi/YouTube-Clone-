import videoModel from "../Model/video.model.js";
import mongoose from "mongoose";

export function createVideo(req, res) {
    const {
        title, fullTitle, videoUrl, category, thumbnail, channelName, videoOwnerLogo, views, posted, videoLength, likes, dislike, description, commentsCount, comments } = req.body;

    if (!title || !fullTitle || !videoUrl || !category || !thumbnail || !channelName || !videoOwnerLogo || !views || !posted || !videoLength || !likes || !dislike || !description || !commentsCount || !comments) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newVideos = new videoModel({
        title,
        fullTitle,
        videoUrl,
        category,
        thumbnail,
        channelName,
        videoOwnerLogo,
        views,
        posted,
        videoLength,
        likes,
        dislike,
        description,
        commentsCount,
        comments,
    });
    newVideos.save()
        .then((data) => {
            if (!data) {
                return res.status(400).json({ message: "Something went wrong" });
            }
            // Send the saved product data in the response
            res.send(data);
        })
        .catch((error) => {
            res.status(500).json({ message: "Error saving Video", error: error.message });
        });
}


export async function fetchVideos(req, res) {
    try {
        const videos = await videoModel.find();
        if (!videos) {
            return res.status(404).json({ message: "No Videos are available" })
        }
        res.status(200).json(videos);
    }
    catch (error) {
        res.status(500).json({
            message: "Error in fetching Videos",
            error: error.message
        })
    }
}


export async function addComment(req, res) {
    const { videoId } = req.params;  
    const { personEmail, personComment } = req.body;  

    //  Check if videoId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        return res.status(400).json({ message: "Invalid video ID format" });
    }

    //  Check if comment & email are provided
    if (!personEmail || !personComment) {
        return res.status(400).json({ message: "Email and comment are required" });
    }

    try {
        const updatedVideo = await videoModel.findByIdAndUpdate(
            videoId,
            { 
                $push: { 
                    comments: { personEmail, personComment } 
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedVideo) {
            return res.status(404).json({ message: "Video not found" });
        }

        res.status(200).json({ message: "Comment added successfully", updatedVideo });
    } catch (error) {
        res.status(500).json({ message: "Error adding comment", error: error.message });
    }
}




