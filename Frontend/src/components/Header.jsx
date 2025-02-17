import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../utils/authContext";

function Header(prop) {
  const { isLoggedIn, userName, logoutUser } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false); // Mobile Search State

  function handleSideNavBar() {
    prop.setIsOpen(!prop.isOpen);
  }

  function handleSearchClick() {
    prop.setSearchVideo(search);
    setShowSearchBar(false); // Hide search bar after searching
  }

  function openSearchBar() {
    setShowSearchBar(true);
    prop.setIsOpen(false); // Close side navbar on mobile
  }

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";

  return (
    <div className="py-1 px-2 w-full fixed flex justify-between z-10 items-center bg-white pb-[37px]">
      {/* Header Left */}
      <div className="gap-2 sm:gap-3 flex items-center">
        <div
          className="h-8 w-8 sm:h-10 sm:w-10 flex justify-center items-center cursor-pointer hover:bg-gray-200 rounded-full"
          onClick={handleSideNavBar}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/7710/7710488.png"
            alt="menu"
            className="h-4 w-4 sm:h-5 sm:w-5"
          />
        </div>

        <Link to="/" className="flex items-center cursor-pointer">
          <img
            src="https://cdn-icons-png.flaticon.com/128/1384/1384060.png"
            alt="YouTube Logo"
            className="h-6 sm:h-7"
          />
          <h2 className="text-sm sm:text-base md:text-lg font-semibold ml-1">
            YouTube
          </h2>
          <sup className="text-[10px] sm:text-xs">IN</sup>
        </Link>
      </div>

      {/* Header Center (Search Bar) */}
      <div className="hidden sm:flex w-[40%] sm:w-[50%] md:w-[55%]">
        <div className="flex items-center gap-2 w-full">
          <div className="flex border rounded-3xl border-gray-300 items-center w-full">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow h-8 sm:h-10 pl-4 text-xs sm:text-[17px] focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleSearchClick}
              className="w-[40px] sm:w-[50px] h-8 sm:h-10 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-r-3xl"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/2811/2811806.png"
                className="h-4 sm:h-5"
              />
            </button>
          </div>

          <div className="hidden sm:flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300">
            <img
              src="https://cdn-icons-png.flaticon.com/128/7175/7175253.png"
              alt="mic"
              className="h-3.5 sm:h-4 w-3.5 sm:w-4"
            />
          </div>
        </div>
      </div>

      {/* Header Right */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile Search Icon */}
        <div className="sm:hidden cursor-pointer" onClick={openSearchBar}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/2811/2811806.png"
            alt="search"
            className="h-5 w-5"
          />
        </div>

        {isLoggedIn ? (
          <div className="flex gap-3 sm:gap-4 items-center">
            <Link
              to="/create"
              className="cursor-pointer flex items-center gap-1 bg-gray-200 hover:bg-gray-300 rounded-[20px] py-1 px-2 sm:px-3"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/748/748113.png"
                alt="Create"
                className="h-4 sm:h-5"
              />
              <p className="hidden md:block">Create</p>
            </Link>

            <div className="cursor-pointer">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1827/1827347.png"
                alt="Notifications"
                className="h-4 sm:h-5"
              />
            </div>

            {/* Profile Dropdown */}
            <div className="relative cursor-pointer">
              <div
                className="h-8 sm:h-10 w-8 sm:w-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-sm sm:text-lg"
                onClick={() => setShowLogout(!showLogout)}
              >
                {firstLetter}
              </div>

              {showLogout && (
                <div className="absolute right-0 mt-2 w-36 sm:w-40 bg-white border shadow-md rounded-md">
                  <p className="flex justify-center px-4 py-2 text-sm sm:text-lg">
                    {userName}
                  </p>
                  <Link
                    to="/my-channel"
                    className="block px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowLogout(false)}
                  >
                    View Your Channel
                  </Link>
                  <button
                    onClick={() => {
                      logoutUser();
                      setShowLogout(false);
                    }}
                    className="w-full px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex border border-gray-300 justify-center w-18 sm:w-20 h-8 sm:h-9 items-center gap-1 rounded-3xl text-blue-600 hover:bg-blue-100"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/1144/1144760.png"
              alt="sign-in"
              className="h-3.5 sm:h-4"
            />
            <span className="text-xs sm:text-sm">Sign in</span>
          </Link>
        )}
      </div>

      {/* Mobile Search Bar Overlay */}
      {showSearchBar && (
        <div className="fixed top-0 left-0 w-[100%] h-full bg-white z-50 flex flex-col items-center justify-center p-4">
          <div className="w-[80%] flex border rounded-3xl border-gray-300 items-center">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow h-10 pl-3 text-sm focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleSearchClick}
              className="w-12 h-10 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-r-3xl"
            >
              🔍
            </button>
          </div>
          <button className="mt-4 text-red-600" onClick={() => setShowSearchBar(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
