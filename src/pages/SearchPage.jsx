import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { FaCartShopping } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart/cartsReucer";
import Header from "../components/Header";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import SearchLoader from "../components/SearchLoader";

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [size, setSize] = useState("");
  const [deal, setDeal] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";
  const minPrice = parseInt(searchParams.get("minPrice")) || 0;
  const maxPrice = parseInt(searchParams.get("maxPrice")) || 50000;
  const selectedSize = searchParams.get("size") || "";
  const selectedDeal = searchParams.get("deal") || "";

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
    setSize(selectedSize);
    setDeal(selectedDeal);
  }, [minPrice, maxPrice, selectedSize, selectedDeal]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          query,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          size,
          deal,
        }).toString();

        const response = await fetch(
          `https://hardayfunkeh-apis.vercel.app/api/product/search?${queryParams}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(`Failed to load search results: ${err.message}`);
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query, priceRange, size, deal]); 

  const updateFilters = (key, value) => {
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="bg-pink-100">
      <Header />
      <div className="container mx-auto lg:p-6 p-3 flex flex-wrap gap-6">
        <div className="lg:w-[300px] w-full lg:h-[400px] bg-white p-4 shadow-md rounded-md">
          <h3 className="text-xl font-bold mb-4">Filters</h3>
          <input type="text" value={query} onChange={(e) => updateFilters("query", e.target.value)} placeholder="Search for products" className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"/>
          
          <div className="mb-4">
            <h4 className="font-semibold">Price Range</h4>
            <Slider
              range
              min={0}
              max={100000}
              step={500}
              value={priceRange}
              onChange={(values) => setPriceRange(values)}
              onAfterChange={() => {
                updateFilters("minPrice", priceRange[0]);
                updateFilters("maxPrice", priceRange[1]);
              }}
            />
            <div className="flex justify-between text-sm mt-2">
              <span>N{priceRange[0]}</span>
              <span>N{priceRange[1]}</span>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">Size</h4>
            <select className="w-full px-3 py-2 border rounded-md border-gray-300" value={size} onChange={(e) => updateFilters("size", e.target.value)}>
              <option value="">All Sizes</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
            </select>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">Deals</h4>
            <select className="w-full px-3 py-2 border rounded-md border-gray-300" value={deal} onChange={(e) => updateFilters("deal", e.target.value)}>
              <option value="">All Deals</option>
              <option value="good">Good</option>
              <option value="great">Great</option>
            </select>
          </div>
        </div>
        
        <div className="flex-1 bg-white shadow-xl rounded-2xl lg:p-4 p-2">
          <div className="flex flex-wrap items-center justify-between mb-4">
            <h2 className=";g:text-2xl text-lg font-bold">
              Search Results for: <span className="text-pink-600">{query}</span>
            </h2>
            <p className="text-gray-500 lg:text-sm text-[12px]">({products.length} products found)</p>
          </div>
          {loading && <SearchLoader/>}
          {error && <p className="text-red-500">{error}</p>}
          {products.length === 0 && !loading && (
            <p className="text-gray-500">No products found.</p>
          )}
          
          <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 md:gap-4 gap-3">
            {products.map((product) => (
              <div key={product._id} className="relative addTocartCont shadow-lg rounded-lg bg-white overflow-hidden transform transition-transform duration-300 hover:scale-105">
                <Link to={`/product-details/${product._id}`} className="block relative">
                  <img src={product.image?.length > 0 ? product.image[0] : "/placeholder.png"} alt={product.name} className="w-full h-[180px] object-cover"/>
                </Link>
                <div className="p-2">
                  <h2 className="font-semibold text-lg truncate mb-2 text-gray-800">{product.name}</h2>
                  <p className="text-gray-600 lg:text-sm text-[12px] truncate">{product.description}</p>
                  {product.oldprice && (
                    <div className="absolute left-3 top-3 text-pink-600 bg-yellow-100 py-1 px-2 text-[12px] rounded-full capitalize">
                      -{((product.oldprice - product.price) / product.oldprice * 100).toFixed(2)}%
                    </div>
                  )}
                  <div className="mt-2 flex items-center gap-2 justify-between">
                    <p className="flex items-center text-sm font-semibold text-pink-600">
                      <TbCurrencyNaira className="" />
                      {product.price?.toLocaleString() || "N/A"}
                    </p>
                    <p className="text-gray-500 text-sm px-2 rounded-full bg-pink-200">{product.category}</p>
                  </div>
                  <button onClick={() => handleAddToCart(product)} className="addTocart w-[100%] h-[0px] bg-pink-600 rounded-md mt-3 font-medium flex justify-center items-center text-white">
                    <FaCartShopping />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
