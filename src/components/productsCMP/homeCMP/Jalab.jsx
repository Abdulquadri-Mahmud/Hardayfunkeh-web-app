import React, { Suspense, useContext } from "react";
import { FaAngleRight, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/cart/cartsReucer";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaCartShopping } from "react-icons/fa6";
import { addWishlist } from "../../../store/wishlists/Wishlists";
import { JalabProductsContext } from "../../../pages/Home_page";

const JalabProducts = () => {
  const products = useContext(JalabProductsContext) || [];
  const dispatch = useDispatch();

    // const { _id, image, name, price, description } = products;

    const getCarts = {
      productID: products._id || '',
      productName: products.name || [],
      productImage: products.image?.length > 0 ? products.image[0] :  products.image || [],
      productPrice: products.price || '',
      stock: products.stock || [],
      quantity: 1,
    };
    
    const handleCart = () => {
      dispatch(addToCart(getCarts));
    };
    
    const handleWishlistItem = () => {
      dispatch(addWishlist(getCarts))
    };

  return (
    <div key={products._id} className="relative shadow-lg rounded-lg bg-white overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <Link to={`/product-details/${products._id}`} className="block relative">
        <img src={products.image?.length > 0 ? products.image[0] : "/placeholder.png"} alt={products.name} className="w-full h-[180px] object-cover"/>
      </Link>
      <button onClick={handleWishlistItem} className="cursor-pointer absolute top-2 right-2 p-1 px-2 text-sm text-white bg-yellow-400 rounded-lg capitalize">
        <FaRegHeart size={22} />
      </button>

      <div className="p-2">
        <h2 className="font-semibold text-lg truncate mb-2 text-gray-800">{products.name}</h2>
        <p className="text-gray-600 text-sm truncate">{products.description}</p>
        {products.oldprice && (
          <div className="absolute left-3 top-3 text-pink-600 bg-yellow-100 py-1 px-2 text-[12px] rounded-full capitalize">
            -{((products.oldprice - products.price) / products.oldprice * 100).toFixed(2)}%
          </div>
        )}
        <div className="mt-2 flex items-center justify-between">
          <p className="flex items-center font-semibold text-pink-600">
            <TbCurrencyNaira className="mr-1" />
            {products.price?.toLocaleString() || "N/A"}
          </p>
          <p className="text-gray-500 text-sm px-2 rounded-full bg-pink-200">{products.category}</p>
        </div>
        <button onClick={handleCart} className="mt-4 w-full cursor-pointer bg-pink-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-pink-700 transition-all">
          <FaCartShopping />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default JalabProducts;