import React, { createContext, useEffect, useState } from "react";
import Order_lists from "../../components/DashboardComp/OrderLists";
import { useNavigate } from "react-router-dom";
import { LuRefreshCcw } from "react-icons/lu";

export const OrderContext = createContext();

export default function Order_page() {
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // State for refresh button
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterState, setFilterState] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const fetchOrders = async () => {
    try {
      setRefreshing(true); // Show loading state for refresh button
      const res = await fetch(`https://hardayfunkeh-apis.vercel.app/api/order/all_orders`);
      const data = await res.json();
      if (!res.ok || data.success === false) throw new Error(data.message || "Failed to fetch items");
      setOrders(data);
      setFilteredOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setRefreshing(false); // Hide loading state after fetching
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Search and Filter Logic
  useEffect(() => {
    let updatedOrders = orders;

    if (searchQuery) {
      updatedOrders = updatedOrders.filter((order) =>
        [order.orderId, order.firstname, order.lastname, order.phone, order.state, order.city]
          .some((field) => field.toString().toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (filterState) {
      updatedOrders = updatedOrders.filter((order) => order.state.toLowerCase() === filterState.toLowerCase());
    }

    setFilteredOrders(updatedOrders);
    setCurrentPage(1);
  }, [searchQuery, filterState, orders]);

  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  let navigate = useNavigate();

  const handleBack = () => {
    navigate(-1)
  }
  return (
    <div className="flex h-[100vh] pt-10 bg-zinc-200">
      <div className="flex-1 h-[100vh] overflow-y-scroll">
        <div className="px-4 py-2">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium">Orders</h1>
            <button onClick={handleBack} className="py-2 px-6 text-white rounded-md bg-pink-600">
              Back
            </button>
          </div>
            
          {/* Search & Filter Inputs */}
          <div className="flex justify-between space-x-4 my-4 bg-white p-4 rounded-lg">
            <input type="text" placeholder="Search orders..." className="border-2 border-gray-300 bg-pink-100 px-4 py-2 rounded-lg w-1/2" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <select className="border-2 border-gray-300 bg-pink-100 px-4 py-2 rounded-lg w-1/3" value={filterState} onChange={(e) => setFilterState(e.target.value)}>
              <option value="">Filter by State</option>
              {[...new Set(orders.map((order) => order.state))].map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            {/* Refresh Button */}
            <button onClick={fetchOrders} className="bg-pink-600 cursor-pointer text-white px-4 py-2 rounded" disabled={refreshing}>
              {refreshing ? (
                <div className="flex space-x-1.5 items-center"><LuRefreshCcw className="animate-spin"/> <span>Refreshing...</span></div>
              ) : (
                <div className="flex space-x-1.5 items-center">
                  <LuRefreshCcw />
                  <span>Refresh Items</span>
                </div>
              )}
            </button>
          </div>

          <div className="min-w-full p-2 bg-white rounded-lg mt-7 overflow-x-scroll lg:overflow-x-hidden tables">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-2 lg:py-3 py-2 text-start bg-pink-600 text-gray-50 rounded-l-md font-medium">Order ID</th>
                  <th className="px-2 lg:py-3 py-2 text-start bg-pink-600 text-gray-50 font-medium">Customer</th>
                  <th className="px-2 lg:py-3 py-2 text-start bg-pink-600 text-gray-50 font-medium">Phone</th>
                  <th className="px-2 lg:py-3 py-2 text-start bg-pink-600 text-gray-50 font-medium">State</th>
                  <th className="px-2 lg:py-3 py-2 text-start bg-pink-600 text-gray-50 font-medium">City</th>
                  <th className="px-2 lg:py-3 py-2 text-start bg-pink-600 text-gray-50 font-medium">Address</th>
                  <th className="px-2 lg:py-3 py-2 text-start bg-pink-600 text-gray-50 font-medium">Date</th>
                  <th className="px-2 lg:py-3 py-2 text-start bg-pink-600 text-gray-50 font-medium">Total Price</th>
                  <th className="px-2 lg:py-3 py-2 text-start bg-pink-600 text-gray-50 rounded-r-md font-medium">Items</th>
                </tr>
              </thead>
              <tbody>
                <OrderContext.Provider value={currentOrders}>
                  <Order_lists />
                </OrderContext.Provider>
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-4">
              <button className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-red-500 text-white"}`} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                Previous
              </button>

              <span className="px-4 py-2 bg-gray-200 rounded">
                Page {currentPage} of {totalPages}
              </span>

              <button className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-red-500 text-white"}`} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
