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
          className={`flex flex-col overflow-x-hidden min-h-[100vh] flex-1 bg-white ${
            isOpen ? "ml-[285px]" : "ml-[90px]"
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
