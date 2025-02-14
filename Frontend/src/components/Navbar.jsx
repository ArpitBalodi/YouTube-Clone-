function NavBar(prop) {

    const styleOption = "flex-none h-[30px] py-[1px] px-2.5 rounded-[5px] flex justify-center items-center cursor-pointer bg-[#f0f0f0] hover:bg-[#e1e0e0] px-[17px]"

    const options = ["All", "Music", "Comedy", "Gaming", "Education", "Web Development", "News", "Cricket", "Reaction Videos", "Vlog", "PodCast", "Entertainment", "VolleyBall"];

    const handleCategoryClick = (category) => {
        if (prop.selectedCategory === category) {
            prop.setSelectedCategory("All");  // If already selected, reset to "All"
        } else {
            prop.setSelectedCategory(category); // Otherwise, set the new category
        }
    };

    return (
        <div className="flex fixed top-[82px] z-1 w-[90%] gap-4 shrink-0 h-auto overflow-x-auto scroll-hide bg-white pb-2 ml-7">
            {
                options.map((item, index) => {
                    return (
                        <div 
                            key={index} 
                            className={`${styleOption} ${prop.selectedCategory === item ? "bg-black text-white" : ""}`} 
                            onClick={() => handleCategoryClick(item)} // Updated logic
                        >
                            {item}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default NavBar;
