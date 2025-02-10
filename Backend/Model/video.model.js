import mongoose from "mongoose";
const videoSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  title: {
    type: String,
  },
  fullTitle: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  category: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  channelName: {
    type: String,
  },
  videoOwnerLogo: {
    type: String,
  },
  views: {
    type: String,
  },
  posted: {
    type: String,
  },
  videoLength: {
    type: String,
  },
  likes: {
    type: String,
  },
  dislike: {
    type: String,
  },
  description: {
    type: String,
  },
  commentsCount: {
    type: String,
  },
  comments: {
    type: [Object],
  },
});

const videoModel = mongoose.model("Video", videoSchema);
export default videoModel;
