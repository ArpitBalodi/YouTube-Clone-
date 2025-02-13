import { Channel } from "../Model/channel.model.js";

export async function createChannel(req, res) {
    try {
        const { name, handle } = req.body;

        if (!name || !handle) {
            return res.status(400).json({ message: "All information are required" });
        }

        // Extract first letter of name and convert to uppercase
        const initial = name.charAt(0).toUpperCase();

        // Create new channel with initial
        const newChannel = new Channel({ name, handle, initial });
        const savedChannel = await newChannel.save();

        res.status(201).json(savedChannel);
    } catch (error) {
        res.status(500).json({ message: "Error saving Channel Data", error: error.message });
    }
}

export async function fetchChannel(req, res) {
    try {
        const channels = await Channel.find();

        if (channels.length === 0) {
            return res.status(404).json({ message: "No channels found" });
        }

        res.status(200).json(channels);
    } catch (error) {
        res.status(500).json({
            message: "Error in fetching Channel Data",
            error: error.message
        });
    }
}
