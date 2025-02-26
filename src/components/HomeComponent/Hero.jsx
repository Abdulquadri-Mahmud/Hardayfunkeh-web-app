import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

const slides = [
  { text: "Discover Timeless Elegance & Style", image: "/image/hero.jpg" },
  { text: "Luxury Abayas, Jalabs & Accessories", image: "/image/abaya3.jpg" },
  { text: "Premium Fabrics & Exquisite Jewellery", image: "/image/jalab.jpg" },
  { text: "Redefine Fashion with Grace & Sophistication", image: "/image/j3.jpg" },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="bg-gradient-to-r from-pink-600 to-yellow-500">

      <div className="relative w-full lg:container mx-auto flex gap-4 flex-col md:flex-row items-center justify-center 2xl:py-30 md:py-20 py-10 md:px-6 p-3">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentSlide}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
            >
              {slides[currentSlide].text}
            </motion.h2>
          </AnimatePresence>

          <p className="text-lg text-gray-100 font-medium my-4">
            Elevate your wardrobe with our exclusive collections.
          </p>

          <div className="flex justify-center md:justify-start gap-4">
            <Link to="/shop">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold md:px-6 px-3 md:py-3 py-2 rounded-md shadow-md transition">
                Shop Now
              </button>
            </Link>
            <Link to="/collections">
              <button className="border border-white text-white font-bold md:px-6 px-3 md:py-3 py-2 rounded-md shadow-md hover:bg-white hover:text-pink-600 transition">
                Explore Collection
              </button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative 2xl:h-[500px] lg:h-[400px]  bg-green-500 rounded-2xl p-1 w-full md:w-1/2 h- flex items-center justify-center">
          <motion.img
            key={currentSlide}
            src={slides[currentSlide].image}
            alt="Hero"
            className="w-full h-full object-cover rounded-2xl shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-4">
          <button onClick={prevSlide} className="bg-gray-100 p-3 rounded-full shadow-md hover:bg-gray-200 transition">
            <TbPlayerTrackPrevFilled className="text-pink-600 text-lg" />
          </button>
          <button onClick={nextSlide} className="bg-gray-100 p-3 rounded-full shadow-md hover:bg-gray-200 transition">
            <TbPlayerTrackNextFilled className="text-pink-600 text-lg" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-3 flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? "bg-yellow-500" : "bg-white opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
