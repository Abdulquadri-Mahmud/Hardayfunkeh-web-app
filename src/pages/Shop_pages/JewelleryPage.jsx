import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaCartShopping, FaRegHeart } from "react-icons/fa6";
import { addToCart } from "../../store/cart/cartsReucer";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Advert from "../../components/Advert";
import { addWishlist } from "../../store/wishlists/Wishlists";

export default function JewelleryPage() {
  const [jewellery, setJewellery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://hardayfunkeh-apis.vercel.app/api/products/all-products");
        const data = await response.json();
        
        const filteredJewellery = data.filter(product => product.category === "Jewellery");
        setJewellery(filteredJewellery);
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

  const handleWishlistItem = (product) => {
      const cartItem = {
        productID: product._id || '',
        productName: product.name || [],
        productImage: product.image?.length > 0 ? product.image[0] :  product.image || [],
        productPrice: product.price || '',
        stock: product.stock || [],
        quantity: 1,
      };
      dispatch(addWishlist(cartItem))
    };

  // Pagination Logic
  const totalPages = Math.ceil(jewellery.length / itemsPerPage);
  const paginatedItems = jewellery.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="container mx-auto p-6">
        <div className="bg-black mb-10 rounded-2xl relative">
          <div className="relative text-white flex items-center justify-center min-h-[300px] md:p-8 px-2 rounded-lg shadow-2xl overflow-hidden glass-card">
            <h2 className="md:text-4xl text-3xl font-bold mb-4">Elegant Jewellery Collection</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl lg:p-6 p-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {loading
            ? [...Array(8)].map((_, index) => (
                <div key={index} className="shadow-lg rounded-lg bg-gray-200 p-4 animate-pulse">
                  <div className="h-64 bg-gray-300 rounded-md mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-300 rounded w-full mt-3"></div>
                </div>
              ))
            : paginatedItems.length === 0 ? (
                <p className="text-center text-gray-500">No Jewellery available at the moment.</p>
              ) : (
                paginatedItems.map((item) => (
                  <div key={item._id} className="relative addTocartCont shadow-lg rounded-lg bg-white overflow-hidden transition-transform transform hover:scale-105">
                    <Link to={`/product-details/${item._id}`}>
                      <img src={item.image?.length > 0 ? item.image[0] : "/placeholder.png"} alt={item.name} className="w-full h-64 object-cover" />
                    </Link>
                    <button onClick={() => handleWishlistItem(item)} className="cursor-pointer absolute top-2 right-2 p-1 px-2 text-sm text-white bg-yellow-400 rounded-lg capitalize">
                      <FaRegHeart size={22} />
                    </button>
                    <div className="p-2">
                      <h2 className="font-semibold text-lg truncate mb-2 text-gray-800">{item.name}</h2>
                      <p className="text-gray-600 text-sm truncate">{item.description}</p>
                      {item.oldprice && (
                        <div className="absolute left-3 top-3 text-pink-600 bg-yellow-100 py-1 px-2 text-[12px] rounded-full capitalize">
                          {((item.oldprice - item.price) / item.oldprice * 100).toFixed(2)}% OFF
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <p className="flex items-center font-semibold text-pink-600 lg:text-lg text-sm">
                          <TbCurrencyNaira className="mr-1" />
                          {item.price?.toLocaleString() || "N/A"}
                        </p>
                        <p className="text-gray-500 text-sm px-2 rounded-full bg-pink-200">{item.category}</p>
                      </div>
                      <button onClick={() => handleAddToCart(item)} className="addTocart mt-4 w-full cursor-pointer bg-pink-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-pink-700 transition-all">
                        <FaCartShopping />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 mx-1 rounded-lg text-white ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700 transition-all"}`}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 rounded-lg ${
                  currentPage === index + 1 ? "bg-pink-700 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 mx-1 rounded-lg text-white ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700 transition-all"}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <Advert/>
      <Footer />
    </div>
  );
}
