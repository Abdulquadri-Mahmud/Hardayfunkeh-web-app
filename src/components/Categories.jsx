import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
    { name: "Abaya", image: "/image/abaya3.jpg" },
    { name: "Jalab", image: "/image/jalab.jpg" },
    { name: "Fabrics", image: "/image/fabric1.jpg" },
    { name: "Jewellery", image: "/image/jewellery2.jpg" },
  ];
  

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 rounded-lg sm:w-[100%] my-16 xl:w-[95%] 2xl:max-w-[80%] max-w-[97%] mx-auto bg-pink-200">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">Shop by Category</h2>
      {/* Description below the heading */}
      <p className="text-sm text-gray-600 text-center mb-8">
        Browse through our handpicked collection of Abayas, Jalabs, Fabrics, and Jewellery. <br />
        Find the perfect outfit and accessories to elevate your style.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="cursor-pointer p-2 bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105" onClick={() => navigate(`/${category.name.toLowerCase()}`)}>
            <img src={category.image} alt={category.name}
              className="w-full h-60 object-cover rounded-md"/>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
