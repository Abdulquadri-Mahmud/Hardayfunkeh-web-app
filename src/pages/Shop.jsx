import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaAngleRight, FaCartShopping } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";
import { addToCart } from "../store/cart/cartsReucer";
import Advert from "../components/Advert";

export default function Shop() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartItems = useSelector((state) => state.cart.items); 

  const categories = ["Abaya", "Jalab", "Jewellery", "Fabric"];
  const itemsPerPage = 8; // Products per page

  // State to track the current page for each category
  const [currentPage, setCurrentPage] = useState(
    categories.reduce((acc, category) => ({ ...acc, [category]: 1 }), {})
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://hardayfunkeh-apis.vercel.app/api/products/all-products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  const handlePageChange = (category, direction) => {
    setCurrentPage((prev) => ({
      ...prev,
      [category]: prev[category] + direction,
    }));
  };

  return (
    <div className="bg-pink-100">
      <Header />
      <div className="md:max-w-7xl max-w-full mx-auto md:px-6 px-3 py-10">
        <div className="bg-black mb-16 rounded-2xl relative">
          <div className="relative text-white flex items-center justify-center flex-col md:min-h-[300px] py-8 md:p-8 px-2 rounded-lg shadow-2xl overflow-hidden glass-card">
            <h2 className="md:text-4xl text-2xl font-bold mb-4 text-center">Discover Timeless Elegance</h2>
            <p className="text-center text-gray-300 md:text-lg text-sm max-w-xl">
              Explore our carefully curated selection of abayas, jalabs, jewelry, and fabrics—crafted for style, comfort, and sophistication.
            </p>
          </div>
        </div>


        {categories.map((category) => {
          const filteredProducts = products.filter((item) => item.category === category);
          const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
          const startIndex = (currentPage[category] - 1) * itemsPerPage;
          const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

          return (
            <section key={category} className="mb-16 bg-white p-2 rounded-lg">
              <div className="mb-4 py-3 px-3 text-white bg-pink-600 rounded-md flex justify-between items-center">
                <h2 className="text-xl font-semibold">{category} Collection</h2>
                <Link to="/" className="text-[12px] font-medium text-white uppercase flex items-center">
                  See All <FaAngleRight className="text-[20px]" />
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 md:gap-6 gap-3">
                {loading
                  ? [...Array(8)].map((_, index) => (
                      <div key={index} className="shadow-lg rounded-lg bg-gray-200 p-4 animate-pulse">
                        <div className="h-64 bg-gray-300 rounded-md mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    ))
                  : paginatedProducts.length === 0
                  ? (<p className="text-center text-gray-500">No products available at the moment.</p>)
                  : paginatedProducts.map((product) => (
                      <div key={product._id} className="relative shadow-lg rounded-lg bg-white overflow-hidden transform transition-transform duration-300 hover:scale-105">
                        <Link to={`/product-details/${product._id}`} className="block relative">
                          <img src={product.image?.length > 0 ? product.image[0] : "/placeholder.png"} alt={product.name} className="w-full h-[180px] object-cover" />
                        </Link>
                        <div className="p-2">
                          <h2 className="font-semibold text-sm truncate mb-2 text-gray-800">{product.name}</h2>
                          <p className="text-gray-600 text-[12px] mb-2 truncate">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <p className="flex items-center font-semibold text-pink-600 lg:text-lg text-sm">
                              <TbCurrencyNaira className="mr-1" />
                              {product.price?.toLocaleString() || "N/A"}
                            </p>
                            <p className="text-gray-500 text-sm px-2 rounded-full bg-pink-200">{product.category}</p>
                          </div>
                          <button onClick={() => handleAddToCart(product)} className="mt-4 w-full cursor-pointer bg-pink-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-pink-700 transition-all">
                            <FaCartShopping />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-6 gap-4">
                <button 
                  onClick={() => handlePageChange(category, -1)}
                  disabled={currentPage[category] === 1}
                  className={`px-4 py-2 rounded-md ${currentPage[category] === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-pink-600 text-white hover:bg-pink-700"}`}
                >
                  Previous
                </button>

                <span className="font-medium text-gray-700">Page {currentPage[category]} of {totalPages || 1}</span>

                <button 
                  onClick={() => handlePageChange(category, 1)}
                  disabled={currentPage[category] === totalPages}
                  className={`px-4 py-2 rounded-md ${currentPage[category] === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-pink-600 text-white hover:bg-pink-700"}`}
                >
                  Next
                </button>
              </div>
            </section>
          );
        })}
      </div>
      <Advert/>
      <Footer />
    </div>
  );
}
