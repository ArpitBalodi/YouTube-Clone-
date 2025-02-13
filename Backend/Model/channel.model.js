import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    handle: {
        type: String,
        required: true,
    },
    initial: {  
        type: String,
        required: true
    }
});

export const Channel = mongoose.model("Channel", channelSchema);
