import { useState } from "react";
import {createChannel} from "../utils/api"
import { useNavigate } from "react-router-dom";

function CreateChannel() {
  const [channelName, setChannelName] = useState("");
  const [handle, setHandle] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async () => {
    if (!channelName || !handle) {
      alert("Please enter channel name and handle.");
      return;
    }

    try {
      await createChannel({ name: channelName, handle });
      alert("Channel Created Successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating channel:", error);
      alert("Failed to create channel.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-[rgba(240,244,249,1)]">
      <div className="w-[55%] flex flex-col h-[70%] bg-white p-9 rounded-4xl border">
        <h2 className="text-xl font-semibold mb-4">How you&apos;ll appear</h2>

        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-300 text-3xl font-bold text-white">
            {channelName ? channelName.charAt(0).toUpperCase() : "?"}
          </div>
        </div>

        <div className="flex flex-col w-full items-center">
          <input
            type="text"
            placeholder="Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="w-[70%]  p-2 mb-4 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            className="w-[70%] p-2 mb-6 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button onClick={() => navigate("/")} className="px-4 py-2 border border-gray-400 rounded-md">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Create Channel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateChannel;
