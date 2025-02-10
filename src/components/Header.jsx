import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Header({ setIsOpen, isOpen }) {
    
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token")); // Check if token exists
  }, []);

  function handleSideNavBar() {
    setIsOpen(!isOpen);
  }

  return (
    <div className=" py-1 pb-8 px-2.5 w-full fixed flex justify-between z-10 items-baseline bg-white">
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

        <div className="flex justify-center items-center cursor-pointer">
          <img
            src="https://cdn-icons-png.flaticon.com/128/1384/1384060.png"
            alt="YouTube Logo"
            className="h-8"
          />
          <h2 className="text-xl font-semibold Roboto ml-2">YouTube</h2>
          <sup className="text-xs">IN</sup>
        </div>
      </div>

      {/* Header Center */}
      <div className="w-[55%] ml-30">
        <div className="flex items-center gap-3 w-[80%]">
          <div className="flex border rounded-3xl border-gray-300 items-center w-[89%] justify-around">
            <input
              type="text"
              placeholder="Search"
              className="flex items-center rounded-l-3xl w-[90%] h-10 pl-5 border border-gray-300 ml-[-1px] text-[16px] focus:border-blue-500 focus:outline-none"
            />
            <button className="w-[58px] h-10 flex justify-center items-center cursor-pointer bg-[#f0f0f0] hover:bg-[#e1e0e0] rounded-r-2xl">
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
      <div className="flex w-[10%] h-10 gap-2 items-center">
        {isLoggedIn ? (
          <>
            {/* Create Button */}
            <div className="cursor-pointer">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1828/1828919.png"
                alt="Create"
                className="h-6"
              />
            </div>

            {/* Notifications Icon */}
            <div className="cursor-pointer">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1827/1827290.png"
                alt="Notifications"
                className="h-6"
              />
            </div>

            {/* Profile Icon */}
            <div className="cursor-pointer">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                alt="User"
                className="h-6 rounded-full"
              />
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
