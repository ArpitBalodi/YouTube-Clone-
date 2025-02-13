import { useEffect, useState } from "react";

function MyChannel() {
    const [channel, setChannel] = useState(null);

    useEffect(() => {
        async function fetchChannelDetails() {
            try {
                const response = await fetch("http://localhost:6500/api/channelData"); 
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

        fetchChannelDetails();
    }, []);

    const firstLetter = channel?.name ? channel.name.charAt(0).toUpperCase() : "?";

    return (
        <div className="flex flex-col fixed top-[100px] left-[300px] h-[92vh] w-[76%] bg-white shadow-lg rounded-lg p-4 gap-2">
            {channel ? (
                <>
                    <div className="w-full flex pb-5 gap-5">
                        {/* Profile Initial Instead of Image */}
                        <div className="w-[15%] flex items-center justify-center text-white text-6xl font-bold bg-blue-500 rounded-[50%] h-[150px]">
                            {firstLetter}
                        </div>

                        {/* Channel Details */}
                        <div className="flex flex-col gap-2 px-2.5 w-[45%]">
                            <h1 className="text-[36px] font-semibold">{channel.name}</h1>
                            <span>@{channel.handle} • 4 Videos</span>
                            <p>About Section of Channel</p>
                        </div>
                    </div>

                    <h2 className="mb-4 border-b-1">Videos ➡️</h2>
                    <div className="flex gap-5">
                        {/* Video Card */}
                        <div className="w-[260px] cursor-pointer flex flex-col gap-2">
                            <div className="w-full h-[140px]">
                                <img src="https://i.ytimg.com/vi/Az38f7cUzK8/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCHlXcuQiDGCaMz3PWKlGq6lb5QKA" className="w-full h-full rounded-2xl"/>
                            </div>
                            <div className="w-full text-base font-semibold">
                                <h4>Video Title</h4>
                                <span className="text-[#ababab] text-sm">Created at 2025-05-12</span>
                            </div>
                        </div>

                        <div className="w-[260px] cursor-pointer flex flex-col gap-2">
                            <div className="w-full h-[140px]">
                                <img src="https://i.ytimg.com/vi/Az38f7cUzK8/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCHlXcuQiDGCaMz3PWKlGq6lb5QKA" className="w-full h-full rounded-2xl"/>
                            </div>
                            <div className="w-full text-base font-semibold">
                                <h4>Video Title</h4>
                                <span className="text-[#ababab] text-sm">Created at 2025-05-12</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading channel details...</p>
            )}
        </div>
    );
}

export default MyChannel;
