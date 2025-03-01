import React, { useEffect, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

   const [cartLength, setCartLength] = useState(0);
  const [wishlistsLength, setWishlistsLength] = useState(0);

  const { items } = useSelector((state) => state.cart);
  const { wishlists } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (items.length >= 1) {
      setCartLength(items.length);
      return;
    }else{
      setCartLength(0);
    }
  });

  useEffect(() => {
    if (wishlists.length >= 1) {
      setWishlistsLength(wishlists.length);
      return;
    }else{
      setWishlistsLength(0);
    }
  });

  return (
    <div className="">
      {/* Button to toggle the sidebar */}
      <button onClick={toggleSidebar} className="text-3xl text-white rounded-full cursor-pointer">
        {isOpen ? <IoClose /> : <HiMenuAlt3/>}
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 w-64 z-30 h-full overflow-scroll bg-white text-gray-800 p-6 transition-transform transform ${ isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Link to="/" className="lg:text-3xl md:text-2xl text-xl font-bold text-black">Hardayfunkeh</Link>
        <div className="flex flex-col space-y-2 mt-10">
          <Link to="/" className="nav-link text-black hover:bg-gray-100 py-2 px-2 rounded-lg hover:text-pink-600 duration-200 ">Home</Link>
          <Link to="/about" className="nav-link text-black hover:bg-gray-100 py-2 px-2 rounded-lg hover:text-pink-600 duration-200 ">About</Link>
          <Link to="/abaya" className="nav-link text-black hover:bg-gray-100 py-2 px-2 rounded-lg hover:text-pink-600 duration-200">Abaya</Link>
          <Link to="/jalab" className="nav-link text-black hover:bg-gray-100 py-2 px-2 rounded-lg hover:text-pink-600 duration-200">Jalab</Link>
          <Link to="/jewellery" className="nav-link text-black hover:bg-gray-100 py-2 px-2 rounded-lg hover:text-pink-600 duration-200">Jewellery</Link>
          <Link to="/fabrics" className="nav-link text-black hover:bg-gray-100 py-2 px-2 rounded-lg hover:text-pink-600 duration-200">Fabrics</Link>
          <Link to="/shop" className="nav-link text-black hover:bg-gray-100 py-2 px-2 rounded-lg hover:text-pink-600 duration-200">All Categories</Link>
          <Link to="/contact" className="nav-link text-black hover:bg-gray-100 py-2 px-2 rounded-lg hover:text-pink-600 duration-200">Contact</Link>
          {
            currentUser ? (
                <Link to={`/profile/${currentUser._id}`} className='text-black hover:bg-gray-100 py-2 px-2 rounded-lg hover:text-pink-600 duration-200 ' >
                    My Account
                </Link>
                ) : (
                <Link to="/login" className="nav-link hover:text-[#C70039] duration-200">Login</Link>
            )
          }
          <div className="flex mt-3 gap-4">
            <Link to="/wishlist" className="text-black flex flex-col items-start">
              <div className="relative">
                <FaRegHeart className="text-xl"/>
                <span className="absolute -top-4 -right-4 bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full">{wishlistsLength}</span>
              </div>
              <p className="font-normal lg:text-sm text-[12px]">Your Wishlist</p>
            </Link>
            <Link to="/cart" className="text-black flex flex-col items-start">
              <div className="relative">
                <BsCart4 className="text-xl"/>
                <span className="absolute -top-4 -right-4 bg-pink-600 text-white text-xs h-5 w-5 flex justify-center items-center rounded-full">{cartLength}</span>
              </div>
              <p className="font-normal lg:text-sm text-[12px]">Your Cart</p>
            </Link>
          </div>
        {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
