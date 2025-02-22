 // HeroSection.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

const slides = [
  { text: "Your Ultimate Destination for Elegance & Style", image: "/image/hero.jpg" },
  { text: "Your Ultimate Destination for Elegance & Style", image: "/image/abaya3.jpg" },
  { text: "Exquisite Abayas, Jalab, Luxurious Fabrics & Timeless Jewellery", image: "/image/jalab.jpg" },
  { text: "Redefine Your Home of Fashion with Sophistication & Grace", image: "/image/jewellery.jpg" },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative moving-gradient flex flex-col gap-8 md:flex-row items-center justify-center text-center md:text-left py-20 px-2">
      <motion.div key={currentSlide} className="md:w-1/2" animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold mb-4 text-center text-gray-100">
          {slides[currentSlide].text}
        </h2>
        <p className="text-lg text-gray-100 font-semibold mb-6 text-center">Shop the best styles at unbeatable prices</p>
        <div className="flex justify-center">
          <Link to={'/shop'}>
            <button className="bg-pink-700 cursor-pointer hover:text-white font-semibold text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-yellow-600 transition">
              Shop Now
            </button>
          </Link>
        </div>
      </motion.div>
      <div className="lg:mt-0 mt-6 w-full md:w-1/2 h-96">
        <img src={slides[currentSlide].image} alt="Hero" className="w-full h-96 rounded-2xl object-cover shadow-md" />
      </div>
      <div className="absolute left-0 bottom-4 right-0 flex justify-center space-x-4">
        <button onClick={prevSlide} className="bg-pink-600 font-semibold text-white px-4 py-2 rounded-full shadow-md hover:bg-red-700 transition"> 
          <TbPlayerTrackPrevFilled />
        </button>
        <button onClick={nextSlide} className="bg-pink-600 font-semibold text-white px-4 py-2 rounded-full shadow-md hover:bg-red-700 transition">
          <TbPlayerTrackNextFilled />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
