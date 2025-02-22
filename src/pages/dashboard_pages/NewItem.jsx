import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateItem() {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: "",
    stock: "",
    price: "",
    discount: "",
    oldprice: "",
    deal: "",
    category: "",
    image: [],
    description: "",
    discountType: "",
    size: [],
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      size: checked ? [...prev.size, value] : prev.size.filter((s) => s !== value),
    }));
  };

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
          setFormData((prevFormData) => ({
            ...prevFormData,
            image: [...prevFormData.image, uploadedUrl],
          }));
  
          // alert(`Image uploaded successfully! URL: ${uploadedUrl}`);
        } else if (error) {
          console.error("Upload Error:", error);
          alert("An error occurpink during upload.");
        }
      }
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await fetch("https://hardayfunkeh-apis.vercel.app/api/products/create-products", {
        method: "POST",
        cpinkentials: 'include', // Important for cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setError(null);
      setSuccess('Item created successfully!');
      setTimeout(() => setSuccess(null), 5000)
    } catch (err) {
      setError("Network error. Please try again later.");
      console.log(err);
      
      setLoading(false);
    }
  };

  let navigate = useNavigate();

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="">

      <div className=" max-w-7xl lg:mx-auto mx-3 mt-6 lg:my-20 bg-white p-6 rounded-lg shadow-md relative">
        {
          success && (
            <div className={`absolute top-3 right-11 bg-green-600 rounded-lg py-4 px-2 w-[300px]`}>
              <p className="text-white text-center">{success}</p>
            </div>
          )
        }
        <button onClick={handleBack} className="absolute top-3 left-3 py-2 px-6 text-white rounded-md bg-pink-600">
          Back
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Item</h2>
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="">
                  {/* <p className="text-sm text-gray-800 font-semibold">Product Name</p> */}
                  <input required type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="w-full p-2 border focus:border-pink-200 border-gray-300 rounded" requipink />
                </div>
                <div className="">
                  {/* <p className="text-sm text-gray-800 font-semibold">Stock</p> */}
                  <input required type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="w-full p-2 border focus:border-pink-200 border-gray-300 rounded" requipink />
                </div>
                <div className="">
                  {/* <p className="text-sm text-gray-800 font-semibold">Price</p> */}
                  <input required type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-2 border focus:border-pink-200 border-gray-300 rounded" requipink />
                </div>
                <div className="">
                  {/* <p className="text-sm text-gray-800 font-semibold">Old Price (Optional)</p> */}
                  <input type="number" name="oldprice" placeholder="Old Price (Optional)" value={formData.oldprice} onChange={handleChange} className="w-full p-2 border focus:border-pink-200 border-gray-300 rounded" />
                </div>
                <div className="">
                  {/* <p className="text-sm text-gray-800 font-semibold">Discount (Optional)</p> */}
                  <input type="number" name="discount" placeholder="Discount (Optional)" value={formData.discount} onChange={handleChange} className="w-full p-2 border focus:border-pink-200 border-gray-300 rounded" />
                </div>
                <div className="">
                  {/* <p className="text-sm text-gray-800 font-semibold">Disctoun Type (Optional)</p> */}
                  <select name="discountType" required value={formData.discountType} onChange={handleChange} className="w-full p-2 border focus:border-pink-200 border-gray-300 rounded">
                    <option value="No Disctoun Type">No Disctoun Type</option>
                    <option value="Happy New Year Discount">Happy New Year Discount</option>
                    <option value="Eid Mubarak Discount">Eid Mubarak Discount</option>
                    <option value="Eid Adha Discount">Eid Adha Discount</option>
                    <option value="Christmas Discount">Christmas Discount</option>
                  </select>
                </div>
                <div className="">
                  {/* <p className="text-sm text-gray-800 font-semibold">Deal</p> */}
                  <select name="deal" required value={formData.deal} onChange={handleChange} className="w-full p-2 border focus:border-pink-200 border-gray-300 rounded" requipink>
                    <option value="great">Deal</option>
                    <option value="great">Great</option>
                    <option value="good">Good</option>
                  </select>
                </div>
                <div className="">
                  {/* <p className="text-sm text-gray-800 font-semibold">Category</p> */}
                  <select name="category" required value={formData.category} onChange={handleChange} className="w-full p-2 border focus:border-pink-200 border-gray-300 rounded" requipink>
                    <option value="">Select Category</option>
                    <option value="Abaya">Abaya</option>
                    <option value="Jalab">Jalab</option>
                    <option value="Jewellery">Jewellery</option>
                    <option value="Fabric">Fabric</option>
                  </select>
                </div>
              </div>
              <div className="">
                {/* <p className="text-sm text-gray-800 font-semibold">Gender</p> */}
                <select required name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border focus:border-pink-200 border-gray-300 rounded" requipink>
                  <option value="other">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>
              <div className="">
                {/* <p className="text-sm text-gray-800 font-semibold">Description</p> */}
                <textarea required name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border focus:border-pink-200 h-[150px] border-gray-300 rounded" requipink></textarea>
              </div>
              {
                formData.category !== 'Jewellery' && (
                  <div className="">
                    {/* <p className="text-sm text-gray-800 font-semibold">Sizes</p> */}
                    <div className="flex gap-2">
                      {["XS","S","M","L", "XL", "XXL","3XL","4XL","5XL",].map((size) => (
                        <label key={size} className="flex items-center gap-1">
                          <input type="checkbox" name="size" value={size} onChange={handleSizeChange} /> {size}
                        </label>
                      ))}
                    </div>
                  </div>
                )
              }

              {
                formData.category === 'Fabric' && (
                  <div className="">
                    {/* <p className="text-sm text-gray-800 font-semibold">Sizes</p> */}
                    <div className="flex flex-wrap gap-2">
                      {["3 yard","4 yard","5 yard","6 yard","10 yard","20 yard","30 yard","40 yard", "50 yard", "In bulks",].map((size) => (
                        <label key={size} className="flex items-center gap-1">
                          <input type="checkbox" name="size" value={size} onChange={handleSizeChange} /> {size}
                        </label>
                      ))}
                    </div>
                  </div>
                )
              }

              {
                error && <p className="text-pink-600 text-sm">{error}</p>
              }
              
              <button type="submit" className="w-full cursor-pointer bg-pink-600 duration-150 text-white py-2 rounded hover:bg-pink-600 transition">
                {
                  loading ? "Creating Item..." : "Create Item"
                }
              </button>
            </form>
          </div>
          <div className={`w-[350px] ${formData.image.length > 0 ? 'h-full' : 'h-[250px]'} rounded-md bg-white`}>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Upload Product Images</h3>
            <div className="w-[100%] border border-gray-300 rounded-lg relative flex justify-center items-center">
              <img src={`${formData.image.length > 0 && formData.image[0]}`} alt="" className={`${formData.image.length > 0 ? 'bg-white' : ''} rounded-md max-w-[100%] h-[230px] max-h-[100%]`}/>
              <button onClick={handleUpload} type='button' className='absolute cursor-pointer'>
                <FaUpload className="text-2xl text-pink-500"/>
              </button>
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              {
                formData.image.length > 0 && (
                  formData.image.map((url, index) => {
                    const handleDelete = () => {
                      setFormData({
                        ...formData,
                        image: formData.image.filter((_, i) => i !== index)
                      })
                    }
                    return (
                      <div key={index} className='w-[70px] h-[70px] p-1 flex justify-center items-center rounded-md relative border border-pink-300'>
                        <img src={url} alt="" className='w-[100%] h-[60px] rounded-md'/>
                        <FaTrash onClick={() => handleDelete(index)} className="absolute text-pink-500"/>
                      </div>
                    )
                  })
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
