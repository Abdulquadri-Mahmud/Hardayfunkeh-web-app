import React, { createContext, Suspense, useEffect, useState } from "react";
import ItemsList from "../../components/DashboardComp/ItemsList";
import { LuRefreshCcw } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export const ItemsContext = createContext();

export default function ItemsPage() {
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false); // State for refresh button
  
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchItems = async () => {
    try {
      setRefreshing(true); // Show loading state for refresh button
      const res = await fetch("https://hardayfunkeh-apis.vercel.app/api/products/all-products");
      const data = await res.json();
      if (!res.ok || data.success === false) throw new Error(data.message || "Failed to fetch items");

      setItems(data);
      setFilteredItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setRefreshing(false); // Hide loading state after fetching
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Search & Filter Logic
  useEffect(() => {
    let updatedItems = [...items];

    if (searchQuery) {
      updatedItems = updatedItems.filter((item) =>
        [item.name, item.description, item.category, item.price]
          .some((field) => field.toString().toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (categoryFilter) {
      updatedItems = updatedItems.filter((item) => item.category.toLowerCase() === categoryFilter.toLowerCase());
    }

    setFilteredItems(updatedItems);
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, items]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  let navigate = useNavigate();

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="flex h-[100vh] pt-6 bg-zinc-200">
      <div className="flex-1 h-[100vh] overflow-y-scroll">
        <div className="px-4 py-2">
          <h1 className="text-xl font-medium">Items</h1>

          {/* Search & Filter Inputs */}
          <div className="flex justify-between space-x-4 my-4 bg-white p-4 rounded-lg">
            <input type="text" placeholder="Search items..." className="border-2 bg-pink-100 border-gray-300 px-4 py-2 rounded-lg w-1/2" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <select className="border-2 bg-pink-100 border-gray-300 px-4 py-2 rounded-lg w-1/3" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">Filter by Category</option>
              {[...new Set(items.map((item) => item.category))].map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-between">
            <button onClick={handleBack} className="py-1 h-[40px] px-6 text-white rounded-md bg-pink-600">
              Back
            </button>
            {/* Refresh Button */}
            <button onClick={fetchItems} className="bg-pink-600 text-white px-4 py-2 rounded mb-4" disabled={refreshing}>
              {refreshing ? "Refreshing..." : (
                <div className="flex space-x-1.5 items-center">
                  <LuRefreshCcw />
                  <span>Refresh Items</span>
                </div>
              )}
            </button>
          </div>

          {/* Items Table */}
          <div className="min-w-80 p-2 bg-white rounded-lg lg:overflow-y-hidden tables">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-2 py-3 text-center bg-pink-600 text-gray-50 font-medium rounded-l-md">Item ID</th>
                  <th className="px-2 py-3 text-center bg-pink-600 text-gray-50 font-medium">Product</th>
                  <th className="px-2 py-3 text-center bg-pink-600 text-gray-50 font-medium">Price</th>
                  <th className="px-2 py-3 text-center bg-pink-600 text-gray-50 font-medium">Date</th>
                  <th className="px-2 py-3 text-center bg-pink-600 text-gray-50 font-medium">Stock</th>
                  <th className="px-2 py-3 text-center bg-pink-600 text-gray-50 font-medium rounded-r-md">Actions</th>
                </tr>
              </thead>
              <tbody>
                <Suspense fallback={'Loading...'}>
                  <ItemsContext.Provider value={currentItems}>
                    <ItemsList />
                  </ItemsContext.Provider>
                </Suspense>
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-4">
              <button
                className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-pink-500 text-white"}`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span className="px-4 py-2 bg-gray-200 rounded">
                Page {currentPage} of {totalPages}
              </span>

              <button
                className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-pink-500 text-white"}`}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
