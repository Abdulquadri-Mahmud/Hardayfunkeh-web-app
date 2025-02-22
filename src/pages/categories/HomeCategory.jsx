import React, { createContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaNairaSign } from 'react-icons/fa6';
import Loader from '../../components/Loader';
import HomeSearchCategory from '../../components/HomeComponent/HomeSearchCategory';

export const HomeSearchCompContext = createContext();

export default function HomeCategory() {
  const categories = ["Abaya", "Jalab", "Jewellery", "Fabric"];
  const [priceRange, setPriceRange] = useState(100000);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://hardayfunkeh-apis.vercel.app/api/products/all-products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => product.price <= priceRange && (filter === 'All' || product.category === filter)
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="p-4 bg-white rounded-md md:max-w-7xl mx-auto">
      <div className="flex flex-wrap gap-5">
        {/* Sidebar */}
        <aside className="w-full md:w-72 h-[550px] bg-white rounded-md p-2">
          <h2 className="font-semibold text-lg">Category</h2>
          {categories.map((category, index) => (
            <Link key={index} to={`/${category.toLowerCase()}`} className="block py-2 px-8 hover:bg-gray-200 duration-150">
              {category}
            </Link>
          ))}
          Price Filtering Section
          <div className="border-t border-b border-gray-200 py-3 px-3 mt-5">
            <div className="flex justify-between items-center mb-3">
              <span className="flex items-center text-lg font-medium">
                PRICE (<FaNairaSign className="text-lg" />)
              </span>
              <span>{priceRange.toLocaleString()}</span>
            </div>
            <input type="range" min="0" max="100000" step="5" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className="w-full"/>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-md">
          <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-5">
            <div>
              <h2 className="font-semibold text-xl">Products</h2>
              <p className="text-gray-500 text-sm">({filteredProducts.length} products found)</p>
            </div>
            <select className="w-48 border border-gray-200 rounded p-2 focus:border-gray-300" onChange={(e) => setFilter(e.target.value)} value={filter}>
              <option value="All">All</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Product Grid */}
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 py-3 px-2">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <HomeSearchCompContext.Provider key={product._id} value={product}>
                    <HomeSearchCategory product={product} />
                  </HomeSearchCompContext.Provider>
                ))
              ) : (
                <p>No products found in this category.</p>
              )}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center my-4 gap-2">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 hover:bg-pink-400 rounded">
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index} onClick={() => setCurrentPage(index + 1)} className={`px-4 py-2 ${
                  currentPage === index + 1 ? 'bg-pink-600 text-white' : 'bg-gray-200'
                } rounded hover:bg-pink-400`}>
                {index + 1}
              </button>
            ))}

            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-200 hover:bg-pink-400 rounded">
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
