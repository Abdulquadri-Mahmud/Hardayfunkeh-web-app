import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaCartShopping } from "react-icons/fa6";
import { addToCart } from "../../store/cart/cartsReucer";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Advert from "../../components/Advert";

export default function AbayaPage() {
  const [abayas, setAbayas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Display 8 products per page
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://hardayfunkeh-apis.vercel.app/api/products/all-products");
        const data = await response.json();

        const filteredAbayas = data.filter((product) => product.category === "Abaya");
        setAbayas(filteredAbayas);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    const cartItem = {
      productID: product._id,
      productImage: product.image?.length > 0 ? product.image[0] : "/placeholder.png",
      productName: product.name,
      productPrice: product.price,
      quantity: 1,
    };

    dispatch(addToCart(cartItem));
  };

  // Pagination Logic
  const totalPages = Math.ceil(abayas.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = abayas.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-pink-100">
      <Header/>
      <div className="container mx-auto p-6">
        <div className="bg-black mb-16 rounded-2xl relative">
          <div className="relative text-white flex items-center justify-center min-h-[300px] md:p-8 px-2 rounded-lg shadow-2xl overflow-hidden glass-card">
            <h2 className="md:text-4xl text-3xl font-bold mb-4">Elegant Abayas Collection</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl lg:p-6 p-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {loading
            ? [...Array(10)].map((_, index) => (
                <div key={index} className="shadow-lg rounded-lg bg-gray-200 p-4 animate-pulse">
                  <div className="h-64 bg-gray-300 rounded-md mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-300 rounded w-full mt-3"></div>
                </div>
              ))
            : currentItems.length === 0 ? (
                <p className="text-center text-gray-500">No Abayas available at the moment.</p>
              ) : (
                currentItems.map((abaya) => (
                  <div key={abaya._id} className="relative shadow-lg rounded-lg bg-white overflow-hidden transition-transform transform hover:scale-105">
                    <Link to={`/product-details/${abaya._id}`}>
                      <img src={abaya.image?.length > 0 ? abaya.image[0] : "/placeholder.png"} alt={abaya.name} className="w-full h-64 object-cover" />
                    </Link>
                    <div className="p-2">
                      <h2 className="font-semibold text-lg truncate mb-2 text-gray-800">{abaya.name}</h2>
                      <p className="text-gray-600 text-sm truncate">{abaya.description}</p>
                      {abaya.oldprice && (
                        <div className="absolute left-3 top-3 text-pink-600 bg-yellow-100 py-1 px-2 text-[12px] rounded-full capitalize">
                          -{((abaya.oldprice - abaya.price) / abaya.oldprice * 100).toFixed(2)}%
                        </div>
                      )}
                      <div className="mt-2 flex items-center justify-between">
                        <p className="flex items-center font-semibold text-pink-600">
                          <TbCurrencyNaira className="mr-1" />
                          {abaya.price?.toLocaleString() || "N/A"}
                        </p>
                        <p className="text-gray-500 text-sm px-2 rounded-full bg-pink-200">{abaya.category}</p>
                      </div>
                      <button onClick={() => handleAddToCart(abaya)} className="mt-4 w-full cursor-pointer bg-pink-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-pink-700 transition-all">
                        <FaCartShopping />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              )}
        </div>

        {/* Pagination Controls */}
        {abayas.length > itemsPerPage && (
          <div className="flex justify-center mt-10">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`px-4 py-2 mx-2 rounded-lg text-white ${
                currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"
              }`}>
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 mx-1 rounded-lg ${
                  currentPage === i + 1 ? "bg-pink-700 text-white" : "bg-gray-200 text-gray-700"
                } hover:bg-pink-600 hover:text-white transition-all`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 mx-2 rounded-lg text-white ${
                currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <Advert/>
      <Footer/>
    </div>
  );
}
