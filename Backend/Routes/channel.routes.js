import { createChannel, fetchChannel } from "../Controller/channel.controller.js";


export function channelRoutes(app){
    app.get("/api/channelData",fetchChannel );
    app.post("/api/createChannel", createChannel);
}