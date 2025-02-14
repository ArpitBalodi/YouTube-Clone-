import { createChannel, fetchChannel } from "../Controller/channel.controller.js";
import { authenticateUser } from "../server.js";


export function channelRoutes(app){
    app.get("/api/channelData",authenticateUser,fetchChannel );
    app.post("/api/createChannel",authenticateUser, createChannel);
}