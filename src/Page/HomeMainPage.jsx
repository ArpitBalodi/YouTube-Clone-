import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../utils/useFetch";

function HomeMainPage({ isOpen }) {
    const [filterVideos, setFilterVideos] = useState([])


  const {data,error,loading} = useFetch("http://localhost:6500/api/videos");

  {console.log(data);
  }

  useEffect(() => {
        if(data){
          setFilterVideos(data)
        }
  },[data])

  if(error){
    return <p>Error in Loading:</p>
    
    
  }

  if(loading){
    return <p>Loading..</p>
  }

    return (
        <div className={`grid box-border gap-4 pt-[80px] pb-5 mt-[50px] bg-white 
        ${isOpen ? "grid-cols-[388px_388px_388px]" : "grid-cols-[456px_456px_456px]"}`}>

            {
                filterVideos.map((video) => {
                    return (
                        <Link to={`watch/${video.id}`} key={video.id} className="flex flex-col cursor-pointer">
                            <div className="w-full relative box-border">
                                <img src={video.thumbnail} alt={video.thumbnail} className={`w-full rounded-[10px] object-cover ${isOpen?"h-[225px]":"h-[257px]"}`}/>
                                <div className="absolute right-3 bottom-2 w-auto py-0.5 px-0.5bg-[rgba(0,0,0,0.6)] text-white text-[13px]">
                                    {video.videoLength}
                                </div>
                            </div>

                            <div className="flex pt-2.5">
                                <div className="w-15 h-15 flex items-center justify-center">
                                    <img src={video.videoOwnerLogo} className="w-[80%] h-[70%] rounded-full object-cover" />
                                </div>

                                <div className="w-full p-1.5 box-border flex flex-col">
                                    <p className=" font-semibold text-[16px]">{video.title}</p>
                                    <p className="mt-[5px] text-[16px] text-[#606060]">{video.channelName}</p>
                                    <p className="text-[14px] text-[#606060]">{video.views}</p>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }








        </div>
    )
}

export default HomeMainPage;