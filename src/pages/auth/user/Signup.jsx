import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for password visibility

export default function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    state: "",
    city: "",
    address: "",
    avatar: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  let navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true); // Start loading effect

    // Basic validation
    if (!formData.firstname || !formData.lastname || !formData.email || !formData.password) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://hardayfunkeh-apis.vercel.app/api/user/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Signup failed!");
      }

      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000); // Redirect after success

      setFormData({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        state: "",
        city: "",
        address: "",
        avatar: "",
        password: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Stop loading effect
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-700 to-red-500 px-4">
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-2">Signup</h2>
          <p className="text-gray-500 text-sm text-center mb-4">Join us today and start shopping with ease!</p>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-3">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <input type="text" name="firstname" placeholder="First Name" className="input-field" value={formData.firstname} onChange={handleChange} />
              <input type="text" name="lastname" placeholder="Last Name" className="input-field" value={formData.lastname} onChange={handleChange} />
              <input type="text" name="phone" placeholder="Phone Number" className="input-field" value={formData.phone} onChange={handleChange} />
              <input type="email" name="email" placeholder="Email" className="input-field" value={formData.email} onChange={handleChange} />
              <input type="text" name="state" placeholder="State" className="input-field" value={formData.state} onChange={handleChange} />
              <input type="text" name="city" placeholder="City" className="input-field" value={formData.city} onChange={handleChange} />
            </div>
            <input type="text" name="address" placeholder="Address" className="input-field" value={formData.address} onChange={handleChange} />

            {/* Password Field with Toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input-field w-full pr-10"
                value={formData.password}
                onChange={handleChange}
              />
              <span className="absolute right-3 top-3 cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Signup Button with Loading Effect */}
            <button type="submit" className="bg-gradient-to-r from-yellow-500 to-red-500 font-semibold text-white py-3 px-4 w-full rounded-md cursor-pointer transition flex justify-center items-center">
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                  Signing up...
                </div>
              ) : (
                "Signup"
              )}
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-start text-gray-700 mt-3">
            Already have an account?{" "}
            <span className="text-yellow-500 font-semibold cursor-pointer hover:underline" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
