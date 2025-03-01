import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { adminSigninFailure, adminSigninStart, adminSigninSuccess } from "../../../store/adminReducer";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.admin);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
        dispatch(adminSigninStart());

        const response = await fetch("https://hardayfunkeh-apis.vercel.app/api/admin/auth/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.success === false) {
            setError(data.message || "Invalid email or password");
            dispatch(adminSigninFailure());
            return;
        };
        
        dispatch(adminSigninSuccess(data));
        navigate('/dashboard');

    } catch (err) {
      setError("Network error. Please try again later.");
      dispatch(adminSigninFailure(err || "Network error. Please try again later."));
    }
  };

  return (
    <div className="">
      <Header/>
        <div className="flex items-center justify-center py-20">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700">Email</label>
                <input type="email" required className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="relative">
                <label className="block text-gray-700">Password</label>
                <input required type={showPassword ? "text" : "password"} className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="button" className="absolute inset-y-0 right-3 top-7 flex items-center text-gray-600"
                  onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm text-start">{error}</p>}
              <button type="submit" className="w-full bg-gradient-to-r from-yellow-500 to-red-500 font-semibold text-white py-2 rounded-md hover:opacity-90 transition-all">
                {loading ? 'Laoding....' : 'Login'}
              </button>

            </form>
          </div>
        </div>
      <Footer/>
    </div>
  );
}
