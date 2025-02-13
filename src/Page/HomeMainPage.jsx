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

    if (error) return <p className="text-center text-red-500 text-lg">Error in Loading...</p>;
    if (loading) return <p className="text-center text-gray-500 text-lg">Loading...</p>;

    return (
        <div className={`grid box-border gap-4 pt-[80px] pb-5 mt-[50px] bg-white px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 
            grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:${prop.isOpen ? "grid-cols-[388px_388px_388px]" : "grid-cols-[456px_456px_456px]"}`}>

            {filteredVideos.length > 0 ? (
                filteredVideos.map(video => (
                    <Link to={`watch/${video._id}`} key={video._id} className="flex flex-col cursor-pointer">
                        <div className="w-full relative box-border">
                            <img 
                                src={video.thumbnail} 
                                alt={video.title} 
                                className={`w-full rounded-[10px] object-cover 
                                    h-[200px] sm:h-[220px] md:h-[240px] lg:${prop.isOpen ? "h-[225px]" : "h-[257px]"}`} 
                            />
                            <div className="absolute right-3 bottom-2 w-auto py-0.5 px-1 bg-[rgba(0,0,0,0.6)] text-white text-[10px] sm:text-[12px] md:text-[13px]">
                                {video.videoLength}
                            </div>
                        </div>

                        <div className="flex pt-2.5">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 flex items-center justify-center">
                                <img src={video.videoOwnerLogo} className="w-[80%] h-[70%] rounded-full object-cover" />
                            </div>

                            <div className="w-full p-1.5 box-border flex flex-col">
                                <p className="font-semibold text-[14px] sm:text-[15px] md:text-[16px]">{video.title}</p>
                                <p className="mt-[3px] sm:mt-[4px] md:mt-[5px] text-[12px] sm:text-[14px] md:text-[16px] text-[#606060]">{video.channelName}</p>
                                <p className="text-[12px] sm:text-[14px] md:text-[14px] text-[#606060]">{video.views}</p>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <p className="text-center text-gray-500 col-span-3 text-[14px] sm:text-[16px] md:text-[18px] mt-8">
                    ❌ No videos available related to this search.
                </p>
            )}
        </div>
    )
}

export default HomeMainPage;
