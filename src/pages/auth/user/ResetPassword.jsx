import { useParams } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import { MdOutlineShoppingCart, MdRemoveRedEye } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function ResetPassword() {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getLockPassIcon = useRef(null);
  const getLockPassIcon2 = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  console.log(formData);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      if (!password.current.value) {
        setError('Password is required!');
        setLoading(false);
        return;
      }

      if (!confirmPassword.current.value) {
        setError('Confirm Password is required!');
        setLoading(false);
        return;
      }

      if (password.current.value !== confirmPassword.current.value) {
        setError('Passwords do not match!');
        setLoading(false);
        return;
      }

      const endpoint = `https://hardayfunkeh-apis.vercel.app/api/user/auth/reset-password/${token}`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      navigate('/login');
    } catch (error) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (inputRef, iconRef) => {
    if (inputRef.current.type === 'password') {
      inputRef.current.type = 'text';
      iconRef.current.innerHTML = '<svg stroke=\"currentColor\" fill=\"currentColor\" viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z\"></path></svg>';
    } else {
      inputRef.current.type = 'password';
      iconRef.current.innerHTML = '<svg stroke=\"currentColor\" fill=\"currentColor\" viewBox=\"0 0 640 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z\"></path></svg>';
    }
  };

  return (
    <div>
        <Header/>
      <div className="py-20 bg-gradient-to-r from-yellow-500 to-red-500">
        <div className="max-w-sm mx-auto py-5 px-3 bg-white rounded-md">
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-xl font-semibold text-center">Reset Password?</h2>
          </div>
          <p className="text-sm text-gray-400 text-center mt-2">Enter your new password</p>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="relative">
              <input
                type="password"
                ref={password}
                className="w-full py-3 px-3 bg-gray-200 rounded-md pl-8 text-sm outline-none"
                placeholder="Password"
              />
              <RiLockPasswordFill className="absolute top-3 left-3" />
              <button
                type="button"
                onClick={() => togglePasswordVisibility(password, getLockPassIcon)}
                ref={getLockPassIcon}
                className="absolute top-3 right-3 outline-none border-none"
              >
                <MdRemoveRedEye />
              </button>
            </div>
            <div className="relative mt-5">
              <input
                type="password"
                ref={confirmPassword}
                onChange={handleChange} id='password'
                className="w-full py-3 px-3 bg-gray-200 rounded-md pl-8 text-sm outline-none"
                placeholder="Confirm Password"
              />
              <RiLockPasswordFill className="absolute top-3 left-3" />
              <button
                type="button"
                onClick={() => togglePasswordVisibility(confirmPassword, getLockPassIcon2)}
                ref={getLockPassIcon2}
                className="absolute top-3 right-3 outline-none border-none"
              >
                <MdRemoveRedEye />
              </button>
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-yellow-500 to-red-500 text-white text-lg rounded-md uppercase font-medium"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="loader" />
                    <span>Loading...</span>
                  </div>
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
