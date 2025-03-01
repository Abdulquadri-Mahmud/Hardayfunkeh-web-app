import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaUpload } from "react-icons/fa";
import { updateFailure, updateStart, updateSuccess } from "../store/userReducers";
import { useDispatch, useSelector } from "react-redux";
import UserLogoutButton from "../layout/UserLogout";

export default function Profile() {
  const { userId } = useParams();
  const { items } = useSelector((state) => state.cart);
  const { wishlists } = useSelector((state) => state.wishlist);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    state: "",
    city: "",
    address: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://hardayfunkeh-apis.vercel.app/api/user/auth/single-user/${userId}`);
        const data = await response.json();
        setUser(data);
        setAvatarPreview(data.avatar || "https://via.placeholder.com/150"); // Default avatar
      } catch (err) {
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    try {
      dispatch(updateStart());
      setIsLoading(true);

      const response = await fetch(`https://hardayfunkeh-apis.vercel.app/api/user/auth/update/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();
  
      if (data.success === false) {
        dispatch(updateFailure(data.message));
        console.log(data.message);
        setIsLoading(false);
        return;
      }
          
      dispatch(updateSuccess(data));
      setIsLoading(false);

      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(''), 1500);

    } catch (err) {
      setError("Error updating profile.");
      dispatch(updateFailure(error));
      setIsLoading(false);
    }
  };

  if (loading)
    return (
      <div className="">
        <Header />
          <p className="text-center text-lg text-gray-600 animate-pulse py-20">Loading products...</p>;
        <Footer />
      </div>
    )
  if (error)
    return (
      <div className="">
        <Header />
          <p className="text-center text-red-500 py-20">{error}</p>;
        <Footer />
      </div>
    )
    const handleUpload = async (e) => {
      window.cloudinary.openUploadWidget(
        {
          cloudName: "dypn7gna0",
          uploadPreset: "Hardayfunkeh-web-app",
          sources: ["local", "url",],
          multiple: true, // Allow multiple uploads
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            const uploadedUrl = result.info.secure_url; // Get the secure URL for the uploaded file
    
            // Update the formData.image array incrementally
            setUser({...user, avatar: uploadedUrl});
    
            // alert(`Image uploaded successfully! URL: ${uploadedUrl}`);
          } else if (error) {
            console.error("Upload Error:", error);
            alert("An error occurred during upload.");
          }
        }
      );
    }
  return (
    <div className="bg-zinc-100">
        <Header />
            <div className="max-w-5xl mx-auto my-10 px-6 py-10 rounded-lg flex lg:gap-5 gap-2 flex-wrap ">
              <div className="lg:w-[350px] lg:p-4 p-2 rounded-lg bg-white shadow-md w-full">
                {/* <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">👤 Your Profile</h2> */}
                <div className="flex justify-center mb-6">
                  <div className="w-[250px] h-[250px] border border-gray-300 rounded-lg relative flex justify-center items-center">
                    <img src={`${user.avatar ? user.avatar : setAvatarPreview}`} alt="" className={`${user.avatar ? 'bg-white' : ''} drop-shadow-lg rounded-lg w-[100%] max-h-[100%]`}/>
                    <button onClick={handleUpload} type='button' className='absolute cursor-pointer'>
                      <FaUpload className="text-2xl text-red-500"/>
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-pink-600 rounded-lg text-white flex justify-between items-center px-2 py-2">
                    <p className="text-sm">You have {items.length} item in your cart</p>
                    <button className="text-sm bg-white text-black px-2 py-2 rounded-lg"><Link to={'/cart'}>Check Now</Link></button>
                  </div>
                  <div className="bg-yellow-600 rounded-lg text-white flex justify-between items-center px-2 py-2">
                    <p className="text-sm">You have {wishlists.length} item in your wishlist</p>
                    <button className="text-sm bg-white text-black px-2 py-2 rounded-lg"><Link to={'/wishlist'}>Check Now</Link></button>
                  </div>
                </div>
              </div>

                <form onSubmit={handleSubmit} className="space-y-6 flex-1 lg:p-4 p-2 rounded-lg bg-white shadow-md">
                  {
                    successMessage && (
                      <div className="bg-green-600 p-2 rounded-lg">
                        {successMessage && <p className="text-white text-center mb-4">{successMessage}</p>}
                      </div>
                    )
                  }
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                          <label className="block text-gray-6
                           00 font-normal text-sm">First Name</label>
                          <input type="text" name="firstname" value={user.firstname} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-red-300 text-sm text-gray-500" />
                      </div>

                      <div>
                        <label className="block text-gray-6
                         00 font-normal text-sm">Last Name</label> <input type="text" name="lastname" value={user.lastname} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-red-300 text-sm text-gray-500" />
                      </div>
                      <div>
                        <label className="block text-gray-6
                         00 font-normal text-sm">Email</label>
                        <input type="email" name="email" value={user.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"/>
                      </div>

                      <div>
                        <label className="block text-gray-6
                         00 font-normal text-sm">Phone</label>
                        <input type="text" name="phone" value={user.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-red-300 text-sm text-gray-500"/>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div> 
                        <label className="block text-gray-6
                         00 font-normal text-sm">State</label> 
                        <input type="text" name="state" value={user.state} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-red-300 text-sm text-gray-500" />
                      </div>

                      <div> 
                        <label className="block text-gray-6
                         00 font-normal text-sm">City</label> 
                        <input type="text" name="city" value={user.city} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-red-300 text-sm text-gray-500" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-6
                       00 font-normal text-sm">Address</label>
                      <input type="text" name="address" value={user.address} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-red-300 text-sm text-gray-500"/>
                    </div>
                    <div className="flex justify-between gap-6">
                      <button type="submit" className="w-full cursor-pointer bg-green-600 font-medium text-white py-2 rounded-md hover:bg-green-700 transition">
                        {
                          isLoading ? 'Updating Profile...' : 'Update Profile'
                        }
                      </button>
                      <UserLogoutButton/>
                    </div>
                </form>
            </div>
        <Footer />
    </div>
  );
}
