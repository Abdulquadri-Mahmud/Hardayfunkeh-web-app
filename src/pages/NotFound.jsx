import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'animate.css'; // Import the animate.css library
import Footer from '../components/Footer';
import Header from '../components/Header';

const NotFound = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
    <Header/>
      <div className="min-h-screen bg-linear-to-b from-gray-100 to-red-500 flex items-center justify-center relative">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="relative z-10 bg-white p-8 rounded-xl shadow-2xl text-center w-11/12 max-w-4xl">
          {/* Image */}
          <div className="mb-">
            <img
              src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?semt=ais_hybrid"
              alt="404 Image"
              className="w-40 mx-auto animate__animated animate__fadeIn"
            />
          </div>
          {/* Title */}
          {/* <h1 className="text-6xl font-extrabold text-gray-800 mb-4 animate__animated animate__fadeIn animate__delay-1s">
            404
          </h1> */}
          <p className="text-2xl text-gray-700 mb-6 animate__animated animate__fadeIn animate__delay-2s">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-lg text-gray-600 mb-8 animate__animated animate__fadeIn animate__delay-3s">
            It might have been moved or deleted. Don't worry, we'll get you back on track.
          </p>

          {/* Floating Object Animation */}
          <div className="relative flex justify-center mb-8">
            <div className="absolute animate-float-up-down">
              <img
                src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?semt=ais_hybrid"
                alt="Floating Object"
                className="w-12 h-12"
              />
            </div>
          </div>

          <div className="flex justify-center gap-4">
            {/* Go to Home Button */}
            <button
              onClick={handleHomeRedirect}
              className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
            >
              Go to Home
            </button>
            {/* Go Back Button */}
            <button
              onClick={handleGoBack}
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg text-lg shadow-lg hover:bg-gray-400 transition duration-300 transform hover:scale-105"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default NotFound;
