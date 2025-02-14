import NavBar from "../components/Navbar";
import { useOutletContext } from "react-router-dom";
import HomeMainPage from "./HomeMainPage";
import SideNavBar from "../components/SideNavbar";
import { useState } from "react";

function Home() {
  const { isOpen } = useOutletContext();

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div>
      <SideNavBar isOpen={isOpen} />

      <div
        className={`flex flex-col overflow-x-hidden min-h-[100vh] flex-1 bg-white ${isOpen ? "ml-[182px] lg:ml-[245px] md:ml-[298px] sm:ml-[270px]" : "ml-[90px] lg:ml-[70px] md:ml-[50px] sm:ml-[20px]"
          }`}
      >
        {/* Passing selectedCategory and setSelectedCategory to Navbar */}
        <NavBar setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />

        {/* Passing selectedCategory to HomeMainPage */}
        <HomeMainPage isOpen={isOpen} selectedCategory={selectedCategory} />
      </div>

    </div>
  );
}

export default Home;
