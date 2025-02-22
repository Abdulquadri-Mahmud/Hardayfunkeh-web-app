import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SearchProductInput() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useNavigate();

  // Load search history from localStorage
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(storedHistory);
  }, []);

  // Toggle search input visibility
  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;

    // Save search to history
    const updatedHistory = [query, ...searchHistory.filter((item) => item !== query)].slice(0, 5); // Keep last 5 searches
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    // Navigate to the search page
    navigate(`/search?query=${query}`);

    // Clear search input
    setQuery("");
  };

  // Handle query input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Filter search history for suggestions
    if (value.trim() !== "") {
      const suggestions = searchHistory.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };

  // Select a suggestion
  const selectSuggestion = (suggestion) => {
    setQuery(suggestion);
    setFilteredSuggestions([]);
  };

  // Clear search history
  const clearHistory = () => {
    localStorage.removeItem("searchHistory");
    setSearchHistory([]);
    setFilteredSuggestions([]);
  };

  return (
    <div className="fixed z-30 flex items-center mt-10">
      {/* Search Icon Button */}
      <div onClick={toggleSearch} className="w-[40px] z-30 h-[40px] bg-pink-600 flex cursor-pointer justify-center items-center rounded-r-full">
        <button className="text-gray-100 hover:text-yellow-400 cursor-pointer focus:outline-none">
          <FaSearch size={20} />
        </button>
      </div>

      {/* Search Input */}
      {isOpen && (
        <div className="absolute left-10 z-30 bg-white shadow-lg rounded-md flex flex-col w-64">
          <form onSubmit={handleSearch} className="flex">
            <input  type="text"  value={query}  onChange={handleInputChange}  placeholder="Search for products"  className="px-4 py-2 w-full border border-gray-300 rounded-l-md focus:outline-none"  autoFocus/>
            <button type="submit" className="bg-yellow-400 font-semibold text-white px-4 py-2 rounded-r-md hover:bg-yellow-500 transition cursor-pointer">
              Go
            </button>
          </form>

          {/* Clear History Button */}
          {searchHistory.length > 0 && (
            <div className="bg-pink-100 rounded-b-2xl absolute -bottom-[7.2rem] w-full">
            {filteredSuggestions.map((item, index) => (
                <div key={index} onClick={() => selectSuggestion(item)} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                  {item}
                </div>
              ))}
              <button onClick={clearHistory} className="text-red-500 text-sm px-4 py-2 hover:underline">
                Clear Search History
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
