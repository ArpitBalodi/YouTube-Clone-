# YouTube Clone (MERN Stack)

## Overview
This is a **YouTube Clone** built using the **MERN (MongoDB, Express.js, React.js, Node.js) stack**. It includes core features such as user authentication, video uploads, channel management, and a video search functionality.

## Purpose of the Project
The purpose of this project is to provide a **video-sharing platform** where users can **upload, watch, and manage videos** similar to YouTube. It is designed to help developers understand **full-stack development** using the MERN stack and implement key features like:
- User authentication using **JWT**.
- CRUD operations on **videos and channels**.
- Secure backend API integration with **MongoDB**.
- Responsive UI with **React.js and Tailwind CSS**.


## Features
### Frontend:
- **Homepage:** Displays trending videos and categories.
- **Search Functionality:** Users can search videos by title, category, or channel.
- **Video Player:** Integrated video player for seamless playback.
- **User Authentication:** Sign up and login functionalities with JWT-based authentication.
- **Channel Management:** Users can create and manage their own channels.
- **Category Filtering:** Filter videos based on different categories.

### Backend:
- **User Management:** Secure user authentication with JWT.
- **Video Management:** Upload, update, delete, and fetch videos.
- **Channel Management:** Create and retrieve channels.
- **Database:** MongoDB with Mongoose for efficient data handling.


## Tech Stack
### Frontend:
- React.js (with Vite for fast development)
- Tailwind CSS for styling
- React Router for navigation
- Local Storage for token management

### Backend:
- Node.js with Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication



## Installation
### Prerequisites:
- Node.js and npm installed
- MongoDB installed and running

### Steps:
1. **Clone the repository:**
   ```sh
   git clone https://github.com/ArpitBalodi/YouTube-Clone-.git
   cd youtube-clone

2. **Setup the backend:**
    ```sh
    cd Backend
    npm install
    npm start

3. **Setup the frontend:**
    ```sh
    cd Frontend
    npm install
    npm run dev

### Project Structure

```
/youtube-clone

/backend
|   |-- Controller
|   |-- Model
|   |-- Route
|   |-- server.js

/frontend
|   |-- src
|   |   |-- components
|   |   |   |-- Header.jsx
|   |   |   |-- navbar.jsx
|   |   |   |-- sidenavbar.jsx
|   |   |-- pages
|   |   |   |-- CreateChannel.jsx
|   |   |   |-- Error.jsx
|   |   |   |-- HomeMainPage.jsx
|   |   |   |-- LoginPage.jsx
|   |   |   |-- MyChannel.jsx
|   |   |   |-- Videos.jsx
|   |   |-- utils
|   |   |   |-- api.js
|   |   |   |-- authContext.jsx
|   |   |   |-- useFetch.js
|   |   |-- App.js
|   |   |-- main.js
```

## Endpoints
### User Routes:
- ``POST /api/signup``: User registration (signup).
- ``POST /api/login``: User login (authentication).
### Video Routes:
- ``POST /api/video``: Create a new video (requires authentication).
- ``GET /api/videos``: Fetch all videos.
- ``PATCH /api/video/:videoId/comment``: Add a comment to a specific video.
### Channel Routes:
- ``GET /api/channelData``: Fetch user channel data (requires authentication).
- ``POST /api/createChannel``: Create a new channel (requires authentication).

## Usage
- Register/Login to access all features.
- Create a channel to upload videos.
- Search and filter videos by categories.
- Watch videos with the built-in player.


## Contributing
Contributions are welcome! Feel free to fork the repo and submit pull requests.