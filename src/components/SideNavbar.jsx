function SideNavBar({isOpen}){

    const commonStyles = "flex w-[94%] gap-[20px] items-center cursor-pointer px-[9px] py-[7px] rounded-[15px] hover:bg-[#e1e0e0] text-[16px] Roboto";
    const sideBarSection = "flex flex-col gap-1 border-b-1 border-gray-300 pb-[10px] pt-[10px]"
    const span = `${isOpen?"":"hidden"}`

    return(
        <div className={`h-[92vh] flex flex-col overflow-hidden hover:overflow-y-auto scroll-width hover:scroll-auto fixed top-[60px] left-0 transition-all duration-300 z-20 ${
            isOpen ? "w-[275px] pl-4" : "w-[60px] ml-5"
        }`}>

                {/* Sidbar - top */}
            <div className={sideBarSection}>
                <div className={commonStyles}>
                    <img src="https://cdn-icons-png.flaticon.com/128/1946/1946488.png" alt="home" className="h-5"/>
                    <span className={span}>Home</span>
                </div>

                <div className={commonStyles}>
                    <img src="https://img.icons8.com/?size=24&id=ajczeHCWXbyR&format=png" alt="Shorts" className="h-5"/>
                    <span className={span}>Shorts</span>
                </div>

                <div className={commonStyles}>
                    <img src="https://cdn-icons-png.flaticon.com/128/2989/2989849.png" alt="Subscription" className="h-5"/>
                    <span className={span}>Subscription</span>
                </div>
            </div>


            {/* Sidebar Middle */}
            
            <div className={sideBarSection}>
            <span className={isOpen?"px-[9px] py-[7px] text-[16px]":"hidden"}>{`You >`}</span>
                <div className={commonStyles}>
                    <img src="https://cdn-icons-png.flaticon.com/128/3503/3503786.png" alt="History" className="h-5"/>
                    <span className={span}>History</span>
                </div>

                <div className={commonStyles}>
                    <img src="https://cdn-icons-png.flaticon.com/128/9297/9297069.png" alt="PlayList" className="h-5"/>
                    <span className={span}>PlayList</span>
                </div>

                <div className={commonStyles}>
                    <img src="https://cdn-icons-png.flaticon.com/128/2991/2991195.png" alt="Your Videos" className="h-5"/>
                    <span className={span}>Your Videos</span>
                </div>

                <div className={commonStyles}>
                    <img src="https://cdn-icons-png.flaticon.com/128/9720/9720860.png" alt="Your Courses" className="h-5"/>
                    <span className={span}>Your Courses</span>
                </div>

                <div className={commonStyles}>
                    <img src="https://cdn-icons-png.flaticon.com/128/833/833602.png" alt="Wahtch Later" className="h-5"/>
                    <span className={span}>Watch Later</span>
                </div>

                <div className={commonStyles}>
                    <img src="https://cdn-icons-png.flaticon.com/128/126/126473.png" alt="Liked Videos" className="h-5"/>
                    <span className={span}>Liked Videos</span>
                </div>
            </div>


            {/* SideBar End */}
            <div className={sideBarSection}>
                <div className={commonStyles}>
                    <img src="https://cdn-icons-png.flaticon.com/128/2550/2550287.png" alt="Trending" className="h-5"/>
                    <span className={span}>Trending</span>
                </div>

                <div className={commonStyles}>
                    <img src="https://cdn-icons-png.flaticon.com/128/2662/2662503.png" alt="Shopping" className="h-5"/>
                    <span className={span}>Shopping</span>
                </div>

                <div className={commonStyles}>
                    <img src="https://cdn-icons-png.flaticon.com/128/461/461238.png" alt="Music" className="h-5"/>
                    <span className={span}>Music</span>
                </div>

                <div className={commonStyles}>
                    <img src="https://cdn-icons-png.flaticon.com/128/4241/4241295.png" alt="movies" className="h-5"/>
                    <span className={span}>Movies</span>
                </div>

                <div className={commonStyles}>
                    <img src="https://cdn-icons-png.flaticon.com/128/2989/2989838.png" alt="live" className="h-5"/>
                    <span className={span}>Live</span>
                </div>

                <div className={commonStyles}>
                    <img src="https://cdn-icons-png.flaticon.com/128/686/686589.png" alt="gaming" className="h-5"/>
                    <span className={span}>Gaming</span>
                </div>

                <div className={commonStyles}>
                    <img src="https://cdn-icons-png.flaticon.com/128/81/81460.png" alt="news" className="h-5"/>
                    <span className={span}>News</span>
                </div>

                <div className={commonStyles}>
                    <img src="https://cdn-icons-png.flaticon.com/128/1152/1152912.png" alt="sports" className="h-5"/>
                    <span className={span}>Sports</span>
                </div>

            </div>

        </div>
    )
}

export default SideNavBar;