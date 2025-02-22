import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaUpload } from "react-icons/fa";
import { updateFailure, updateStart, updateSuccess } from "../store/userReducers";
import { useDispatch } from "react-redux";

export default function Profile() {
  const { userId } = useParams();
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
            <div className="max-w-3xl mx-auto my-10 px-6 py-10 bg-white shadow-md rounded-lg">
                <h2 className="text-3xl font-bold text-center mb-6">👤 Your Profile</h2>

                {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}

                <div className="flex justify-center mb-6">
                  <div className="w-[100px] border border-gray-300 rounded-full relative flex justify-center items-center">
                    <img src={`${user.avatar}`} alt="" className={`${user.avatar ? 'bg-white' : ''} rounded-full max-w-[100%] h-[100px] max-h-[100%]`}/>
                    <button onClick={handleUpload} type='button' className='absolute cursor-pointer'>
                      <FaUpload className="text-2xl text-red-500"/>
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-semibold">First Name</label>
                        <input type="text" name="firstname" value={user.firstname} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-red-300" />
                    </div>

                    <div> <label className="block text-gray-700 font-semibold">Last Name</label> <input type="text" name="lastname" value={user.lastname} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-red-300" />
                    </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold">Email</label>
                      <input type="email" name="email" value={user.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" disabled/>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold">Phone</label>
                      <input type="text" name="phone" value={user.phone} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-red-300"
                    />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div> 
                        <label className="block text-gray-700 font-semibold">State</label> 
                        <input type="text" name="state" value={user.state} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-red-300" />
                      </div>

                      <div> 
                        <label className="block text-gray-700 font-semibold">City</label> 
                        <input type="text" name="city" value={user.city} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-red-300" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold">Address</label>
                      <input type="text" name="address" value={user.address} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-red-300"/>
                    </div>

                    <button type="submit" className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition">
                      {
                        isLoading ? 'Updating Profile' : 'Update Profile'
                      }
                    </button>
                </form>
            </div>
        <Footer />
    </div>
  );
}
