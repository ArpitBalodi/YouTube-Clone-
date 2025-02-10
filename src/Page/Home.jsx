import NavBar from "../components/Navbar";
import { useOutletContext } from "react-router-dom";
import HomeMainPage from "./HomeMainPage";
import SideNavBar from "../components/SideNavbar";

function Home(){

    const { isOpen } = useOutletContext();
    
    return(
        <div>  
            <SideNavBar isOpen={isOpen}/>

            {/* <div className="flex flex-col justify-center items-center fixed top-[120px] left-[600px] h-28 w-[500px] bg-white shadow-lg rounded-lg p-4 gap-2">
            <h2 className="font-bold text-xl">Try searching to get started</h2>
            <p className="text-sm">Start watching videos to help us build a feed of videos you&apos;ll love.</p>
            </div> */}

            <div className={`flex flex-col overflow-x-hidden min-h-[100vh] flex-1 bg-white
            ${
                isOpen ? "ml-[285px]": "ml-[90px]"
            }`} >

             <NavBar/>   
             <HomeMainPage isOpen={isOpen}/>
            </div>

            
        </div>
    )
}

export default Home;