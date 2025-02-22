import React from 'react'

export default function Feature() {
  return (
    <div>
        <div className="px-6 py-10">
            <h3 className="text-2xl font-semibold text-center mb-6">Featured Categories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition text-center">
                    <img src="/men.jpg" alt="Men's Clothing" className="w-full object-cover h-60 rounded-md mb-4" />
                    <h4 className="text-xl font-semibold">Men's Clothing</h4>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition text-center">
                    <img src="/women.jpeg" alt="Women's Clothing" className="w-full h-60 object-cover rounded-md mb-4" />
                    <h4 className="text-xl font-semibold">Women's Clothing</h4>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition text-center">
                    <img src="/image/jewellery.jpg" alt="Accessories" className="w-full object-cover h-60 rounded-md mb-4" />
                    <h4 className="text-xl font-semibold">Jewelleries</h4>
                </div>
            </div>
        </div>
    </div>
  )
}
