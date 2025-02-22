import React from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  // Example: Simulating search results based on query
  const searchResults = query
    ? [`Result 1 for "${query}"`, `Result 2 for "${query}"`, `Result 3 for "${query}"`]
    : [];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-10">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      {query ? (
        <>
          <p className="text-lg mb-4">Showing results for "{query}"</p>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index} className="mb-2">
                {result}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No search query provided.</p>
      )}
    </div>
  );
};

export default SearchResults;
