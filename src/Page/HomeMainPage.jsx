import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../utils/useFetch";

function HomeMainPage(prop) {
    const { searchVideo } = useOutletContext(); 
    const [filteredVideos, setFilteredVideos] = useState([]);

    const { data, error, loading } = useFetch("http://localhost:6500/api/videos");

    useEffect(() => {
        if (data) {
            let filtered = data;

            if (searchVideo) {
                const lowerSearch = searchVideo.toLowerCase();
                filtered = data.filter(video =>
                    video.title.toLowerCase().includes(lowerSearch) ||
                    video.channelName.toLowerCase().includes(lowerSearch) ||
                    video.category.flat().join(" ").toLowerCase().includes(lowerSearch)
                );
            }

            // Filter by selected category
            if (prop.selectedCategory && prop.selectedCategory !== "All") {
                filtered = filtered.filter(video =>
                    video.category.flat().some(cat => cat.toLowerCase().includes(prop.selectedCategory.toLowerCase()))
                );
            }

            setFilteredVideos(filtered);
        }
    }, [data, searchVideo, prop.selectedCategory]);

    if (error) return <p>Error in Loading:</p>;
    if (loading) return <p>Loading..</p>;

    return (
        <div className={`grid box-border gap-4 pt-[80px] pb-5 mt-[50px] bg-white 
        ${prop.isOpen ? "grid-cols-[388px_388px_388px]" : "grid-cols-[456px_456px_456px]"}`}>

            {filteredVideos.length > 0 ? (
                filteredVideos.map(video => (
                    <Link to={`watch/${video._id}`} key={video._id} className="flex flex-col cursor-pointer">
                        <div className="w-full relative box-border">
                            <img src={video.thumbnail} alt={video.title} className={`w-full rounded-[10px] object-cover ${prop.isOpen ? "h-[225px]" : "h-[257px]"}`} />
                            <div className="absolute right-3 bottom-2 w-auto py-0.5 px-0.5 bg-[rgba(0,0,0,0.6)] text-white text-[13px]">
                                {video.videoLength}
                            </div>
                        </div>

                        <div className="flex pt-2.5">
                            <div className="w-15 h-15 flex items-center justify-center">
                                <img src={video.videoOwnerLogo} className="w-[80%] h-[70%] rounded-full object-cover" />
                            </div>

                            <div className="w-full p-1.5 box-border flex flex-col">
                                <p className="font-semibold text-[16px]">{video.title}</p>
                                <p className="mt-[5px] text-[16px] text-[#606060]">{video.channelName}</p>
                                <p className="text-[14px] text-[#606060]">{video.views}</p>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <p className="text-center text-gray-500 col-span-3 text-lg mt-8">
                    ❌ No videos available related to this search.
                </p>
            )}
        </div>
    )
}

export default HomeMainPage;
