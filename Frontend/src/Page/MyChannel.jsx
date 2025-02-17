import { useEffect, useState, useContext } from "react";
import AuthContext from "../utils/authContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function MyChannel() {
    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState([]);
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchChannelDetails() {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch("http://localhost:6500/api/channelData", {
                    method: "GET",
                    headers: {
                        Authorization: `JWT ${token}`,
                    },
                });

                if (response.status === 401 || response.status === 403) {
                    navigate("/login");
                    return;
                }

                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setChannel(data[data.length - 1]); 
                } else {
                    setChannel(null);
                }
            } catch (error) {
                console.error("Error fetching channel details:", error);
            }
        }

        async function fetchChannelVideos() {
            try {
                const response = await fetch("http://localhost:6500/api/videos");
                const data = await response.json();

                if (Array.isArray(data)) {
                    setVideos(data.slice(0, 5)); // Sirf 5 videos dikhani hain
                }
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        }

        if (isLoggedIn) {
            fetchChannelDetails();
            fetchChannelVideos();
        } else {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    // Delete video from UI only
    function handleDelete(videoId) {
        setVideos((prevVideos) => prevVideos.filter((video) => video._id !== videoId));
    }

    const firstLetter = channel?.name ? channel.name.charAt(0).toUpperCase() : "?";

    return (
        <div className="flex flex-col fixed top-[100px] left-[300px] min-h-[92vh] w-[76%] bg-white shadow-lg rounded-lg p-4 gap-2 
                        overflow-y-auto h-full flex-grow max-[539px]:relative max-[539px]:top-[80px] max-[539px]:left-0 max-[539px]:w-full max-[539px]:h-auto max-[539px]:p-2">
            {channel ? (
                <>
                    <div className="w-full flex pb-5 gap-5 max-[539px]:flex-col max-[539px]:items-center">
                        <div className="w-[15%] flex items-center justify-center text-white text-6xl font-bold bg-blue-500 rounded-[50%] h-[150px] 
                                        max-[539px]:w-[80px] max-[539px]:h-[80px] max-[539px]:text-3xl">
                            {firstLetter}
                        </div>

                        <div className="flex flex-col gap-2 px-2.5 w-[45%] max-[539px]:w-full max-[539px]:text-center">
                            <h1 className="text-[28px] font-semibold max-[539px]:text-xl">{channel.name}</h1>
                            <span className="max-[539px]:text-sm">@{channel.handle} • {videos.length} Videos</span>
                            <p className="max-[539px]:text-sm">About Section of Channel</p>
                        </div>
                    </div>

                    <h2 className="mb-4 border-b-1">Videos ➡️</h2>

                    {/* Videos Section */}
                    <div className="grid grid-cols-4 gap-4 max-h-[500px] pr-2
                                    max-[1024px]:grid-cols-3 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
                        {videos.length > 0 ? (
                            videos.map((video) => (
                                <div key={video._id} className="w-full">
                                    <Link to={`/watch/${video._id}`}>
                                        <div className="w-full h-[140px]">
                                            <img src={video.thumbnail} alt={video.title} className="w-full h-full rounded-[10px] object-cover" />
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <h3 className="w-full text-[14px] font-semibold">{video.title}</h3>
                                            <p className="text-[#ababab] text-[12px]">{video.posted}</p>
                                        </div>
                                    </Link>
                                    <button
                                        className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg text-[12px] hover:bg-red-700 transition"
                                        onClick={() => handleDelete(video._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-[14px]">No videos available.</p>
                        )}
                    </div>
                </>
            ) : (
                <p>First Create your Channel</p>
            )}
        </div>
    );
}

export default MyChannel;
