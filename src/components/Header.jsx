import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../utils/authContext";

function Header(prop) {
  const { isLoggedIn, userName, logoutUser } = useContext(AuthContext); // Getting user handle
  const [showLogout, setShowLogout] = useState(false);
  const [search, setSearch] = useState("");

  function handleSideNavBar() {
    prop.setIsOpen(!prop.isOpen);
  }

  function handleSearchClick() {
    prop.setSearchVideo(search);
  }

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";

  return (
    <div className="py-1 pb-8 px-2.5 w-full fixed flex justify-between z-10 items-baseline bg-white">
      {/* Header Left */}
      <div className="gap-5 flex justify-center align-middle w-fit items-center">
        <div
          className="h-10 w-10 flex justify-center align-middle cursor-pointer items-center hover:bg-[#e1e0e0] rounded-full"
          onClick={handleSideNavBar}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/7710/7710488.png"
            alt="menu"
            className="h-4.5 w-5"
          />
        </div>

        <Link to="/" className="flex justify-center items-center cursor-pointer">
          <img
            src="https://cdn-icons-png.flaticon.com/128/1384/1384060.png"
            alt="YouTube Logo"
            className="h-8"
          />
          <h2 className="text-xl font-semibold Roboto ml-2">YouTube</h2>
          <sup className="text-xs">IN</sup>
        </Link>
      </div>

      {/* Header Center */}
      <div className="w-[55%] ml-30">
        <div className="flex items-center gap-3 w-[80%]">
          <div className="flex border rounded-3xl border-gray-300 items-center w-[89%] justify-around">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex items-center rounded-l-3xl w-[90%] h-10 pl-5 border border-gray-300 ml-[-1px] text-[16px] focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleSearchClick}
              className="w-[58px] h-10 flex justify-center items-center cursor-pointer bg-[#f0f0f0] hover:bg-[#e1e0e0] rounded-r-2xl"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/2811/2811806.png"
                className="h-6"
              />
            </button>
          </div>

          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#f0f0f0] hover:bg-[#e1e0e0]">
            <img
              src="https://cdn-icons-png.flaticon.com/128/7175/7175253.png"
              alt="mic"
              className="h-4.5 w-4"
            />
          </div>
        </div>
      </div>

      {/* Header Right */}
      <div className="flex w-[15%] h-10 items-center ">
        {isLoggedIn ? (
          <div className="flex gap-6 h-full items-center ">
            {/* Create Button */}
            <Link to="/create" className="cursor-pointer flex items-center gap-1 bg-[#f0f0f0] hover:bg-[#e1e0e0] rounded-[20px] py-1.5 px-3 mt-1.5">
              <img
                src="https://cdn-icons-png.flaticon.com/128/748/748113.png"
                alt="Create"
                className="h-5"
              />
              <p>Create</p>
            </Link>

            {/* Notifications Icon */}
            <div className="cursor-pointer">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1827/1827347.png"
                alt="Notifications"
                className="h-6"
              />
            </div>

            {/* Profile Icon with Clickable Logout */}
            <div className="relative cursor-pointer">
              {/* Profile Icon (First Letter of Username) */}
              <div
                className="relative cursor-pointer h-10 w-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg"
                onClick={() => setShowLogout(!showLogout)}
              >
                {firstLetter}
              </div>

              {/* Logout & View Channel Dropdown */}
              {showLogout && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-md rounded-md">
                  <p className="flex justify-center px-4 py-2 text-lg rounded-md cursor-default">{userName}</p>
                  {/* View Your Channel Option */}
                  <Link
                    to={`/my-channel`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setShowLogout(false)}
                  >
                    View Your Channel
                  </Link>

                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      logoutUser();
                      setShowLogout(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex w-[90%] justify-end gap-4 items-center">
            {/* Three Dots Icon */}
            <div className="cursor-pointer">
              <img
                src="https://cdn-icons-png.flaticon.com/128/8276/8276515.png"
                alt="three-dots"
                className="h-6"
              />
            </div>

            {/* Sign In Button */}
            <Link
              to="/login"
              className="flex border border-[#c3bfbfe8] justify-center w-24 h-9 cursor-pointer items-center gap-1.5 rounded-3xl text-[#065fd4] hover:bg-[#c4eef1] hover:border-none"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/1144/1144760.png"
                alt="sign-in"
                className="h-5"
              />
              <span>Sign in</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
