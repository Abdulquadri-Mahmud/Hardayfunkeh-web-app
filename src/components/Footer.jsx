import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-start md:text-left">
        
        {/* About Faizany Sales */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Hardayfunkeh Sales</h3>
          <p className="text-gray-400">
          Your premier destination for elegant abayas, premium fabrics, exquisite jewelry, and stylish fashion. We offer unbeatable wholesale and retail deals, ensuring quality and sophistication at the best prices.
          </p>
        </div>

        {/* Shopping Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shop by Category</h3>
          <ul className="space-y-2">
            <li><a href="/home-fashion" className="hover:underline">Home Fashion</a></li>
            <li><a href="/abaya" className="hover:underline">Abaya Collection</a></li>
            <li><a href="/fabric" className="hover:underline">Exclusive Fabrics</a></li>
            <li><a href="/jewelry" className="hover:underline">Jewelry & Accessories</a></li>
            <li><a href="/wholesale" className="hover:underline">Wholesale Deals</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <p className="text-gray-400 mb-2">Stay updated on the latest trends & offers.</p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400"><FaFacebookF size={20} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400"><FaInstagram size={20} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400"><FaTwitter size={20} /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400"><FaYoutube size={20} /></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 text-center text-gray-400">
        &copy; {new Date().getFullYear()} Faizany Sales. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
