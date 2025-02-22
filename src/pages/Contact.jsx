import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required!");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (formData.message.length < 10) {
      setError("Message must be at least 10 characters long.");
      return;
    }

    setLoading(true);
    try {
        const endpoint = `https://hardayfunkeh-apis.vercel.app/api/email/send-email`;

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(formData)
        });
        const data = await res.json();

        if (data.success === false) {
            setError(data.message);
            setLoading(false);
            setSuccess('');
        }

        setLoading(false);
        setSuccess("");
        setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-gray-100 px-4 py-10">
        <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg w-full">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Contact Us</h2>
          <p className="text-center text-gray-600 mb-6">We’d love to hear from you! Reach out to us for any inquiries or assistance.</p>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-3">{success}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Your Name" className="input-field" value={formData.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Your Email" className="input-field" value={formData.email} onChange={handleChange} />
            <textarea name="message" placeholder="Your Message" className="input-field h-32" value={formData.message} onChange={handleChange}></textarea>
            <button type="submit" className="w-full bg-red-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-red-600 transition flex justify-center">
              {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5"></span> : "Send Message"}
            </button>
          </form>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
            <p className="text-gray-600 flex items-center gap-2 mt-2"><FaPhone /> +234 812 835 7183</p>
            <p className="text-gray-600 flex items-center gap-2"><FaEnvelope /> support@hardayfunkeh.com</p>
            <p className="text-gray-600 flex items-center gap-2"><FaMapMarkerAlt /> 1 Akin Ogunlewe Str, Abuja, FCT</p>
          </div>
          
          <div className="mt-6 flex justify-center space-x-4 text-xl text-gray-600">
            <a href="#" className="hover:text-blue-500"><FaFacebook /></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-green-500"><FaWhatsapp /></a>
            <a href="#" className="hover:text-blue-700"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
