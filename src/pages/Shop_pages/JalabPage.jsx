import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaCartShopping, FaRegHeart } from "react-icons/fa6";
import { addToCart } from "../../store/cart/cartsReucer";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ReactPaginate from "react-paginate";
import Advert from "../../components/Advert";
import { addWishlist } from "../../store/wishlists/Wishlists";

export default function JalabPage() {
  const [abayas, setAbayas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://hardayfunkeh-apis.vercel.app/api/products/all-products");
        const data = await response.json();
        const filteredAbayas = data.filter((product) => product.category === "Jalab");
        setAbayas(filteredAbayas);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Pagination Logic
  const offset = currentPage * itemsPerPage;
  const paginatedItems = abayas.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(abayas.length / itemsPerPage);

  // Handle Page Click
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

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

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="container mx-auto p-6">
        <div className="bg-black mb-10 rounded-2xl relative">
          <div className="relative text-white flex flex-col items-center justify-center min-h-[300px] md:p-8 px-2 rounded-lg shadow-2xl overflow-hidden glass-card">
            <h2 className="md:text-4xl text-3xl font-bold mb-4">Elegant Jalabs Collection</h2>
            <p className="text-lg text-center max-w-2xl">
              Discover our exquisite collection of elegant jalabs, designed with a blend of tradition and modern style. 
              Crafted from premium fabrics, these jalabs offer a luxurious feel and timeless appeal for any occasion.
            </p>
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
                <p className="text-center text-gray-500">No Jalabs available at the moment.</p>
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
        {pageCount > 1 && (
          <ReactPaginate
            previousLabel="Prev"
            nextLabel="Next"
            breakLabel="..."
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center mt-8 gap-2"
            pageClassName="px-4 py-2 rounded-md bg-gray-100 cursor-pointer hover:bg-pink-500 hover:text-white transition-all"
            previousClassName="px-4 py-2 rounded-md bg-gray-100 cursor-pointer hover:bg-pink-500 hover:text-white transition-all"
            nextClassName="px-4 py-2 rounded-md bg-gray-100 cursor-pointer hover:bg-pink-500 hover:text-white transition-all"
            activeClassName="bg-pink-600 text-white"
          />
        )}
      </div>
      <Advert/>
      <Footer />
    </div>
  );
}
