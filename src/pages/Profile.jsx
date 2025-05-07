import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaUpload } from "react-icons/fa";
import { updateFailure, updateStart, updateSuccess } from "../store/userReducers";
import { useDispatch, useSelector } from "react-redux";
import UserLogoutButton from "../layout/UserLogout";
import { Box, Button, Flex, Image, Input, SimpleGrid, Text } from "@chakra-ui/react";

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

  // console.log('user', user);
  
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
    <Box bg={'gray.50'}>
        <Header />
        <Box maxW="5xl" mx="auto" my="5" px="6" py="5" rounded="lg" display="flex" gap={{ base: 2, lg: 5 }} flexWrap="wrap">
          <Box w={{ base: "full", lg: "350px" }} p={4} rounded="lg" bg="white" border={'1px solid'} borderColor={'gray.300'}>
            {/* Profile Image */}
            <Flex justify="center" mb={6}>
              <Box w="150px" h="150px" border="1px" borderColor="gray.200" rounded="lg" position="relative" display="flex" justifyContent="center" alignItems="center">
                <Image src={`${user.avatar ? user.avatar : setAvatarPreview}`} alt="" className={`${user.avatar ? 'bg-white' : ''} drop-shadow-lg rounded-lg w-[100%] max-h-[100%]`}/>
                <Button position="absolute" onClick={handleUpload} variant="ghost" className="cursor-pointer">
                    <Text as={'span'} fontSize={'3xl'} color={'green.500'}>
                      <FaUpload />
                    </Text>
                </Button>
              </Box>
            </Flex>

            {/* Cart and Wishlist Info */}
            <Box spacing={3}>
              <Box bg="green.500" rounded="lg" p={2} color="white" display="flex" justifyContent="space-between" alignItems="center">
                <Text fontSize="sm">You have {items.length} item in your cart</Text>
                <Button bg="white" fontWeight={'500'} color={'gray.700'}>
                  <Link to="/cart">Check Now</Link>
                </Button>
              </Box>

              <Box mt={'3'} bg="yellow.400" rounded="lg" p={2} color="white" display="flex" justifyContent="space-between" alignItems="center">
                <Text fontSize="sm">You have {wishlists.length} item in your wishlist</Text>
                <Button bg="white" fontWeight={'500'} color="gray.700">
                  <Link to="/wishlist">Check Now</Link>
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Profile Update Form */}
          <Box bg="white" color={'gray.500'} rounded="lg" p={4} flex="1" border="1px solid" borderColor="gray.200">
              <form onSubmit={handleSubmit}>
                <Box >
                  {successMessage && (
                    <Box bg="green.600" p={2} rounded="lg">
                      <Text color="white" textAlign="center" mb={4}>
                        {successMessage}
                      </Text>
                    </Box>
                  )}

                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={3} spacing={4}>
                    {/* First Name */}
                    <Box>
                      <Text color="gray.500" fontSize="sm">First Name</Text>
                      <Input type="text" name="firstname" value={user.firstname} onChange={handleChange} borderColor="gray.300" focusBorderColor="red.300" textColor="gray.500" py='6'/>
                    </Box>

                    {/* Last Name */}
                    <Box>
                      <Text color="gray.500" fontSize="sm">Last Name</Text>
                      <Input type="text" name="lastname" value={user.lastname} onChange={handleChange} borderColor="gray.300" focusBorderColor="red.300" textColor="gray.500" py='6'/>
                    </Box>

                    {/* Email */}
                    <Box>
                      <Text color="gray.500" fontSize="sm">Email</Text>
                      <Input type="email" name="email" value={user.email} onChange={handleChange} isReadOnly borderColor="gray.300" bg="gray.100" py='6'/>
                    </Box>

                    {/* Phone */}
                    <Box>
                      <Text color="gray.500" fontSize="sm">Phone</Text>
                      <Input type="text" name="phone" value={user.phone} onChange={handleChange} borderColor="gray.300" focusBorderColor="red.300" textColor="gray.500" py='6'/>
                    </Box>
                  </SimpleGrid>

                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={3} spacing={4}>
                    {/* State */}
                    <Box>
                      <Text color="gray.500" fontSize="sm">State</Text>
                      <Input type="text" name="state" value={user.state} onChange={handleChange} borderColor="gray.300" focusBorderColor="red.300" textColor="gray.500" py='6'/>
                    </Box>

                    {/* City */}
                    <Box>
                      <Text color="gray.500" fontSize="sm">City</Text>
                      <Input type="text" name="city" value={user.city} onChange={handleChange} borderColor="gray.300" focusBorderColor="red.300" textColor="gray.500" py='6'/>
                    </Box>
                  </SimpleGrid>

                  {/* Address */}
                  <Box>
                    <Text color="gray.500" fontSize="sm">Address</Text>
                    <Input type="text" name="address" value={user.address} onChange={handleChange} borderColor="gray.300" focusBorderColor="red.300" textColor="gray.500" py='6'/>
                  </Box>

                  {/* Submit Buttons */}
                  <Flex w={'full'} mt={5} justifyContent="space-between" gap={6}>
                    <Button type="submit" w="150px" color="white" bg="green.600" py="2" fontWeight="semibold" textTransform="uppercase" _hover={{ color: "white", bg: "green.700" }} transition="all 0.2s">
                      {isLoading ? "Updating Profile..." : "Update Profile"}
                    </Button>

                    <UserLogoutButton />
                  </Flex>
                </Box>
              </form>
            </Box>
          </Box>
        <Footer />
    </Box>
  );
}
