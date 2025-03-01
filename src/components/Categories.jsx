import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { name: "Abaya", image: "/image/abaya3.jpg" },
  { name: "Jalab", image: "/image/jalab2.jpg" },
  { name: "Fabrics", image: "/image/fabric1.jpg" },
  { name: "Jewellery", image: "/image/jewellery2.jpg" },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="relative py-16 my-10 lg:px-6 px-3 sm:px-12 varaint-color1 shadow-lg rounded-3xl max-w-[97%] xl:w-[95%] 2xl:max-w-[80%] mx-auto">
      {/* Title & Subtitle */}
      <div className="text-center mb-12">
        <h2 className="lg:text-4xl text-2xl font-extrabold text-gray-900 drop-shadow-md">Shop by Category</h2>
        <p className="text-lg text-gray-700 mt-3">
          Discover the perfect Abayas, Jalabs, Fabrics & Jewellery to elevate your style.
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            onClick={() => navigate(`/${category.name.toLowerCase()}`)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer bg-white shadow-lg rounded-xl overflow-hidden transition duration-300 hover:shadow-xl transform"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover rounded-t-xl"
            />
            <div className="p-4 text-center">
              <h3 className="text-2xl font-semibold text-gray-800">{category.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
