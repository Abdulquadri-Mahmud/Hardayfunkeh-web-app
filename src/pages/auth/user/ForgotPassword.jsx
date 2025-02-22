import React, { useState } from "react";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading ] = useState(false);

  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.email) {
        alert("Email is required!");
        return;
      }

      setLoading(true);

      const url = `https://hardayfunkeh-apis.vercel.app/api/user/auth/forgot-password`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      // Show the modal on success
      setShowModal(true);
      setLoading(false);
      setError(false);
      // navigate('/reset_password')
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again later.");
      setLoading(false)
    //   alert();
    }
  };

  return (
    <div className="">
      <Header/>
        <div className="md:py-20 py-20 bg-gradient-to-r from-yellow-500 to-red-500 flex justify-center items-center">
          <div className="relative bg-white sm:w-[350px] w-[97%] mx-auto lg:p-6 p-3 rounded-md shadow-lg">
            <div>
              <h2 className="text-3xl font-medium text-center">Forgot Password</h2>
              <p className="text-center text-gray-400 text-sm pt-2">
                Type in the specified info to reset your password
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-5">
              <div className="shadow-md rounded-md relative">
                <MdOutlineMarkEmailUnread className="absolute left-2 top-4" />
                <input onChange={handleChange} id="email" type="email" placeholder="Example@gmail.com" className="px-2 py-3 w-full rounded-md pl-8 border outline-none" required/>
              </div>
                {
                    error && (
                        <div className=" mt-5 w-full rounded-md">
                            <p className="text-red-500 text-sm font-medium">{error}</p>
                        </div>
                    )
                }
              <div className="w-full mt-5">
                <button type="submit"
                  className="bg-gradient-to-r from-yellow-500 to-red-500 w-full py-2 rounded-md text-white font-medium text-xl">
                  {
                    loading ? "Loading...." : "Send Link"
                  }
                </button>
              </div>
            </form>
            <div className="pt-6 text-sm flex gap-2 items-center font-medium">
                <p>Remembered account?</p>
                <Link to={"/signin"} className="text-blue-500 underline">
                    Sign In
                </Link>
            </div>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-gradient-to-r from-yellow-500 to-red-500 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-md shadow-lg w-[300px]">
                <h3 className="text-lg font-semibold text-center">Success</h3>
                <p className="text-sm text-gray-500 text-center mt-2">
                  A reset password link has been sent to your email.
                </p>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-blue-900 text-white rounded-md"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      <Footer/>
    </div>
  );
}
