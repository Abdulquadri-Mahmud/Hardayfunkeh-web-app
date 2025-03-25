import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { signinFailure, signinStart, signinSuccess } from "../../../store/userReducers";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      dispatch(signinStart());

      const response = await fetch("https://hardayfunkeh-apis.vercel.app/api/user/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success === false) {
        setError(data.message || "Invalid email or password");
        dispatch(signinFailure(data.message));
        return;
      }

      dispatch(signinSuccess(data));
      navigate('/');
    } catch (err) {
      setError("Network error. Please try again later.");
      dispatch(signinFailure(err || "Network error. Please try again later."));
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-center text-gray-600 mb-6">Login to continue shopping.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input type="email" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="relative">
              <label className="block text-gray-700 mb-1">Password</label>
              <input required type={showPassword ? "text" : "password"} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              <button type="button" className="absolute inset-y-0 right-3 top-7 flex items-center text-gray-600 hover:text-yellow-500" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex justify-between items-center">
              {error && <p className="text-red-500 text-sm text-start">{error}</p>}
              <div className=" text-end text-red-500 font-medium text-sm underline animate-pulse duration-300">
                <Link to={'/forgot_password'}>Forgot Password</Link>
              </div>
            </div>

            <button type="submit"
              className="w-full flex justify-center bg-gradient-to-r from-yellow-500 to-red-500 font-semibold cursor-pointer text-white py-3 rounded-md hover:opacity-90 transition-all text-lg"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                  Authenticating...
                </div>
              ) : (
                "Login"
              )}
            </button>

            {/* Signup Link */}
            <p className="text-center text-gray-700">
              Don't have an account?{" "}
              <span className="text-yellow-500 font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/signup")}>
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
