import Header from "./components/Header";
// import SideNavBar from "./components/SideNavbar"
import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {

  const [isOpen,setIsOpen] = useState(true)

  return (
    <div className="">
      <Header setIsOpen={setIsOpen} isOpen={isOpen}/>
      {/* Passing the value using context */}
      <Outlet context={{isOpen}}/>
    </div>
  )
}

export default App
