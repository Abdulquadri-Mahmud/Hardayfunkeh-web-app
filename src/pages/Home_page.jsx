import React, { useState, useEffect, createContext, Suspense } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Feature from "../components/Feature";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import SearchProductInput from "../components/SearchProductInput";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import HeroSection from "../components/HomeComponent/Hero";
import Advert from "../components/Advert";
import HomeCategory from "./categories/HomeCategory";

export const AbayaProductsContext = createContext();
export const JalabProductsContext = createContext();
export const JewelleryProductsContext = createContext();
export const FabricsProductsContext = createContext();

const AbayaProducts = React.lazy(() => import('../components/productsCMP/homeCMP/Abaya'));
const JalabProducts = React.lazy(() => import('../components/productsCMP/homeCMP/Jalab'));
const JewelleryProducts = React.lazy(() => import('../components/productsCMP/homeCMP/Jewellery'));
const FabricProducts = React.lazy(() => import('../components/productsCMP/homeCMP/Fabrics'));

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState({});

  const [Abaya, setAbaya] = useState([])
  const [Jalab, setJalab] = useState([])
  const [Jewellery, setJewellery] = useState([])
  const [Fabrics, setFabrics] = useState([]);

  const slides = [
    { text: "Your Ultimate Destina tion for Elegance & Style", image: "/image/hero.jpg" },
    { text: "Your Ultimate Destination for Elegance & Style", image: "/image/abaya3.jpg" },
    { text: "Exquisite Abayas, Jalab, Luxurious Fabrics & Timeless Jewellery", image: "/image/jalab.jpg" },
    { text: "Redefine Your Home of Fashion with Sophistication & Grace", image: "/image/jewellery.jpg" },
  ];

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const url = 'https://hardayfunkeh-apis.vercel.app/api/products/all-products';
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      };
      fetchProducts();
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setAbaya(products.filter((item) => item.category === "Abaya"));
      setJalab(products.filter((item) => item.category === "Jalab"));
      setJewellery(products.filter((item) => item.category === "Jewellery"));
      setFabrics(products.filter((item) => item.category === "Fabric"));
    }
  }, [products]);  // 🛑 Add 'products' as dependency  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const [abayaPage, setAbayaPage] = useState(1);
  const [jalabPage, setJalabPage] = useState(1);
  const [jewelleryPage, setJewelleryPage] = useState(1);
  const [fabricsPage, setFabricsPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedAbayas = Abaya.slice((abayaPage - 1) * itemsPerPage, abayaPage * itemsPerPage);
  const paginatedJalabs = Jalab.slice((jalabPage - 1) * itemsPerPage, jalabPage * itemsPerPage);
  const paginatedJewellery = Jewellery.slice((jewelleryPage - 1) * itemsPerPage, jewelleryPage * itemsPerPage);
  const paginatedFabrics = Fabrics.slice((fabricsPage - 1) * itemsPerPage, fabricsPage * itemsPerPage);

  const Pagination = ({ currentPage, setPage, totalItems }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return (
      <div className="flex justify-center items-center mt-4 gap-2">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-pink-500 text-white'}`} disabled={currentPage === 1}>
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-pink-600 text-white' : 'bg-gray-200'}`}>
            {i + 1}
          </button>
        ))}
        <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-pink-500 text-white'}`} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  };


  return (
    <div className="bg-gray-100">
      <Header />
      <div className="absolute">
        <SearchProductInput/>
      </div>
      <HeroSection/>
      {/*  */}
      <Categories/>

        {/* Abaya Products */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Explore Our Exclusive Collection
        </h2>
        <p className="lg:w-[60%] w-[97%] mx-auto text-lg text-gray-600 text-center mb-8">
          Discover timeless elegance with our premium selection of abayas, crafted for sophistication and comfort.  
        </p>

        {/* Abaya products */}
        <div className="sm:w-[100%] mb-10 xl:w-[95%] 2xl:max-w-[80%] max-w-[100%] mx-auto bg-white rounded-lg md:px-6 px-3 py-6">
          <div className="mb-4 py-3 px-3 text-white bg-pink-600 rounded-md flex justify-between items-center gap-4">
            <h2 className='text-xl font-semibold'>Abaya Collection</h2>
            <Link to={'/abaya'} className='text-[12px] font-medium text-white uppercase flex items-center'>See All <FaAngleRight className='text-[20px]'/></Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 md:gap-6 gap-3">
            {paginatedAbayas.map((abaya) => (
              <Suspense fallback={<Loader/>}>
                <AbayaProductsContext.Provider value={abaya}>
                  <AbayaProducts abaya={abaya} />
                </AbayaProductsContext.Provider>
              </Suspense>
            ))}
          </div>
          <Pagination currentPage={abayaPage} setPage={setAbayaPage} totalItems={Abaya.length} />
        </div>

        <div className="bg-black sm:w-[100%] xl:w-[95%] 2xl:max-w-[80%] max-w-[97%] mx-auto mb-16 rounded-2xl relative">
          <div className="relative text-white flex items-center justify-center min-h-[300px] md:p-8 px-2 rounded-lg shadow-2xl overflow-hidden glass-card">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-yellow-400 opacity-30 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-600 opacity-30 rounded-full blur-xl"></div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-2xl">
              <h2 className="md:text-4xl text-2xl font-bold mb-4 drop-shadow-lg">Exclusive Jalab Collection</h2>
              <p className="md:text-lg text-sm font-medium leading-relaxed">
                Step into sophistication with our 
                <span className="font-semibold"> Exclusive Jalab Collection</span>, where tradition meets modern elegance. 
                Crafted from <span className="font-semibold">premium fabrics</span> with intricate detailing, our Jalabs 
                offer <span className="font-semibold">comfort, luxury, and versatility</span> for every occasion.
              </p>
            </div>
          </div>

          {/* Animated Arrow */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-10">
            <div className="arrow bounce">
              <svg className="w-10 h-10 text-yellow-400 animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="sm:w-[100%] mb-10 xl:w-[95%] 2xl:max-w-[80%] max-w-[100%] mx-auto bg-white rounded-lg md:px-6 px-3 py-6">
          <div className="mb-4 py-3 px-3 text-white bg-pink-600 rounded-md flex justify-between items-center gap-4">
            <h2 className='text-xl font-semibold'>Jalab Collection</h2>
            <Link to={'/jalab'} className='text-[12px] font-medium text-white uppercase flex items-center'>See All <FaAngleRight className='text-[20px]'/></Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 md:gap-6 gap-3">
            {paginatedJalabs.map((jalab) => (
              <Suspense fallback={<Loader/>}>
                <JalabProductsContext.Provider value={jalab}>
                  <JalabProducts abaya={jalab} />
                </JalabProductsContext.Provider>
              </Suspense>
            ))}
          </div>
          <Pagination currentPage={jalabPage} setPage={setJalabPage} totalItems={Jalab.length} />
        </div>
        
        {/*  Jewellery Section*/}

        <div className="bg-black sm:w-[100%] xl:w-[95%] 2xl:max-w-[80%] max-w-[97%] mx-auto mb-16 rounded-2xl relative">
          <div className="relative text-white flex items-center justify-center min-h-[300px] md:p-8 px-2 rounded-lg shadow-2xl overflow-hidden glass-card">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-yellow-400 opacity-30 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-600 opacity-30 rounded-full blur-xl"></div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-2xl">
              <h2 className="md:text-4xl text-2xl font-bold mb-4 drop-shadow-lg">Exclusive Jewellery Collection</h2>
              <p className="md:text-lg text-sm font-medium leading-relaxed">
                Elevate your style with our  
                <span className="font-semibold text-yellow-300"> premium jewellery collection</span>, crafted with the finest materials and exquisite designs. 
                Each piece embodies <span className="font-semibold text-orange-300">elegance, luxury, and timeless beauty</span>, perfect for any occasion.
              </p>
            </div>
          </div>

          {/* Animated Arrow */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-10">
            <div className="arrow bounce">
              <svg className="w-10 h-10 text-yellow-400 animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        {/*  */}
        <div className="sm:w-[100%] mb-10 xl:w-[95%] 2xl:max-w-[80%] max-w-[100%] mx-auto bg-white rounded-lg md:px-6 px-3 py-10">
          <div className="mb-4 py-3 px-3 text-white bg-pink-600 rounded-md flex justify-between items-center gap-4">
            <h2 className='text-xl font-semibold'>Jewellery Collection</h2>
            <Link to={'/jewellery'} className='text-[12px] font-medium text-white uppercase flex items-center'>See All <FaAngleRight className='text-[20px]'/></Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 md:gap-6 gap-3">
            {paginatedJewellery.map((jewellery) => (
              <Suspense fallback={<Loader/>}>
                <JewelleryProductsContext.Provider value={jewellery}>
                  <JewelleryProducts abaya={jewellery} />
                </JewelleryProductsContext.Provider>
              </Suspense>
            ))}
          </div>
          <Pagination currentPage={jewelleryPage} setPage={setJewelleryPage} totalItems={Jewellery.length} />
        </div>

        <div className="sm:w-[100%] mb-10 xl:w-[95%] 2xl:max-w-[80%] max-w-[100%] mx-auto bg-white rounded-lg md:px-6 px-3 py-10">
          <div className="mb-4 py-3 px-3 text-white bg-pink-600 rounded-md flex justify-between items-center gap-4">
            <h2 className='text-xl font-semibold'>Jewellery Collection</h2>
            <Link to={'/fabric'} className='text-[12px] font-medium text-white uppercase flex items-center'>See All <FaAngleRight className='text-[20px]'/></Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 md:gap-6 gap-3">
            {paginatedFabrics.map((fabric) => (
              <Suspense fallback={<Loader/>}>
                <FabricsProductsContext.Provider value={fabric}>
                  <FabricProducts fabric={fabric} />
                </FabricsProductsContext.Provider>
              </Suspense>
            ))}
          </div>
          <Pagination currentPage={fabricsPage} setPage={setFabricsPage} totalItems={Fabrics.length} />
        </div>

        <div className="">
          <HomeCategory/>
        </div>

        <Advert/>
        <div className="">
          <Footer/>
        </div>
    </div>
  );
};

export default HomePage;
