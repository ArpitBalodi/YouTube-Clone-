import { useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./utils/authContext";
import SideNavBar from "./components/SideNavbar";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [searchVideo, setSearchVideo] = useState(""); // Track search input

  return (
    <AuthProvider>
      <div>
        <Header setIsOpen={setIsOpen} isOpen={isOpen} setSearchVideo={setSearchVideo} />
        <SideNavBar isOpen={isOpen} />
        <Outlet context={{ isOpen, searchVideo }} /> {/* Pass searchTerm */}
      </div>
    </AuthProvider>
  );
}

export default App;
