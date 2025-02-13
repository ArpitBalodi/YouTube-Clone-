import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:6500/api",
});

// Signup API Call
export async function signup(userData) {
  return API.post("/signup", userData);
};

// Login API Call
export async function login(userData) {
  return API.post("/login", userData);
};

// 🆕 Create Channel API Call
export async function createChannel(channelData) {
  return API.post("/createChannel", channelData);
};

// 🆕 Fetch Channel Data API Call
export async function fetchChannel() {
  return API.get("/channelData");
};
