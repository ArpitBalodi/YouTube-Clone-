import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../utils/authContext";

function CreateChannel() {
  const [channelName, setChannelName] = useState("");
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Use useEffect for Redirecting Instead of Returning Null
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]); // Runs when isLoggedIn changes

  // Handle form submission
  const handleSubmit = async () => {
    if (!channelName || !handle) {
      alert("Please enter channel name and handle.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:6500/api/createChannel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify({ name: channelName, handle }),
      });

      if (response.ok) {
        alert("Channel Created Successfully!");
        navigate("/");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to create channel.");
      }
    } catch (error) {
      console.error("Error creating channel:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-[rgba(240,244,249,1)]">
      <div className="w-[55%] flex flex-col h-[70%] bg-white p-9 rounded-4xl border">
        <h2 className="text-xl font-semibold mb-4">How you&apos;ll appear</h2>

        {/* Profile Icon (Circle) */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 text-3xl bg-gray-300 text-white font-bold rounded-full flex items-center justify-center">
            {channelName ? channelName.charAt(0).toUpperCase() : "?"}
          </div>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col w-full items-center">
          <input
            type="text"
            placeholder="Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="w-[70%] p-2 mb-4 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            className="w-[70%] p-2 mb-6 border border-gray-300 rounded-md"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button onClick={() => navigate("/")} className="px-4 py-2 border border-gray-400 rounded-md">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Channel"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateChannel;
