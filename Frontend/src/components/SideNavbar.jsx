import { Link } from "react-router-dom";

function SideNavBar(prop) {
    const commonStyles = "flex w-[94%] gap-[15px] items-center cursor-pointer px-[8px] py-[6px] rounded-[12px] hover:bg-[#e1e0e0] text-[14px] sm:text-[16px] sm:gap-[20px] sm:px-[9px] sm:py-[7px] Roboto";
    const sideBarSection = `${prop.isOpen ? "flex flex-col gap-1 border-b-[1px] border-gray-300 pb-[10px] pt-[10px]" : "hidden"}`;
    const span = `${prop.isOpen ? "" : "hidden"} sm:text-[16px] text-[12px]`;

    return (
        <div className={`h-[92vh] flex flex-col overflow-hidden bg-white hover:overflow-y-auto scroll-width hover:scroll-auto fixed top-[60px] left-0 transition-all duration-300 z-20 
            ${prop.isOpen ? "w-[180px] pl-4 sm:w-[275px]" : "w-0 sm:w-[60px] sm:ml-5"}`}>

            {/* Sidebar - Top */}
            <div className={sideBarSection}>
                {prop.isOpen && (
                    <>
                        <Link to="/" className={commonStyles}>
                            <img src="https://cdn-icons-png.flaticon.com/128/1946/1946488.png" alt="home" className="h-4 sm:h-5" />
                            <span>Home</span>
                        </Link>
                        <div className={commonStyles}>
                            <img src="https://img.icons8.com/?size=24&id=ajczeHCWXbyR&format=png" alt="Shorts" className="h-4 sm:h-5" />
                            <span>Shorts</span>
                        </div>

                        <div className={commonStyles}>
                            <img src="https://cdn-icons-png.flaticon.com/128/2989/2989849.png" alt="Subscription" className="h-4 sm:h-5" />
                            <span>Subscription</span>
                        </div>
                    </>
                )}
            </div>

            {/* Sidebar - Middle */}
            <div className={sideBarSection}>
                {prop.isOpen && <span className="px-[9px] py-[7px] text-[12px] sm:text-[16px]">{`You >`}</span>}

                {prop.isOpen && (
                    <>
                        <div className={commonStyles}>
                            <img src="https://cdn-icons-png.flaticon.com/128/3503/3503786.png" alt="History" className="h-4 sm:h-5" />
                            <span>History</span>
                        </div>

                        <div className={commonStyles}>
                            <img src="https://cdn-icons-png.flaticon.com/128/9297/9297069.png" alt="PlayList" className="h-4 sm:h-5" />
                            <span>PlayList</span>
                        </div>

                        <div className={commonStyles}>
                            <img src="https://cdn-icons-png.flaticon.com/128/2991/2991195.png" alt="Your Videos" className="h-4 sm:h-5" />
                            <span>Your Videos</span>
                        </div>
                        <div className={commonStyles}>
                            <img src="https://cdn-icons-png.flaticon.com/128/9720/9720860.png" alt="Your Courses" className="h-4 sm:h-5" />
                            <span className={span}>Your Courses</span>
                        </div>

                        <div className={commonStyles}>
                            <img src="https://cdn-icons-png.flaticon.com/128/833/833602.png" alt="Watch Later" className="h-4 sm:h-5" />
                            <span className={span}>Watch Later</span>
                        </div>

                        <div className={commonStyles}>
                            <img src="https://cdn-icons-png.flaticon.com/128/126/126473.png" alt="Liked Videos" className="h-4 sm:h-5" />
                            <span className={span}>Liked Videos</span>
                        </div>
                    </>
                )}
            </div>

            {/* Sidebar - Bottom */}
            <div className={sideBarSection}>
                {prop.isOpen && (
                    <>
                        <div className={commonStyles}>
                            <img src="https://cdn-icons-png.flaticon.com/128/2550/2550287.png" alt="Trending" className="h-4 sm:h-5" />
                            <span>Trending</span>
                        </div>

                        <div className={commonStyles}>
                            <img src="https://cdn-icons-png.flaticon.com/128/2662/2662503.png" alt="Shopping" className="h-4 sm:h-5" />
                            <span>Shopping</span>
                        </div>
                        <div className={commonStyles}>
                            <img src="https://cdn-icons-png.flaticon.com/128/461/461238.png" alt="Music" className="h-4 sm:h-5" />
                            <span className={span}>Music</span>
                        </div>

                        <div className={commonStyles}>
                            <img src="https://cdn-icons-png.flaticon.com/128/4241/4241295.png" alt="Movies" className="h-4 sm:h-5" />
                            <span className={span}>Movies</span>
                        </div>

                        <div className={commonStyles}>
                            <img src="https://cdn-icons-png.flaticon.com/128/2989/2989838.png" alt="Live" className="h-4 sm:h-5" />
                            <span className={span}>Live</span>
                        </div>

                        <div className={commonStyles}>
                            <img src="https://cdn-icons-png.flaticon.com/128/686/686589.png" alt="Gaming" className="h-4 sm:h-5" />
                            <span className={span}>Gaming</span>
                        </div>

                        <div className={commonStyles}>
                            <img src="https://cdn-icons-png.flaticon.com/128/81/81460.png" alt="News" className="h-4 sm:h-5" />
                            <span className={span}>News</span>
                        </div>

                        <div className={commonStyles}>
                            <img src="https://cdn-icons-png.flaticon.com/128/1152/1152912.png" alt="Sports" className="h-4 sm:h-5" />
                            <span className={span}>Sports</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default SideNavBar;
