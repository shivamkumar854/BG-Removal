import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user, isSignedIn } = useUser();
  const { credit, loadCreditsData } = useContext(AppContext);

  useEffect(() => {
    if (isSignedIn && user?.id) {
      loadCreditsData(user.id); // ✅ pass Clerk ID to loadCreditsData
    }
  }, [isSignedIn, user?.id]);

  return (
    <div className="flex items-center justify-between mx-4 py-3 lg:mx-44">
      {/* Logo */}
      <Link to="/">
        <img className="w-32 sm:w-44" src={assets.logo} alt="Logo" />
      </Link>

      {/* Right section */}
      {isSignedIn ? (
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Credit Badge */}
          <div className="bg-[#e0f2ff] px-4 py-1.5 rounded-full flex items-center shadow-sm border border-blue-200">
            <img src={assets.credit_icon} alt="Credits" className="w-4 h-4 mr-2" />
            <span className="text-xs sm:text-sm text-[#444] font-semibold">
              Credits: {credit ?? "0"}
            </span>
          </div>

          {/* User Greeting */}
          <p className="text-gray-600 max-sm:hidden">Hi, {user.fullName}</p>

          {/* Clerk User Button */}
          <UserButton />
        </div>
      ) : (
        <button
          onClick={() => openSignIn({})}
          className="bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 text-sm rounded-full mr-[1cm]"
        >
          Get Started
          <img className="w-3 sm:w-4" src={assets.arrow_icon} alt="Arrow" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
