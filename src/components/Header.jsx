import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RxAvatar } from "react-icons/rx";
import TopHeader from "./TopHeader";
import { FaRegHeart } from "react-icons/fa6";
import Sidebar from "./Sidebar";

const SearchInputField = () => {
  const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
  
    // Load previous searches from localStorage on mount
    useEffect(() => {
      const savedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
      setSuggestions(savedSearches);
    }, []);
  
    const handleSearch = (e) => {
      e.preventDefault();
      if (query.trim() !== "") {
        // Save search query in localStorage
        const updatedSearches = [query, ...suggestions.filter((q) => q !== query)].slice(0, 5);
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
        setSuggestions(updatedSearches);
  
        // Navigate to the search page
        navigate(`/search?query=${query}`);
        setQuery("");
      }
    };
  
    const handleSuggestionClick = (suggestion) => {
      setQuery(suggestion);
      navigate(`/search?query=${suggestion}`);
    };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="lg:max-w-3xl max-w-[310px] bg-white shadow-lg rounded-md flex">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for products" className="px-4 py-2 w-md border bg-white border-gray-300 rounded-l-md focus:outline-none" autoFocus/>
        <button type="submit" className="bg-yellow-400 font-semibold text-white lg:px-6 px-3 py-2 rounded-r-md hover:bg-red-700 transition cursor-pointer">
          Search
        </button>
      </form>

      {/* Search Suggestions */}
      {query && suggestions.length > 0 && (
        <ul className="absolute bg-white w-full border border-gray-300 shadow-md mt-1 rounded-md z-10">
          {suggestions
            .filter((s) => s.toLowerCase().includes(query.toLowerCase()))
            .map((s, index) => (
              <li key={index} onClick={() => handleSuggestionClick(s)} className="cursor-pointer px-4 py-2 hover:bg-gray-200">
                {s}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

const BottomNavs = () => {

  return (
    <div className="bg-white shadow-lg py-4 px-3 border-b-1 border-gray-300">
      <div className="container mx-auto flex justify-center space-x-6">
        <Link to="/" className="nav-link text-black hover:text-[#C70039] duration-200 ">Home</Link>
        <Link to="/about" className="nav-link text-black hover:text-[#C70039] duration-200 ">About</Link>
        <Link to="/abaya" className="nav-link text-black hover:text-[#C70039] duration-200">Abaya</Link>
        <Link to="/jalab" className="nav-link text-black hover:text-[#C70039] duration-200">Jalab</Link>
        <Link to="/jewellery" className="nav-link text-black hover:text-[#C70039] duration-200">Jewellery</Link>
        <Link to="/fabrics" className="nav-link text-black hover:text-[#C70039] duration-200">Fabrics</Link>
        <Link to="/shop" className="nav-link text-black hover:text-[#C70039] duration-200">All Categories</Link>
        <Link to="/contact" className="nav-link text-black hover:text-[#C70039] duration-200">Contact</Link>
      </div>
    </div>
  );
}

export default function Header() {
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
    <div className="sticky top-0 z-50 ">
      <div className="">
        <TopHeader/>
      </div>
      <header className="bg-pink-700 shado border-b-5 border-b-gray-50">
        <div className="container mx-auto flex justify-between items-center flex-wrap gap-3 lg:py-5 md:py-5 py-5 px-4">
          {/* Logo */}
          <Link to="/" className="lg:text-3xl md:text-2xl text-xl font-bold text-white">Hardayfunkeh</Link>

          <div className="sm:block hidden">
            <SearchInputField/>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 font-semibold">
          
            <Link to="/wishlist" className="text-white flex flex-col items-center">
              <div className="relative">
                <FaRegHeart size={22} />
                <span className="absolute -top-4 -right-4 bg-yellow-400 text-xs px-2 py-0.5 rounded-full">{wishlistsLength}</span>
              </div>
              <p className="font-normal text-sm">Your Wishlist</p>
            </Link>

            <Link to="/cart" className="text-white flex flex-col items-center">
              <div className="relative">
                <BsCart4 size={22} />
                <span className="absolute -top-4 -right-4 bg-yellow-400 text-xs px-2 py-0.5 rounded-full">{cartLength}</span>
              </div>
              <p className="font-normal text-sm">Your Cart</p>
            </Link>

          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex gap-4 items-center">
            <Link to="/wishlist" className="text-white flex flex-col items-center">
              <div className="relative">
                <FaRegHeart className="text-xl"/>
                <span className="absolute -top-4 -right-4 bg-yellow-400 text-xs px-2 py-0.5 rounded-full">{wishlistsLength}</span>
              </div>
              <p className="font-normal lg:text-sm text-[12px]">Your Wishlist</p>
            </Link>
            <Link to="/cart" className="text-white flex flex-col items-center">
              <div className="relative">
                <BsCart4 className="text-xl"/>
                <span className="absolute -top-4 -right-4 bg-yellow-400 text-xs h-5 w-5 flex justify-center items-center rounded-full">{cartLength}</span>
              </div>
              <p className="font-normal lg:text-sm text-[12px]">Your Cart</p>
            </Link>
            <div className="lg:hidden block">
              <Sidebar/>
            </div>
          </div>
        </div>
      </header>
      <div className="hidden lg:block ">
        <BottomNavs/>
      </div>
    </div>
  );
}
