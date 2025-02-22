import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      {/* Button to toggle the sidebar */}
      <button onClick={toggleSidebar} className="fixed top-6 right-5 text-2xl text-black rounded-full cursor-pointer">
        {isOpen ? <IoClose /> : <HiMenuAlt3/>}
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 w-64 z-30 h-full bg-white text-gray-800 p-6 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <h2 className="text-2xl font-bold mb-4">Sidebar</h2>
        <ul className="mt-20">
            <li className="mb-4">
                <a href="#" className="text-lg hover:text-red-400 font-semibold">Home</a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-lg hover:text-red-400 font-semibold">About</a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-lg hover:text-red-400 font-semibold">Shops</a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-lg hover:text-red-400 font-semibold">Services</a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-lg hover:text-red-400 font-semibold">Contact</a>
            </li>
            {
            currentUser ? (
              <Link to={`/profile/${currentUser._id}`} >
                {
                  currentUser.avatar ? ( <img src={currentUser.avatar}/> ) : (<RxAvatar className="text-2xl text-[#C70039]"/>)
                }
              </Link>
            ) : (
              <Link to="/login" className="nav-link hover:text-[#C70039] duration-200">Login</Link>
            )
          }
          </ul>
        </div>
    </div>
  );
};

export default Sidebar;
