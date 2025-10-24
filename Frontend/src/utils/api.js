import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});

// Signup API Call
export async function signup(userData) {
  return API.post("/signup", userData);
};

// Login API Call
export async function login(userData) {
  return API.post("/login", userData);
};

// Create Channel API Call
export async function createChannel(channelData) {
  return API.post("/createChannel", channelData);
};

// Fetch Channel Data API Call
export async function fetchChannel() {
  return API.get("/channelData");
};

// Add Comment API Call
export async function addComment(videoId, commentData) {
  return API.patch(`/video/${videoId}/comment`, commentData);
}

