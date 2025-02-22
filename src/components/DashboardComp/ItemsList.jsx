import React, { Suspense, useContext, useEffect, useState } from "react"; 
import moment from "moment";
import { ItemsContext } from "../../pages/dashboard_pages/ItemsPage";
import { Link } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";

export default function ItemsList() {
  const itemsFromContext = useContext(ItemsContext);
  const [items, setItems] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sync items state when itemsFromContext changes
  useEffect(() => {
    setItems(itemsFromContext);
  }, [itemsFromContext]); // Runs whenever itemsFromContext updates

  const toggleMenu = (itemId) => {
    setMenuOpen(menuOpen === itemId ? null : itemId);
  };

  const handleDelete = async (itemId) => {
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://hardayfunkeh-apis.vercel.app/api/products/delete-products/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok || response === false) {
        throw new Error("Failed to delete item");
      }

      setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {items && items.length > 0 && (
        items.map((item) => (
          <tr key={item._id} className="border-b border-b-gray-300 font-medium text-gray-600">
            <td className="p-2 py-2 border border-gray-300 text-sm text-center text-gray-700 font-medium">{item.trackingId}</td>
            <td className="px-2 flex items-center justify-center space-x--2 py-2 text-sm text-center text-gray-700 font-medium">
              <div className="w-[55px] px-2 pb-2">
                <img src={item.image?.length > 0 ? item.image[0] : "/placeholder.png"} alt={item.name} className="w-[55px] h-[40px] rounded-full object-cover"/>
              </div>
              <div className="w-[100px] truncate">
                <span className="">{item.name}</span>
              </div>
            </td>
            <td className="p-2 py-2 border border-gray-300 text-sm text-center text-gray-700 font-medium">₦{item.price?.toLocaleString()}</td>
            <td className="p-2 py-2 border border-gray-300 text-sm text-center text-gray-700 font-medium">
              {moment(item.createdAt).format("MMMM Do, YYYY")}
            </td>
            <td className="p-2 py-2 border border-gray-300 text-sm text-center text-gray-700 font-medium">{item.stock ?? "N/A"}</td>
            <td className="relative p-2 py-2 border border-gray-300 text-sm text-center text-gray-700 font-medium cursor-pointer">
              <button onClick={() => toggleMenu(item._id)} className="text-gray-500 hover:text-gray-700"><HiDotsVertical /></button>
              {menuOpen === item._id && (
                <div className="absolute z-30 right-3 bottom-1 mt-2 w-52 p-2 space-y-2 bg-gray-700 shadow-md rounded-lg">
                  <button onClick={() => handleDelete(item._id)} disabled={loading} className="block px-4 py-2 bg-white text-red-500 rounded-md text-center hover:bg-gray-100 w-full cursor-pointer">
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                  <Link to={`update-item/${item._id}`} className="block px-4 py-2 bg-white rounded-md text-blue-500 hover:bg-gray-100">Update</Link>
                </div>
              )}
            </td>
          </tr>
        ))
      )}
    </>
  );
}
