import { useEffect, useState, useContext } from "react";
import AuthContext from "../utils/authContext";
import { useNavigate } from "react-router-dom"; 

function MyChannel() {
    const [channel, setChannel] = useState(null);
    const { isLoggedIn } = useContext(AuthContext); 
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchChannelDetails() {
            const token = localStorage.getItem("token"); // Get stored token

            if (!token) {
                navigate("/login"); // Redirect if no token
                return;
            }

            try {
                const response = await fetch("http://localhost:6500/api/channelData", {
                    method: "GET",
                    headers: {
                        Authorization: `JWT ${token}`, // Send token in headers
                    },
                });

                if (response.status === 401 || response.status === 403) {
                    navigate("/login"); // Redirect if unauthorized
                    return;
                }

                const data = await response.json();

                if (Array.isArray(data) && data.length > 0) {
                    setChannel(data[data.length - 1]); // Get the LAST created channel
                } else {
                    setChannel(null);
                }
            } catch (error) {
                console.error("Error fetching channel details:", error);
            }
        }

        if (isLoggedIn) {
            fetchChannelDetails();
        } else {
            navigate("/login"); // Redirect if not logged in
        }
    }, [isLoggedIn, navigate]);

    const firstLetter = channel?.name ? channel.name.charAt(0).toUpperCase() : "?";

    return (
        <div className="flex flex-col fixed top-[100px] left-[300px] h-[92vh] w-[76%] bg-white shadow-lg rounded-lg p-4 gap-2
                        max-[539px]:relative max-[539px]:top-[80px] max-[539px]:left-0 max-[539px]:w-full max-[539px]:h-auto max-[539px]:p-2">
            {channel ? (
                <>
                    <div className="w-full flex pb-5 gap-5 max-[539px]:flex-col max-[539px]:items-center">
                        <div className="w-[15%] flex items-center justify-center text-white text-6xl font-bold bg-blue-500 rounded-[50%] h-[150px] 
                                        max-[539px]:w-[80px] max-[539px]:h-[80px] max-[539px]:text-3xl">
                            {firstLetter}
                        </div>

                        <div className="flex flex-col gap-2 px-2.5 w-[45%] max-[539px]:w-full max-[539px]:text-center">
                            <h1 className="text-[36px] font-semibold max-[539px]:text-xl">{channel.name}</h1>
                            <span className="max-[539px]:text-sm">@{channel.handle} • 4 Videos</span>
                            <p className="max-[539px]:text-sm">About Section of Channel</p>
                        </div>
                    </div>

                    <h2 className="mb-4 border-b-1">Videos ➡️</h2>
                    <div className="flex gap-5 max-[539px]:flex-wrap max-[539px]:justify-center">
                        
                    </div>
                </>
            ) : (
                <p>Create your Channel</p>
            )}
        </div>
    );
}

export default MyChannel;
